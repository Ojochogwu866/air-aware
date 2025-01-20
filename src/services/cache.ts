interface CacheItem {
	value: string;
	expiry: number;
}

class CacheService {
	private storage: Map<string, CacheItem>;
	private ALLOWED_KEYS = ['settings', 'alerts'];

	constructor() {
		this.storage = new Map();
	}

	async set(key: string, value: string, ttlSeconds: number): Promise<void> {
		if (!this.ALLOWED_KEYS.includes(key)) {
			return;
		}

		const expiry = Date.now() + ttlSeconds * 1000;
		this.storage.set(key, { value, expiry });

		try {
			await chrome.storage.local.set({ [key]: { value, expiry } });
		} catch (error) {
			console.warn('Failed to persist to storage:', error);
		}
	}

	async get(key: string): Promise<string | null> {
		if (!this.ALLOWED_KEYS.includes(key)) {
			return null;
		}

		const item = this.storage.get(key);

		if (!item) {
			try {
				const result = await chrome.storage.local.get(key);
				const stored = result[key] as CacheItem | undefined;

				if (stored && stored.expiry > Date.now()) {
					this.storage.set(key, stored);
					return stored.value;
				} else if (stored) {
					await chrome.storage.local.remove(key);
				}
			} catch (error) {
				console.warn('Failed to read from storage:', error);
			}
			return null;
		}

		if (item.expiry <= Date.now()) {
			this.storage.delete(key);
			return null;
		}

		return item.value;
	}

	async delete(key: string): Promise<void> {
		this.storage.delete(key);
		try {
			await chrome.storage.local.remove(key);
		} catch (error) {
			console.warn('Failed to remove from storage:', error);
		}
	}

	async clear(): Promise<void> {
		this.storage.clear();
		try {
			for (const key of this.ALLOWED_KEYS) {
				await chrome.storage.local.remove(key);
			}
		} catch (error) {
			console.warn('Failed to clear storage:', error);
		}
	}
}

export const cache = new CacheService();
