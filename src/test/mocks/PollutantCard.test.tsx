import { CityDetail as PollutantCard } from '@/components/CityDetail';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('PollutantCard', () => {
	const mockProps = {
		city: {
			city: 'New York',
			country: 'USA',
			latitude: 40.7128,
			longitude: -74.006,
		},
		onBack: vi.fn(),
		title: 'CO',
		value: 1.2,
		unit: 'ppm',
		threshold: 2.0,
		description: 'Carbon Monoxide',
	};

	it('renders pollutant information correctly', () => {
		render(<PollutantCard {...mockProps} />);

		expect(screen.getByText('CO')).toBeInTheDocument();
		expect(screen.getByText('1.2')).toBeInTheDocument();
		expect(screen.getByText('ppm')).toBeInTheDocument();
		expect(screen.getByText('Carbon Monoxide')).toBeInTheDocument();
	});

	it('applies correct color based on threshold', () => {
		const { container } = render(<PollutantCard {...mockProps} />);

		expect(container.querySelector('.text-air-good')).toBeInTheDocument();

		render(<PollutantCard {...mockProps}  />);
		expect(container.querySelector('.text-air-poor')).toBeInTheDocument();
	});

	it('handles undefined values', () => {
		render(<PollutantCard {...mockProps} />);

		expect(screen.getByText('--')).toBeInTheDocument();
	});
});
