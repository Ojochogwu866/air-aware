import React, { useState } from 'react';
import { useLocation } from '../hooks/useLocation';
import { GeoLocation } from '../types/location';
import { AirQualityGrid } from './air-quality/AirQualityGrid';
import { CityHeader } from './air-quality/CityHeader';
import { CityDetail } from './CityDetail';
import { CityList } from './CityList';
import { Card } from './common/Card';
import { LoadingSpinner } from './common/LoadingSpinner';
import { SearchBar } from './common/SearchBar';
import { ErrorDisplay } from './ErrorDisplay';

export const AirQualityMonitor: React.FC = () => {
	const [view, setView] = useState<'list' | 'detail'>('list');
	const [selectedCity, setSelectedCity] = useState<GeoLocation | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const { loading, error, location, airQuality } = useLocation();

	if (loading) return <LoadingSpinner />;
	if (error) return <ErrorDisplay message={error} />;

	return (
		<div className="h-[600px] w-[400px] overflow-y-auto bg-white p-4">
			{view === 'detail' ? (
				<CityDetail
					city={selectedCity!}
					onBack={() => {
						setView('list');
						setSearchQuery('');
					}}
				/>
			) : (
				<>
					{location && airQuality && (
						<Card className="mb-6 bg-blue-50">
							<CityHeader city={location.city} country={location.country} />
							<AirQualityGrid data={airQuality} />
						</Card>
					)}

					<SearchBar
						value={searchQuery}
						onChange={setSearchQuery}
						placeholder="Search cities..."
					/>

					<CityList
						searchQuery={searchQuery}
						onCitySelect={(city) => {
							setSelectedCity(city);
							setView('detail');
						}}
					/>
				</>
			)}
		</div>
	);
};
