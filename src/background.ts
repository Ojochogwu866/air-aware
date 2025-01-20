import { fetchAirQualityData } from './services/location';
import { Alert, AlertType, Settings } from './types/airQuality';
import { AirQualityData } from './types/location';
import { createBrowserNotification } from './utils/notifications';

let settings: Settings;

const checkAirQuality = async () => {
	try {
		const stored = await chrome.storage.local.get('settings');
		settings = stored.settings;

		const data: AirQualityData = await fetchAirQualityData();

		const alerts: Alert[] = [];

		if (data.co > settings.alertThresholds.co) {
			alerts.push(
    createAlert('co', data.co, settings.alertThresholds.co, `${data.location.city}, ${data.location.country}`)
);
		}

		if (settings.browserNotifications) {
			for (const alert of alerts) {
				await createBrowserNotification(alert);
			}
		}

		const { alerts: existingAlerts = [] } =
			await chrome.storage.local.get('alerts');
		await chrome.storage.local.set({
			alerts: [...existingAlerts, ...alerts],
		});
	} catch (error) {
		console.error('Error checking air quality:', error);
	}
};

chrome.alarms.create('checkAirQuality', {
	periodInMinutes: 30,
});

chrome.alarms.onAlarm.addListener((alarm) => {
	if (alarm.name === 'checkAirQuality') {
		checkAirQuality();
	}
});

chrome.storage.onChanged.addListener((changes, area) => {
	if (area === 'local' && changes.settings) {
		settings = changes.settings.newValue;
		// Update check interval if needed
		chrome.alarms.create('checkAirQuality', {
			periodInMinutes: settings.refreshInterval,
		});
	}
});

function createAlert(
  pollutant: string,
  value: number,
  threshold: number,
  location: string
): Alert {
  return {
    id: Date.now().toString(),
    timestamp: Date.now(),
    type: pollutant as AlertType,
    pollutant,
    value,
    threshold,
    location,
  };
}