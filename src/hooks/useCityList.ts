import { useEffect, useState, useCallback, useRef } from 'react';
import { defaultCities } from '../data/defaultCities';
import { locationService } from '../services/location';
import { AirQualityData, GeoLocation } from '../types/location';

interface CityWithAirQuality extends GeoLocation {
    airQuality: AirQualityData;
}

interface CityListState {
    cities: CityWithAirQuality[];
    loading: boolean;
    error: string | null;
}

const initialState: CityListState = {
    cities: [],
    loading: true,
    error: null,
};

export function useCityList(searchQuery: string) {
    const [state, setState] = useState<CityListState>(initialState);
    const defaultCitiesWithDataRef = useRef<CityWithAirQuality[]>([]);

    const loadCityWithAirQuality = useCallback(async (city: GeoLocation): Promise<CityWithAirQuality> => {
        const airQuality = await locationService.getAirQualityData(
            city.latitude,
            city.longitude
        );
        return { ...city, airQuality };
    }, []);

    useEffect(() => {
        let mounted = true;

        async function loadDefaultCities() {
            try {
                const citiesWithData = await Promise.all(
                    defaultCities.map(loadCityWithAirQuality)
                );
                
                if (mounted) {
                    defaultCitiesWithDataRef.current = citiesWithData;
                    setState({
                        cities: citiesWithData,
                        loading: false,
                        error: null
                    });
                }
            } catch (err) {
                if (mounted) {
                    setState(prev => ({
                        ...prev,
                        error: 'Failed to load default cities',
                        loading: false
                    }));
                }
            }
        }

        loadDefaultCities();
        return () => { mounted = false; };
    }, [loadCityWithAirQuality]);

    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();

        async function searchCities() {
            if (!searchQuery.trim()) {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    cities: defaultCitiesWithDataRef.current
                }));
                return;
            }

            if (searchQuery.length < 2) {
                return;
            }

            setState(prev => ({ ...prev, loading: true }));

            try {
                const searchResults = await locationService.searchCities(searchQuery);
                
                if (!mounted) return;

                const searchedCitiesWithData = await Promise.all(
                    searchResults.map(loadCityWithAirQuality)
                );

                const existingCityIds = new Set(
                    searchedCitiesWithData.map(city => `${city.city}-${city.country}`)
                );

                const relevantDefaultCities = defaultCitiesWithDataRef.current.filter(
                    city => !existingCityIds.has(`${city.city}-${city.country}`)
                );

                if (mounted) {
                    setState({
                        cities: [...searchedCitiesWithData, ...relevantDefaultCities],
                        loading: false,
                        error: null
                    });
                }
            } catch (err) {
                if (mounted) {
                    setState(prev => ({
                        ...prev,
                        error: 'Failed to search cities',
                        loading: false
                    }));
                }
            }
        }

        const debounceTimeout = setTimeout(searchCities, 300);

        return () => {
            mounted = false;
            clearTimeout(debounceTimeout);
            abortController.abort();
        };
    }, [searchQuery, loadCityWithAirQuality]);

    return state;
}