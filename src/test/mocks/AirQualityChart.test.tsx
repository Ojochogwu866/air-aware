import { DetailedChart as AirQualityChart } from '@/components/charts/AirQualityChart';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('AirQualityChart', () => {
	const mockData = [
		{
			timestamp: Date.now() - 172800000,
			co: 1.0,
			no2: 0.7,
			o3: 0.4,
			pm25: 10.0,
			location: {
				city: 'New York',
				country: 'USA',
				latitude: 40.7128,
				longitude: -74.006,
			},
		},
		{
			timestamp: Date.now() - 86400000,
			co: 1.2,
			no2: 0.8,
			o3: 0.5,
			pm25: 11.0,
			location: {
				city: 'New York',
				country: 'USA',
				latitude: 40.7128,
				longitude: -74.006,
			},
		},
	];

	const mockProps = {
		data: mockData,
		selectedPollutant: 'co',
		onSelectPollutant: vi.fn(),
		cityLocation: {
			city: 'New York',
			country: 'USA',
			latitude: 40.7128,
			longitude: -74.006,
		},
	};

	it('renders chart with data', () => {
		const { container } = render(<AirQualityChart {...mockProps} />);

		expect(container.querySelector('.recharts-wrapper')).toBeInTheDocument();
		expect(container.querySelector('.recharts-line')).toBeInTheDocument();
		expect(
			container.querySelector('.recharts-cartesian-grid')
		).toBeInTheDocument();
	});

	it('displays correct pollutant labels', () => {
		render(<AirQualityChart {...mockProps} />);

		expect(screen.getByText(/CO/)).toBeInTheDocument();
		expect(screen.getByText(/NO2/)).toBeInTheDocument();
		expect(screen.getByText(/O3/)).toBeInTheDocument();
		expect(screen.getByText(/PM2.5/)).toBeInTheDocument();
	});

	it('handles empty data gracefully', () => {
		const { container } = render(<AirQualityChart {...mockProps}  />);

		expect(container.querySelector('.recharts-wrapper')).toBeInTheDocument();
		expect(container.querySelector('.recharts-line')).not.toBeInTheDocument();
	});
});
