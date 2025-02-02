/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const [isTransitioning, setIsTransitioning] = useState(false);
    const { loading: locationLoading, error: locationError } = useLocation();

    const handleBack = useCallback(() => {
        setIsTransitioning(true);
        setTimeout(() => {
            setView('list');
            setSearchQuery('');
            setIsTransitioning(false);
        }, 300);
    }, []);

    const handleCitySelect = useCallback((city: GeoLocation) => {
        setIsTransitioning(true);
        setSelectedCity(city);
        setTimeout(() => {
            setView('detail');
            setIsTransitioning(false);
        }, 300);
    }, []);

    if (locationLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (locationError) {
        return (
            <div className="h-full">
                <ErrorDisplay message={locationError} />
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col bg-[#121212] overflow-hidden pb-5">
            <div className="flex-none p-3 border-b border-[#282828]">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        {view === 'detail' && (
                            <button
                                onClick={handleBack}
                                className="flex items-center space-x-2 text-gray-400 transition-colors hover:text-gray-200"
                            >
                                <CIcon icon={cilArrowLeft} className="h-5 w-5" />
                                <span>Back</span>
                            </button>
                        )}
                    </div>
                    <Settings />
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <div className="relative h-full">
                    <div
                        className={`absolute inset-0 max-h-[600px] overflow-y-scroll transition-all duration-300 hide-scrollbar ${
                            view === 'list'
                                ? 'translate-x-0 opacity-100'
                                : '-translate-x-full opacity-0'
                        }`}
                    >
                        <div className="px-3">
                            <div className="py-3">
                                <SearchBar
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    placeholder="Search cities..."
                                />
                            </div>
                            <CityList
                                searchQuery={searchQuery}
                                onCitySelect={handleCitySelect}
                            />
                        </div>
                    </div>

                    <div
                        className={`absolute inset-0 transition-all duration-300 ${
                            view === 'detail'
                                ? 'translate-x-0 opacity-100'
                                : 'translate-x-full opacity-0'
                        }`}
                    >
                        <div className="px-3">
                            {selectedCity && (
                                <CityDetail
                                    city={selectedCity}
                                    onBack={handleBack}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};