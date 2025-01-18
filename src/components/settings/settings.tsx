import { cilArrowRight, cilSettings } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';
import React, { useState } from 'react';
import { useAirQualityContext } from '../../context/AirQualityContext';
import { Settings as SettingsType } from '../../types/airQuality';
import { ThresholdInput } from '../common/ThresholdInput';

export const Settings: React.FC = () => {
	const { state, dispatch } = useAirQualityContext();
	const [isOpen, setIsOpen] = useState(false);
	const [email, setEmail] = useState('');

	const handleSettingsChange = (changes: Partial<SettingsType>) => {
		dispatch({ type: 'UPDATE_SETTINGS', payload: changes });
	};

	return (
		<>
			<button
				aria-label="settings"
				onClick={() => setIsOpen(true)}
				className="flex items-center justify-center p-2 text-gray-400 transition-colors hover:text-gray-200"
			>
				<CIcon icon={cilSettings} className="h-5 w-5" />
			</button>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="w-[90%] max-w-[540px] rounded-lg border border-[#282828] bg-[#181818] p-6 shadow-lg">
						<div className="mb-6 flex items-center justify-between">
							<h2 className="text-xl font-semibold text-gray-200">Settings</h2>
							<button
								onClick={() => setIsOpen(false)}
								className="text-gray-400 hover:text-gray-200"
							>
								✕
							</button>
						</div>

						<div className="space-y-6">
							<div>
								<h3 className="mb-4 font-semibold text-gray-200">
									Alert Thresholds
								</h3>
								<div className="grid grid-cols-2 gap-4">
									<ThresholdInput
										label="CO (ppm)"
										value={state.settings.alertThresholds.co}
										onChange={(value) =>
											handleSettingsChange({
												alertThresholds: {
													...state.settings.alertThresholds,
													co: value,
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
							</div>

							<div>
								<label className="mb-2 block text-sm font-medium text-gray-200">
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
									className="w-full appearance-none rounded-lg border border-[#404040] bg-[#282828] px-3 py-2 text-gray-100 transition-colors [-moz-appearance:textfield] focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
									min="10"
									max="300"
								/>
							</div>

							<div className="space-y-3">
								<label className="flex items-center gap-2">
									<input
										type="checkbox"
										checked={state.settings.emailNotifications}
										onChange={(e) =>
											handleSettingsChange({
												emailNotifications: e.target.checked,
											})
										}
										className="rounded border-[#282828] bg-[#282828] text-blue-600"
									/>
									<span className="text-sm text-gray-200">
										Enable email notifications
									</span>
								</label>

								{state.settings.emailNotifications && (
									<div className="flex gap-2">
										<input
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="Enter your email"
											className="w-full flex-1 rounded-lg border border-[#404040] bg-[#282828] px-3 py-2 text-gray-100 transition-colors focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
										/>
										<button
											aria-label="submit"
											className="flex items-center justify-center rounded-md bg-[#008060] px-4 py-2 transition-colors hover:bg-[#006e52]"
											onClick={() => {
												console.log('Submit email:', email);
											}}
										>
											<CIcon
												icon={cilArrowRight}
												className="h-5 w-5 text-white"
											/>
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
