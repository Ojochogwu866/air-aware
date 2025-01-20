import React, {
	createContext,
	Dispatch,
	useContext,
	useEffect,
	useReducer,
} from 'react';
import {
	AirQualityState,
	Alert,
	HistoricalData,
	Settings,
} from '../types/airQuality';
import { AirQualityData } from '../types/location';

type Action =
	| { type: 'SET_CURRENT_DATA'; payload: AirQualityData }
	| { type: 'ADD_HISTORICAL_DATA'; payload: HistoricalData }
	| { type: 'ADD_ALERT'; payload: Alert }
	| { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
	| { type: 'CLEAR_ALERTS' };

const initialState: AirQualityState = {
	currentData: null,
	historicalData: [],
	alerts: [],
	settings: {
		refreshInterval: 0,
		alertThresholds: {
			co: 0,
			no2: 0,
			o3: 0,
			pm25: 0,
		},
		browserNotifications: false,
		notificationSound: false,
	},
};

const reducer = (state: AirQualityState, action: Action): AirQualityState => {
	switch (action.type) {
		case 'SET_CURRENT_DATA':
			return {
				...state,
				currentData: action.payload,
			};
		case 'ADD_HISTORICAL_DATA':
			return {
				...state,
				historicalData: [...state.historicalData, action.payload],
			};
		case 'ADD_ALERT':
			return {
				...state,
				alerts: [...state.alerts, action.payload],
			};
		case 'UPDATE_SETTINGS':
			return {
				...state,
				settings: {
					...state.settings,
					...action.payload,
				},
			};
		case 'CLEAR_ALERTS':
			return {
				...state,
				alerts: [],
			};
		default:
			return state;
	}
};

interface AirQualityContextType {
	state: AirQualityState;
	dispatch: Dispatch<Action>;
}

const AirQualityContext = createContext<AirQualityContextType | undefined>(
	undefined
);

export const useAirQualityContext = (): AirQualityContextType => {
	const context = useContext(AirQualityContext);
	if (context === undefined) {
		throw new Error(
			'useAirQualityContext must be used within an AirQualityProvider'
		);
	}
	return context;
};

export const AirQualityProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const loadState = async () => {
			try {
				const saved = await chrome.storage.local.get(['settings', 'alerts']);
				if (saved.settings) {
					dispatch({ type: 'UPDATE_SETTINGS', payload: saved.settings });
				}
				if (saved.alerts) {
					saved.alerts.forEach((alert: Alert) => {
						dispatch({ type: 'ADD_ALERT', payload: alert });
					});
				}
			} catch (error) {
				console.error('Error loading state:', error);
			}
		};
		loadState();
	}, []);

	useEffect(() => {
		try {
			chrome.storage.local.set({
				settings: state.settings,
				alerts: state.alerts,
			});
		} catch (error) {
			console.error('Error saving state:', error);
		}
	}, [state.settings, state.alerts]);

	return (
		<AirQualityContext.Provider value={{ state, dispatch }}>
			{children}
		</AirQualityContext.Provider>
	);
};
