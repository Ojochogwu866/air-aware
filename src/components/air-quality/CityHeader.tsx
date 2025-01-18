import React from 'react';

interface CityHeaderProps {
	city: string;
	country: string;
}

export const CityHeader: React.FC<CityHeaderProps> = ({ city, country }) => (
	<div className="mb-4">
		<h2 className="text-xl font-semibold text-gray-100">{city}</h2>
		<p className="text-gray-400">{country}</p>
	</div>
);
