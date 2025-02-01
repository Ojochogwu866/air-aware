import React, { memo } from 'react';
import { useCityList } from '../hooks/useCityList';
import { GeoLocation } from '../types/location';
import { Card } from './common/Card';
import { CityCard } from './common/CityCard';
import { LoadingSpinner } from './common/LoadingSpinner';

interface CityListProps {
    searchQuery: string;
    onCitySelect: (city: GeoLocation) => void;
}

export const CityList: React.FC<CityListProps> = memo(({
    searchQuery,
    onCitySelect,
}) => {
    const { cities, loading, error } = useCityList(searchQuery);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <Card className="bg-red-50">
                <p className="text-red-600">{error}</p>
            </Card>
        );
    }

    return (
        <div className="mt-4 space-y-3">
            {cities.map((city) => (
                <CityCard
                    key={`${city.latitude}-${city.longitude}`}
                    city={city}
                    onClick={() => onCitySelect(city)}
                    highlight={
                        !!searchQuery &&
                        city.city.toLowerCase().includes(searchQuery.toLowerCase())
                    }
                />
            ))}
        </div>
    );
});

CityList.displayName = 'CityList';
