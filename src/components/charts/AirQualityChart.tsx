import React, { useEffect, useState } from 'react';
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
import { locationService } from '../../services/location';
import { HistoricalData } from '../../types/airQuality';
import { GeoLocation } from '../../types/location';
import { LoadingSpinner } from '../common/LoadingSpinner';
interface DetailedChartProps {
    cityLocation: GeoLocation;
}

export const DetailedChart: React.FC<DetailedChartProps> = ({
    cityLocation,
}) => {
    useAirQualityContext();
    const [loading, setLoading] = useState(true);
    const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            try {
                setLoading(true);
                const data = await locationService.getHistoricalData(
                    cityLocation.latitude,
                    cityLocation.longitude,
                    7
                );
                setHistoricalData(data);
            } catch (error) {
                console.error('Failed to fetch historical data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistoricalData();
    }, [cityLocation.latitude, cityLocation.longitude]);

    if (loading) {
        return (
            <div className="flex h-[20rem] items-center justify-center">
                <div className="text-gray-400"><LoadingSpinner /></div>
            </div>
        );
    }

    const chartData = historicalData.map((data) => ({
        ...data,
        timestamp: new Date(data.timestamp).getTime(),
        formattedTime: new Date(data.timestamp).toLocaleString(),
    }));

    return (
        <div className="flex h-[20rem] w-full flex-col p-4">
            <h2 className="text-base font-medium text-gray-100">
                Historical Data for {cityLocation.city}
            </h2>
            <div className="relative h-full w-full mt-4 -ml-10">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <XAxis
                            dataKey="timestamp"
                            tickFormatter={(timestamp) =>
                                new Date(timestamp).toLocaleDateString()
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
                            dataKey="co"
                            stroke="#60A5FA"
                            name="CO"
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
        </div>
    );
};