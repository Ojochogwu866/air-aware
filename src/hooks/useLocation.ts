import { useEffect, useState } from 'react';
import { locationService } from '../services/location';
import { AirQualityData, GeoLocation } from '../types/location';

interface LocationState {
    loading: boolean;
    error: string | null;
    location: GeoLocation | null;
    airQuality: AirQualityData | null;
}

const initialState: LocationState = {
    loading: true,
    error: null,
    location: null,
    airQuality: null,
};

export function useLocation() {
    const [state, setState] = useState<LocationState>(initialState);

    useEffect(() => {
        let mounted = true;

        async function getUserLocation() {
            try {
                const position = await locationService.getCurrentPosition();
                const { latitude, longitude } = position.coords;

                const [location, airQuality] = await Promise.all([
                    locationService.getCityFromCoordinates(latitude, longitude),
                    locationService.getAirQualityData(latitude, longitude)
                ]);

                if (mounted) {
                    setState({
                        loading: false,
                        error: null,
                        location,
                        airQuality,
                    });
                }
            } catch (error) {
                if (mounted) {
                    setState((prev) => ({
                        ...prev,
                        loading: false,
                        error: error instanceof Error
                            ? error.message
                            : 'An unknown error occurred',
                    }));
                }
            }
        }

        getUserLocation();
        return () => { mounted = false; };
    }, []);

    return state;
}
