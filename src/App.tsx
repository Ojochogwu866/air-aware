import React, { useEffect, useState } from 'react';
import { AirQualityMonitor } from './components/AirQualityMonitor';
import { useAirQualityContext } from './context/AirQualityContext';
import { locationService } from './services/location';
import { GeoLocation } from './types/location';

function App() {
	const { dispatch } = useAirQualityContext();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedCity, setSelectedCity] = useState<GeoLocation | null>(null);

	useEffect(() => {
		const initializeData = async () => {
			try {
				const position = await locationService.getCurrentPosition();
				const { latitude, longitude } = position.coords;

				const location = await locationService.getCityFromCoordinates(
					latitude,
					longitude
				);

				const airQualityData = await locationService.getAirQualityData(
					latitude,
					longitude
				);

				const historicalData = await locationService.getHistoricalData(
					latitude,
					longitude
				);

				dispatch({ type: 'SET_CURRENT_DATA', payload: airQualityData });
				historicalData.forEach((data) => {
					dispatch({ type: 'ADD_HISTORICAL_DATA', payload: data });
				});

				setSelectedCity(location);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'Failed to load air quality data'
				);
			} finally {
				setLoading(false);
			}
		};

		initializeData();
	}, [dispatch]);

	if (loading) {
		return (
			<div className="flex h-popup w-popup items-center justify-center bg-white">
				<div className="text-center">
					<div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
					<p className="mt-4 text-gray-600">Loading air quality data...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="h-popup w-popup bg-white p-4">
				<div className="rounded-lg bg-red-50 p-4">
					<h3 className="font-medium text-red-800">Error</h3>
					<p className="mt-2 text-red-600">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="mt-4 rounded bg-red-100 px-4 py-2 text-red-800 hover:bg-red-200"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="h-popup w-popup bg-gray-50">
			{selectedCity ? (
				<AirQualityMonitor />
			) : (
				<div className="p-4">
					<h1 className="mb-4 text-2xl font-bold text-gray-800">AirAware</h1>
					<p className="mb-2 text-gray-600">Loading location data...</p>
				</div>
			)}
		</div>
	);
}

export default App;
