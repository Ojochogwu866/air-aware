import { AirQualityData } from './location';

export interface AirQualityThresholds {
	co: number;
	no2: number;
	o3: number;
	pm25: number;
}

export type AlertType = keyof AirQualityThresholds;

export interface Alert {
	id: string;
	type: AlertType;
	threshold: number;
	pollutant: string;
	location: string;
	value: number;
	timestamp: number;
}

export interface Settings {
	refreshInterval: number;
	alertThresholds: AirQualityThresholds;
	browserNotifications: boolean;
	notificationSound: boolean;
}

export interface AirQualityState {
	currentData: AirQualityData | null;
	historicalData: HistoricalData[];
	alerts: Alert[];
	settings: Settings;
}

export interface HistoricalData extends AirQualityData {
	timestamp: number;
	co: number;
	no2: number;
	o3: number;
	pm25: number;
}

export interface AirQualityMeasurement {
	parameter: string;
	value: number;
	unit: string;
	lastUpdated: string;
}
