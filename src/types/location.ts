export interface GeoLocation {
	latitude: number;
	longitude: number;
	city: string;
	country: string;
}

export interface AirQualityData {
	co2: number;
	no2: number;
	o3: number;
	pm25: number;
	timestamp: number;
	location: GeoLocation;
}
