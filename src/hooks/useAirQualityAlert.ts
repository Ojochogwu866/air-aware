import { useCallback, useEffect } from 'react';
import { useAirQualityContext } from '../context/AirQualityContext';
import { AirQualityThresholds, Alert, AlertType } from '../types/airQuality';
import { AirQualityData } from '../types/location';

export function useAirQualityAlerts(): void {
	const { state, dispatch } = useAirQualityContext();

	const checkThresholds = useCallback(
		(currentData: AirQualityData, thresholds: AirQualityThresholds): void => {
			const createAlert = (
				metric: AlertType,
				threshold: number,
				value: number
			): Alert => ({
				id: `${metric}-${Date.now()}`,
				type: metric,
				pollutant: metric,
				threshold,
				value,
				timestamp: Date.now(),
				location: state.currentData?.location?.city || 'Unknown',
			});

			(Object.entries(thresholds) as [AlertType, number][]).forEach(
				([metric, threshold]) => {
					const value = currentData[metric];
					if (value > threshold) {
						const alert = createAlert(metric, threshold, value);
						dispatch({ type: 'ADD_ALERT', payload: alert });
					}
				}
			);
		},
		[dispatch, state.currentData?.location?.city]
	);

	useEffect(() => {
		if (!state.currentData) return;

		checkThresholds(state.currentData, state.settings.alertThresholds);
	}, [state.currentData, state.settings.alertThresholds, checkThresholds]);
}
