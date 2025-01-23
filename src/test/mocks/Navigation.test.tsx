import { render, screen } from '@testing-library/react';
import { AirQualityProvider } from '../../context/AirQualityContext';
import Navigation from '../../components/Navigation';
import { describe, expect, it } from 'vitest';

describe('Navigation', () => {
  const mockCity = 'New York';
  const mockAirQualityData = {
    co: 1.2,
    no2: 0.8,
    o3: 0.5,
    pm25: 12.3,
  };

  it('renders city name and air quality data', () => {
    render(
      <AirQualityProvider>
        <Navigation city={mockCity} />
      </AirQualityProvider>
    );

    expect(screen.getByText(/Air-Aware/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockCity))).toBeInTheDocument();
    expect(screen.getByText(/CO: 1.2/)).toBeInTheDocument();
  });

  it('handles missing air quality data', () => {
    render(
      <AirQualityProvider>
        <Navigation city={mockCity} />
      </AirQualityProvider>
    );

    expect(screen.getByText(/Air-Aware/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockCity))).toBeInTheDocument();
    expect(screen.getByText(/City: New York \|/)).toBeInTheDocument();
  });
}); 