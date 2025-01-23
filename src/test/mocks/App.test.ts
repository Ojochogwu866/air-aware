import '@testing-library/jest-dom';
import { vi } from 'vitest';

global.chrome = {
	storage: {
		local: {
			get: vi.fn(),
			set: vi.fn(),
		},
		onChanged: {
			addListener: vi.fn(),
		},
	},
	alarms: {
		create: vi.fn(),
		onAlarm: {
			addListener: vi.fn(),
		},
	},
	notifications: {
		create: vi.fn(),
	},
} as any;

Object.defineProperty(global.navigator, 'geolocation', {
	value: {
		getCurrentPosition: vi.fn(),
		watchPosition: vi.fn(),
		clearWatch: vi.fn(),
	},
	configurable: true,
});
