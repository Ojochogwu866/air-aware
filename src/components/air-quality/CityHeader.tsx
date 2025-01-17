import React from 'react';

interface CityHeaderProps {
	city: string;
	country: string;
}

export const CityHeader: React.FC<CityHeaderProps> = ({ city, country }) => (
	<div className="mb-2">
		<h2 className="text-lg font-semibold">{city}</h2>
		<p className="text-gray-600">{country}</p>
	</div>
);
