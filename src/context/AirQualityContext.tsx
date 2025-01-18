import React, { createContext, Dispatch, useContext, useReducer } from 'react';
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
	| { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> };

const initialState: AirQualityState = {
	currentData: null,
	historicalData: [],
	alerts: [],
	settings: {
		refreshInterval: 30,
		alertThresholds: {
			co: 1000,
			no2: 100,
			o3: 100,
			pm25: 35,
		},
		emailNotifications: false,
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

	return (
		<AirQualityContext.Provider value={{ state, dispatch }}>
			{children}
		</AirQualityContext.Provider>
	);
};
