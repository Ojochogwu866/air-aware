import React from 'react';
import { AirQualityData } from '../../types/location';
import { MetricDisplay } from './MetricDisplay';

interface AirQualityGridProps {
	data: AirQualityData;
}

export const AirQualityGrid: React.FC<AirQualityGridProps> = ({ data }) => (
	<div className="grid grid-cols-2 gap-3">
		<MetricDisplay label="CO₂" value={data.co2} unit="ppm" />
		<MetricDisplay label="NO₂" value={data.no2} unit="ppb" />
		<MetricDisplay label="O₃" value={data.o3} unit="ppb" />
		<MetricDisplay label="PM2.5" value={data.pm25} unit="µg/m³" />
	</div>
);
