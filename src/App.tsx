import { useEffect, useState } from 'react';
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
			<div className="flex h-[700px] w-[600px] items-center justify-center bg-[#121212]">
				<div className="text-center">
					<div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-gray-400"></div>
					<p className="mt-4 text-gray-400">Loading air quality data</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="h-[700px] w-[600px] bg-[#121212] p-4">
				<div className="rounded-lg border border-[#282828] bg-[#181818] p-4">
					<h3 className="font-medium text-gray-200">Error</h3>
					<p className="mt-2 text-gray-400">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="mt-4 rounded bg-[#282828] px-4 py-2 text-gray-200 transition-colors hover:bg-[#383838]"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="h-[700px] w-[600px] bg-[#121212]">
			{selectedCity ? (
				<AirQualityMonitor />
			) : (
				<div className="p-4">
					<h1 className="mb-4 text-2xl font-bold text-gray-200">AirAware</h1>
					<p className="mb-2 text-gray-400">Loading location data</p>
				</div>
			)}
		</div>
	);
}

export default App;
