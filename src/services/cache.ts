interface CacheItem {
	value: string;
	expiry: number;
}

class CacheService {
	private storage: Map<string, CacheItem>;

	constructor() {
		this.storage = new Map();
	}

	async set(key: string, value: string, ttlSeconds: number): Promise<void> {
		const expiry = Date.now() + ttlSeconds * 1000;
		this.storage.set(key, { value, expiry });

		try {
			localStorage.setItem(key, JSON.stringify({ value, expiry }));
		} catch (error) {
			console.warn('Failed to persist to localStorage:', error);
		}
	}

	async get(key: string): Promise<string | null> {
		const item = this.storage.get(key);

		if (!item) {
			try {
				const stored = localStorage.getItem(key);
				if (stored) {
					const parsed = JSON.parse(stored) as CacheItem;
					if (parsed.expiry > Date.now()) {
						this.storage.set(key, parsed);
						return parsed.value;
					} else {
						localStorage.removeItem(key);
					}
				}
			} catch (error) {
				console.warn('Failed to read from localStorage:', error);
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
			localStorage.removeItem(key);
		} catch (error) {
			console.warn('Failed to remove from localStorage:', error);
		}
	}

	async clear(): Promise<void> {
		this.storage.clear();
		try {
			localStorage.clear();
		} catch (error) {
			console.warn('Failed to clear localStorage:', error);
		}
	}
}

export const cache = new CacheService();
