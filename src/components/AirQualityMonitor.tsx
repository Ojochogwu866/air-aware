import { cilArrowLeft } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';
import React, { useState, useCallback } from 'react';
import { useLocation } from '../hooks/useLocation';
import { GeoLocation } from '../types/location';
import { CityDetail } from './CityDetail';
import { CityList } from './CityList';
import { LoadingSpinner } from './common/LoadingSpinner';
import { SearchBar } from './common/SearchBar';
import { ErrorDisplay } from './ErrorDisplay';
import { Settings } from './settings/settings';

export const AirQualityMonitor: React.FC = () => {
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [selectedCity, setSelectedCity] = useState<GeoLocation | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { loading: locationLoading, error: locationError } = useLocation();

    const handleBack = useCallback(() => {
        setView('list');
        setSearchQuery('');
    }, []);

    const handleCitySelect = useCallback((city: GeoLocation) => {
        setSelectedCity(city);
        setView('detail');
    }, []);

    if (locationLoading) return <LoadingSpinner />;
    if (locationError) return <ErrorDisplay message={locationError} />;

    return (
        <div className="h-full w-full overflow-y-auto bg-[#121212] p-5">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex-1">
                    {view === 'detail' && (
                        <button
                            onClick={handleBack}
                            className="flex items-center space-x-2 text-gray-400 hover:text-gray-200"
                        >
                            <CIcon icon={cilArrowLeft} className="h-5 w-5" />
                            <span>Back</span>
                        </button>
                    )}
                </div>
                <div>
                    <Settings />
                </div>
            </div>

            {view === 'detail' && selectedCity ? (
                <CityDetail
                    city={selectedCity}
                    onBack={handleBack}
                />
            ) : (
                <>
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search cities..."
                    />
                    <CityList
                        searchQuery={searchQuery}
                        onCitySelect={handleCitySelect}
                    />
                </>
            )}
        </div>
    );
};
