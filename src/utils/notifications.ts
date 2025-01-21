import { Alert } from '../types/airQuality';

export const createBrowserNotification = async (alert: Alert) => {
	try {
		if (typeof chrome === 'undefined' || !chrome.notifications) {
			console.warn('Browser notifications are not available');
			return;
		}

		if (Notification.permission !== 'granted') {
			const permission = await Notification.requestPermission();
			if (permission !== 'granted') return;
		}

		await chrome.notifications.create({
			type: 'basic',
			iconUrl: '/icon48.png',
			title: 'Air Quality Alert',
			message: `${alert.pollutant.toUpperCase()} levels have exceeded your threshold!\nCurrent: ${alert.value}\nThreshold: ${alert.threshold}\nLocation: ${alert.location}`,
			priority: 2,
		});

		await chrome.action.setBadgeText({ text: '!' });
		await chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });

		const { settings } = await chrome.storage.local.get('settings');
		if (settings?.notificationSound) {
			const audio = new Audio(chrome.runtime.getURL('notification.mp3'));
			await audio.play();
		}
	} catch (error) {
		console.error('Error creating notification:', error);
	}
};

export const clearBadge = async () => {
	try {
		if (typeof chrome !== 'undefined' && chrome.action) {
			await chrome.action.setBadgeText({ text: '' });
		}
	} catch (error) {
		console.error('Error clearing badge:', error);
	}
};
