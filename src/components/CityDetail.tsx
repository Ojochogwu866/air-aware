import React from 'react';
import { GeoLocation } from '../types/location';
import { DetailedChart } from './charts/AirQualityChart';

interface CityDetailProps {
	city: GeoLocation;
	onBack: () => void;
}

export const CityDetail: React.FC<CityDetailProps> = ({ city, onBack }) => {
	return (
		<div className="w-full h-[500px] bg-[#121212]">
			<h2 className="mb-4 text-base font-medium text-gray-100">
				{city.city}, <span className="text-gray-400">{city.country}</span>
			</h2>

			<div className="bg-[#181818]">
				<DetailedChart cityLocation={city} />
			</div>
		</div>
	);
};
