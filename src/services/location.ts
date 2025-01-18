import { AirQualityMeasurement, HistoricalData } from '../types/airQuality';
import { AirQualityData, GeoLocation } from '../types/location';
import { cache } from './cache';

class LocationService {
	private readonly GEOCODING_API_KEY = process.env.REACT_APP_GEOCODING_API_KEY;
	private readonly AIR_QUALITY_API_KEY =
		process.env.REACT_APP_AIR_QUALITY_API_KEY;
	private readonly CACHE_TTL = 60 * 60;

	async getCurrentPosition(): Promise<GeolocationPosition> {
		return new Promise((resolve, reject) => {
			if (!navigator.geolocation) {
				reject(new Error('Geolocation is not supported'));
				return;
			}
			navigator.geolocation.getCurrentPosition(resolve, reject, {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			});
		});
	}

	async getCityFromCoordinates(lat: number, lon: number): Promise<GeoLocation> {
		const cacheKey = `geocoding-${lat}-${lon}`;
		const cachedData = await cache.get(cacheKey);

		if (cachedData) {
			return JSON.parse(cachedData);
		}

		try {
			const response = await fetch(
				`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${this.GEOCODING_API_KEY}`
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			if (data.results && data.results.length > 0) {
				const result = data.results[0].components;
				const location: GeoLocation = {
					latitude: lat,
					longitude: lon,
					city: result.city || result.town || result.village || 'Unknown',
					country: result.country,
				};

				await cache.set(cacheKey, JSON.stringify(location), this.CACHE_TTL);
				return location;
			}

			throw new Error('No results found');
		} catch (error) {
			console.error('Error getting city:', error);
			throw error;
		}
	}

	async getAirQualityData(lat: number, lon: number): Promise<AirQualityData> {
		const cacheKey = `airquality-${lat}-${lon}`;
		const cachedData = await cache.get(cacheKey);

		if (cachedData) {
			return JSON.parse(cachedData);
		}

		try {
			if (!this.AIR_QUALITY_API_KEY) {
				throw new Error('Air quality API key is not configured');
			}

			const response = await fetch(
				`/api/openaq/v3/locations?coordinates=${lat},${lon}&radius=12000&limit=1000`,
				{
					method: 'GET',
					headers: {
						'X-API-Key': this.AIR_QUALITY_API_KEY,
					},
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			const measurements = data.results[0]?.measurements || [];

			const airQualityData: AirQualityData = {
				co2: this.findMeasurement(measurements, 'co2'),
				no2: this.findMeasurement(measurements, 'no2'),
				o3: this.findMeasurement(measurements, 'o3'),
				pm25: this.findMeasurement(measurements, 'pm25'),
				timestamp: Date.now(),
				location: await this.getCityFromCoordinates(lat, lon),
			};

			await cache.set(cacheKey, JSON.stringify(airQualityData), 300);
			return airQualityData;
		} catch (error) {
			console.error('Error getting air quality:', error);
			throw error;
		}
	}

	async getHistoricalData(
		lat: number,
		lon: number,
		days: number = 7
	): Promise<HistoricalData[]> {
		const cacheKey = `historical-${lat}-${lon}-${days}`;
		const cachedData = await cache.get(cacheKey);

		if (cachedData) {
			return JSON.parse(cachedData);
		}

		try {
			if (!this.AIR_QUALITY_API_KEY) {
				throw new Error('Air quality API key is not configured');
			}
			const dateFrom = new Date(
				Date.now() - days * 24 * 60 * 60 * 1000
			).toISOString();
			const response = await fetch(
				`/api/openaq/v2/measurements?coordinates=${lat},${lon}&radius=10000&date_from=${dateFrom}`,
				{
					headers: new Headers({
						Accept: 'application/json',
						'X-API-Key': this.AIR_QUALITY_API_KEY,
					}),
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			const historicalData = await this.formatHistoricalData(
				data.results || [],
				lat,
				lon
			);

			await cache.set(cacheKey, JSON.stringify(historicalData), this.CACHE_TTL);
			return historicalData;
		} catch (error) {
			console.error('Error getting historical data:', error);
			throw error;
		}
	}

	private findMeasurement(
		measurements: AirQualityMeasurement[],
		parameter: string
	): number {
		return measurements.find((m) => m.parameter === parameter)?.value || 0;
	}

	private async formatHistoricalData(
		results: any[],
		lat: number,
		lon: number
	): Promise<HistoricalData[]> {
		const location = await this.getCityFromCoordinates(lat, lon);
		const dataMap = new Map<string, HistoricalData>();

		results.forEach((result) => {
			const timestamp = new Date(result.date.utc).getTime();
			const timeKey = timestamp.toString();

			if (!dataMap.has(timeKey)) {
				dataMap.set(timeKey, {
					timestamp,
					co2: 0,
					no2: 0,
					o3: 0,
					pm25: 0,
					location,
				});
			}

			const current = dataMap.get(timeKey)!;
			const parameter = result.parameter.toLowerCase();
			if (parameter in current) {
				current[
					parameter as keyof Omit<HistoricalData, 'timestamp' | 'location'>
				] = result.value;
			}
		});

		return Array.from(dataMap.values()).sort(
			(a, b) => a.timestamp - b.timestamp
		);
	}

	async searchCities(query: string): Promise<GeoLocation[]> {
		const cacheKey = `citysearch-${query}`;
		const cachedData = await cache.get(cacheKey);

		if (cachedData) {
			return JSON.parse(cachedData);
		}

		try {
			const response = await fetch(
				`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${this.GEOCODING_API_KEY}&limit=5`
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			const locations = data.results.map((result: any) => ({
				latitude: result.geometry.lat,
				longitude: result.geometry.lng,
				city:
					result.components.city ||
					result.components.town ||
					result.components.village ||
					'Unknown',
				country: result.components.country,
			}));

			await cache.set(cacheKey, JSON.stringify(locations), this.CACHE_TTL);
			return locations;
		} catch (error) {
			console.error('Error searching cities:', error);
			throw error;
		}
	}
}

export const locationService = new LocationService();
