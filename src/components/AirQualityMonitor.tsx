import { cilArrowLeft } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';
import React, { useState } from 'react';
import { useLocation } from '../hooks/useLocation';
import { GeoLocation } from '../types/location';
import { CityDetail } from './CityDetail';
import { CityList } from './CityList';
import { LoadingSpinner } from './common/LoadingSpinner';
import { SearchBar } from './common/SearchBar';
import { ErrorDisplay } from './ErrorDisplay';
import { Settings } from './settings/settings';

export const AirQualityMonitor: React.FC = () => {
	const [view, setView] = useState<'list' | 'detail'>('list');
	const [selectedCity, setSelectedCity] = useState<GeoLocation | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const { loading, error } = useLocation();

	if (loading) return <LoadingSpinner />;
	if (error) return <ErrorDisplay message={error} />;

	return (
		 <div className="h-full w-full overflow-y-auto bg-[#121212] p-5">
			<div className="mb-4 flex items-center justify-between">
				<div className="flex-1">
					{view === 'detail' && (
						<button
							onClick={() => {
								setView('list');
								setSearchQuery('');
							}}
							className="flex items-center space-x-2 text-gray-400 hover:text-gray-200"
						>
							<CIcon icon={cilArrowLeft} className="h-5 w-5" />
							<span>Back</span>
						</button>
					)}
				</div>
				<div>
					<Settings />
				</div>
			</div>

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
