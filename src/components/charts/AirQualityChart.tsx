import React from 'react';
import {
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { useAirQualityContext } from '../../context/AirQualityContext';
import { GeoLocation } from '../../types/location';

interface DetailedChartProps {
	cityLocation: GeoLocation;
}

export const DetailedChart: React.FC<DetailedChartProps> = ({
	cityLocation,
}) => {
	const { state } = useAirQualityContext();

	// Filter historical data for the selected city
	const filteredData = state.historicalData.filter((data) => {
		// Now we can safely access location data from historicalData
		return (
			data.location &&
			data.location.latitude === cityLocation.latitude &&
			data.location.longitude === cityLocation.longitude
		);
	});

	return (
		<div className="h-96 rounded-lg bg-white p-4 shadow">
			<h2 className="mb-4 text-lg font-semibold">Historical Data</h2>
			<ResponsiveContainer width="100%" height="90%">
				<LineChart data={filteredData}>
					<XAxis
						dataKey="timestamp"
						tickFormatter={(timestamp) =>
							new Date(timestamp).toLocaleTimeString()
						}
					/>
					<YAxis />
					<Tooltip
						labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
					/>
					<Legend />
					<Line
						type="monotone"
						dataKey="co2"
						stroke="#2563eb"
						name="CO₂"
						dot={false}
					/>
					<Line
						type="monotone"
						dataKey="no2"
						stroke="#16a34a"
						name="NO₂"
						dot={false}
					/>
					<Line
						type="monotone"
						dataKey="o3"
						stroke="#9333ea"
						name="O₃"
						dot={false}
					/>
					<Line
						type="monotone"
						dataKey="pm25"
						stroke="#dc2626"
						name="PM2.5"
						dot={false}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};
