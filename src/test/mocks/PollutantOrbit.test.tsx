import { render, screen } from '@testing-library/react';
import PollutantOrbit from '../../components/PollutantOrbit';
import { describe, expect, it } from 'vitest';

describe('PollutantOrbit', () => {
	it('renders all pollutants', () => {
		render(<PollutantOrbit />);

		expect(screen.getByText('PM2.5')).toBeInTheDocument();
		expect(screen.getByText('SO2')).toBeInTheDocument();
		expect(screen.getByText('CO2')).toBeInTheDocument();
		expect(screen.getByText('NO2')).toBeInTheDocument();
	});

	it('renders SVG elements correctly', () => {
		const { container } = render(<PollutantOrbit />);

		expect(container.querySelector('svg')).toBeInTheDocument();
		expect(container.querySelectorAll('circle')).toHaveLength(9);
		expect(container.querySelectorAll('text')).toHaveLength(4);
	});
});
