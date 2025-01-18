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

	const filteredData = state.historicalData.filter((data) => {
		return (
			data.location &&
			data.location.latitude === cityLocation.latitude &&
			data.location.longitude === cityLocation.longitude
		);
	});

	return (
		<div className="h-96 rounded-lg bg-[#181818] p-4">
			<h2 className="mb-4 text-lg font-semibold text-gray-100">
				Historical Data
			</h2>
			<ResponsiveContainer width="100%" height="90%">
				<LineChart data={filteredData}>
					<XAxis
						dataKey="timestamp"
						tickFormatter={(timestamp) =>
							new Date(timestamp).toLocaleTimeString()
						}
						stroke="#9CA3AF"
						tick={{ fill: '#9CA3AF' }}
					/>
					<YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
					<Tooltip
						labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
						contentStyle={{
							backgroundColor: '#282828',
							border: '1px solid #404040',
							borderRadius: '6px',
							color: '#F3F4F6',
						}}
					/>
					<Legend
						wrapperStyle={{
							color: '#9CA3AF',
						}}
					/>
					<Line
						type="monotone"
						dataKey="co2"
						stroke="#60A5FA"
						name="CO₂"
						dot={false}
						strokeWidth={2}
					/>
					<Line
						type="monotone"
						dataKey="no2"
						stroke="#4ADE80"
						name="NO₂"
						dot={false}
						strokeWidth={2}
					/>
					<Line
						type="monotone"
						dataKey="o3"
						stroke="#C084FC"
						name="O₃"
						dot={false}
						strokeWidth={2}
					/>
					<Line
						type="monotone"
						dataKey="pm25"
						stroke="#FB7185"
						name="PM2.5"
						dot={false}
						strokeWidth={2}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};
