import { cilArrowLeft } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';
import React from 'react';
import { GeoLocation } from '../types/location';
import { DetailedChart } from './charts/AirQualityChart';

interface CityDetailProps {
	city: GeoLocation;
	onBack: () => void;
}

export const CityDetail: React.FC<CityDetailProps> = ({ city, onBack }) => {
	return (
		<div className="h-[600px] w-[400px] bg-white p-4">
			<button
				onClick={onBack}
				className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
			>
				<CIcon icon={cilArrowLeft} className="h-5 w-5" />
				<span>Back to list</span>
			</button>

			<h2 className="mb-4 text-xl font-semibold">
				{city.city}, {city.country}
			</h2>

			<DetailedChart cityLocation={city} />
		</div>
	);
};
