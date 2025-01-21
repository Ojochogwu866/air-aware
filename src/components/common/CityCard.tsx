import React, { useState } from 'react';
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
}) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className="relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Card
				className={`cursor-pointer h-[200px] flex flex-col item-start justify-between ${
					highlight ? 'border-[#282828] bg-[#181818]' : 'bg-[#181818]'
				} ${
					!highlight && isHovered
						? 'bg-[#282828] transition-all duration-300 ease-in-out'
						: 'translate-y-0'
				} `}
				onClick={onClick}
			>
				<CityHeader city={city.city} country={city.country} />
				<AirQualityGrid data={city.airQuality} />
			</Card>
		</div>
	);
};

export default CityCard;
