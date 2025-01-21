import { useEffect, useState } from 'react';
import { AirQualityMonitor } from './components/AirQualityMonitor';
import Navigation from './components/Navigation';
import PollutantOrbit from './components/PollutantOrbit';
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
			<div className="flex h-[500px] w-[400px] flex-col bg-[#121212]">
				<Navigation city="Loading" />
				<div className="flex flex-1 items-center justify-center">
					<div className="text-center">
						<PollutantOrbit />
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex h-[500px] w-[400px] flex-col bg-[#121212]">
				<Navigation city="Error" />
				<div className="flex-1 p-4">
					<div className="border border-[#282828] bg-[#181818] p-4">
						<h3 className="font-medium text-gray-200">Error</h3>
						<p className="mt-2 text-gray-400">{error}</p>
						<button
							onClick={() => window.location.reload()}
							className="mt-4 bg-[#282828] px-4 py-2 text-gray-200 transition-colors hover:bg-[#383838]"
						>
							Retry
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-[500px] w-[400px] flex-col bg-[#121212]">
			<Navigation city={selectedCity?.city || 'Loading'} />
			{selectedCity ? (
				<div className="flex-1">
					<AirQualityMonitor />
				</div>
			) : (
				<div className="p-4">
					<p className="mb-2 text-gray-400">Loading location data</p>
				</div>
			)}
		</div>
	);
}

export default App;
