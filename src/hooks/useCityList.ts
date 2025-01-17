import { useEffect, useState } from 'react';
import { defaultCities } from '../data/defaultCities';
import { locationService } from '../services/location';
import { AirQualityData, GeoLocation } from '../types/location';

interface CityWithAirQuality extends GeoLocation {
	airQuality: AirQualityData;
}

export function useCityList(searchQuery: string) {
	const [cities, setCities] = useState<CityWithAirQuality[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadDefaultCities = async () => {
			try {
				const citiesWithData = await Promise.all(
					defaultCities.map(async (city) => {
						const airQuality = await locationService.getAirQualityData(
							city.latitude,
							city.longitude
						);
						return { ...city, airQuality };
					})
				);
				setCities(citiesWithData);
				setLoading(false);
			} catch (err) {
				setError('Failed to load default cities');
				setLoading(false);
			}
		};

		loadDefaultCities();
	}, []);

	useEffect(() => {
		const searchCities = async () => {
			if (!searchQuery || searchQuery.length < 2) {
				return;
			}

			setLoading(true);
			try {
				const searchResults = await locationService.searchCities(searchQuery);
				const searchedCitiesWithData = await Promise.all(
					searchResults.map(async (city) => {
						const airQuality = await locationService.getAirQualityData(
							city.latitude,
							city.longitude
						);
						return { ...city, airQuality };
					})
				);

				const combinedCities = [...searchedCitiesWithData];

				defaultCities.forEach((defaultCity) => {
					if (
						!combinedCities.some(
							(city) =>
								city.city === defaultCity.city &&
								city.country === defaultCity.country
						)
					) {
						const existingCity = cities.find(
							(c) =>
								c.city === defaultCity.city && c.country === defaultCity.country
						);
						if (existingCity) {
							combinedCities.push(existingCity);
						}
					}
				});

				setCities(combinedCities);
			} catch (err) {
				setError('Failed to search cities');
			} finally {
				setLoading(false);
			}
		};

		const debounce = setTimeout(searchCities, 300);
		return () => clearTimeout(debounce);
	}, [searchQuery]);

	return { cities, loading, error };
}
