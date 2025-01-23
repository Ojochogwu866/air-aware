import { beforeEach, describe, expect, it, vi } from 'vitest';
import { locationService } from '../../services/location';

describe('LocationService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getCurrentPosition', () => {
		it('returns position when geolocation is successful', async () => {
			const mockPosition = {
				coords: {
					latitude: 40.7128,
					longitude: -74.006,
				},
			};

			global.navigator.geolocation.getCurrentPosition = vi.fn((success) =>
				success(mockPosition)
			);

			const result = await locationService.getCurrentPosition();
			expect(result).toEqual(mockPosition);
		});

		it('throws error when geolocation is denied', async () => {
			global.navigator.geolocation.getCurrentPosition = vi.fn((_, error) =>
				error(new Error('Permission denied'))
			);

			await expect(locationService.getCurrentPosition()).rejects.toThrow(
				'Permission denied'
			);
		});
	});

	describe('getCityFromCoordinates', () => {
		it('fetches city data correctly', async () => {
			global.fetch = vi.fn().mockResolvedValue({
				ok: true,
				json: () =>
					Promise.resolve({
						results: [
							{
								components: {
									city: 'New York',
									country: 'United States',
								},
							},
						],
					}),
			});

			const result = await locationService.getCityFromCoordinates(
				40.7128,
				-74.006
			);
			expect(result.city).toBe('New York');
			expect(result.country).toBe('United States');
		});
	});
});
