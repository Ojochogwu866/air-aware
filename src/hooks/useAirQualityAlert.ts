import { useCallback, useEffect } from 'react';
import { useAirQualityContext } from '../context/AirQualityContext';
import { AirQualityThresholds, Alert, AlertType } from '../types/airQuality';
import { AirQualityData } from '../types/location';

const createAlert = (
	metric: AlertType,
	threshold: number,
	value: number
): Alert => ({
	id: `${metric}-${Date.now()}`,
	type: metric,
	threshold,
	value,
	timestamp: Date.now(),
});

export function useAirQualityAlerts(): void {
	const { state, dispatch } = useAirQualityContext();

	const checkThresholds = useCallback(
		(currentData: AirQualityData, thresholds: AirQualityThresholds): void => {
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
		[dispatch]
	);

	useEffect(() => {
		if (!state.currentData) return;

		checkThresholds(state.currentData, state.settings.alertThresholds);
	}, [state.currentData, state.settings.alertThresholds, checkThresholds]);
}
