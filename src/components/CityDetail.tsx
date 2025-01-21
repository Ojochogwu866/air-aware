import React from 'react';
import { GeoLocation } from '../types/location';
import { DetailedChart } from './charts/AirQualityChart';

interface CityDetailProps {
	city: GeoLocation;
	onBack: () => void;
}

export const CityDetail: React.FC<CityDetailProps> = ({ city, onBack }) => {
	return (
		<div className="h-[600px] w-full bg-[#121212]">
			<h2 className="mb-4 text-xl font-semibold text-gray-100">
				{city.city}, <span className="text-gray-400">{city.country}</span>
			</h2>

			<div className="bg-[#181818] p-4">
				<DetailedChart cityLocation={city} />
			</div>
		</div>
	);
};
