import React from 'react';
import { AirQualityData, GeoLocation } from '../../types/location';
import { AirQualityGrid } from '../air-quality/AirQualityGrid';
import { CityHeader } from '../air-quality/CityHeader';
import { Card } from './Card';

interface CityCardProps {
	city: GeoLocation & { airQuality: AirQualityData };
	onClick: () => void;
	highlight?: boolean;
}

export const CityCard: React.FC<CityCardProps> = ({
	city,
	onClick,
	highlight = false,
}) => (
	<Card
		className={`cursor-pointer transition-all ${highlight ? 'border-blue-200 bg-blue-50' : 'bg-white hover:bg-gray-50'} `}
		onClick={onClick}
	>
		<CityHeader city={city.city} country={city.country} />
		<AirQualityGrid data={city.airQuality} />
	</Card>
);
