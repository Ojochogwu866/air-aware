import { cilSettings } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';
import React, { useState } from 'react';
import { useAirQualityContext } from '../../context/AirQualityContext';
import { Settings as SettingsType } from '../../types/airQuality';
import { ThresholdInput } from '../common/ThresholdInput';

export const Settings: React.FC = () => {
	const { state, dispatch } = useAirQualityContext();
	const [isOpen, setIsOpen] = useState(false);

	const handleSettingsChange = (changes: Partial<SettingsType>) => {
		dispatch({ type: 'UPDATE_SETTINGS', payload: changes });
	};

	return (
		<div className="mt-8">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
			>
				<CIcon
					icon={cilSettings}
					className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
				/>
				<span>Settings</span>
			</button>

			{isOpen && (
				<div className="mt-4 rounded-lg bg-white p-4 shadow">
					<h3 className="mb-4 font-semibold">Alert Thresholds</h3>
					<div className="grid grid-cols-2 gap-4">
						<ThresholdInput
							label="CO₂ (ppm)"
							value={state.settings.alertThresholds.co2}
							onChange={(value) =>
								handleSettingsChange({
									alertThresholds: {
										...state.settings.alertThresholds,
										co2: value,
									},
								})
							}
						/>
						<ThresholdInput
							label="NO₂ (ppb)"
							value={state.settings.alertThresholds.no2}
							onChange={(value) =>
								handleSettingsChange({
									alertThresholds: {
										...state.settings.alertThresholds,
										no2: value,
									},
								})
							}
						/>
						<ThresholdInput
							label="O₃ (ppb)"
							value={state.settings.alertThresholds.o3}
							onChange={(value) =>
								handleSettingsChange({
									alertThresholds: {
										...state.settings.alertThresholds,
										o3: value,
									},
								})
							}
						/>
						<ThresholdInput
							label="PM2.5 (µg/m³)"
							value={state.settings.alertThresholds.pm25}
							onChange={(value) =>
								handleSettingsChange({
									alertThresholds: {
										...state.settings.alertThresholds,
										pm25: value,
									},
								})
							}
						/>
					</div>

					<div className="mt-4">
						<label className="block text-sm font-medium text-gray-700">
							Refresh Interval (seconds)
						</label>
						<input
							type="number"
							value={state.settings.refreshInterval}
							onChange={(e) =>
								handleSettingsChange({
									refreshInterval: Number(e.target.value),
								})
							}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
							min="10"
							max="300"
						/>
					</div>

					<div className="mt-4">
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={state.settings.emailNotifications}
								onChange={(e) =>
									handleSettingsChange({
										emailNotifications: e.target.checked,
									})
								}
								className="rounded border-gray-300 text-blue-600"
							/>
							<span className="text-sm text-gray-700">
								Enable email notifications
							</span>
						</label>
					</div>
				</div>
			)}
		</div>
	);
};
