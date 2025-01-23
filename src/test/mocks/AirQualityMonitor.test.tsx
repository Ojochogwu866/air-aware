import { render, screen } from '@testing-library/react';
import { AirQualityMonitor } from '../../components/AirQualityMonitor';
import { AirQualityProvider } from '../../context/AirQualityContext';
import { describe, expect, it } from 'vitest';

describe('AirQualityMonitor', () => {
	const mockAirQualityData = {
		co: 1.2,
		no2: 0.8,
		o3: 0.5,
		pm25: 12.3,
		timestamp: Date.now(),
		location: {
			city: 'New York',
			country: 'USA',
			latitude: 40.7128,
			longitude: -74.006,
		},
	};

	const mockHistoricalData = [
		{ ...mockAirQualityData, timestamp: Date.now() - 86400000 },
		{ ...mockAirQualityData, timestamp: Date.now() - 172800000 },
		mockAirQualityData,
	];

	it('renders air quality data correctly', () => {
		render(
			<AirQualityProvider>
				<AirQualityMonitor />
			</AirQualityProvider>
		);

		expect(screen.getByText(/Air Quality Index/i)).toBeInTheDocument();
		expect(screen.getByText(/Historical Data/i)).toBeInTheDocument();

		expect(screen.getByText(/CO/i)).toBeInTheDocument();
		expect(screen.getByText(/1.2/)).toBeInTheDocument();
		expect(screen.getByText(/NO2/i)).toBeInTheDocument();
		expect(screen.getByText(/0.8/)).toBeInTheDocument();
	});

	it('handles loading state correctly', () => {
		render(
			<AirQualityProvider>
				<AirQualityMonitor />
			</AirQualityProvider>
		);

		expect(screen.getByText(/Loading/i)).toBeInTheDocument();
	});
});
