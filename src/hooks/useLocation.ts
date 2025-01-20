import { useEffect, useState } from 'react';
import { locationService } from '../services/location';
import { AirQualityData, GeoLocation } from '../types/location';

interface LocationState {
	loading: boolean;
	error: string | null;
	location: GeoLocation | null;
	airQuality: AirQualityData | null;
}

export function useLocation() {
	const [state, setState] = useState<LocationState>({
		loading: true,
		error: null,
		location: null,
		airQuality: null,
	});

	useEffect(() => {
		async function getUserLocation() {
			try {
				const position = await locationService.getCurrentPosition();
				const { latitude, longitude } = position.coords;

				const location = await locationService.getCityFromCoordinates(
					latitude,
					longitude
				);

				const airQuality = await locationService.getAirQualityData(
					latitude,
					longitude
				);

				setState({
					loading: false,
					error: null,
					location,
					airQuality,
				});
			} catch (error) {
				setState((prev) => ({
					...prev,
					loading: false,
					error:
						error instanceof Error
							? error.message
							: 'An unknown error occurred',
				}));
			}
		}

		getUserLocation();
	}, []);

	return state;
}
