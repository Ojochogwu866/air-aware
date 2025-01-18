import { cilInfo } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';
import React from 'react';
import { useAirQualityContext } from '../../context/AirQualityContext';
import { Alert } from '../../types/airQuality';

const AlertItem: React.FC<{ alert: Alert }> = ({ alert }) => (
	<div className="rounded-lg border border-[#282828] bg-[#181818] p-4">
		<div className="flex items-center gap-2">
			<CIcon icon={cilInfo} className="h-5 w-5 text-gray-400" />
			<div>
				<h3 className="font-medium text-gray-200">
					{alert.type.toUpperCase()} Alert
				</h3>
				<p className="text-sm text-gray-400">
					Current value: {alert.value} (Threshold: {alert.threshold})
				</p>
				<p className="text-xs text-gray-500">
					{new Date(alert.timestamp).toLocaleString()}
				</p>
			</div>
		</div>
	</div>
);

export const AlertsList: React.FC = () => {
	const { state } = useAirQualityContext();

	if (state.alerts.length === 0) {
		return (
			<div className="rounded-lg border border-[#282828] bg-[#181818] p-4 text-center text-gray-400">
				No active alerts
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<h2 className="text-lg font-semibold text-gray-200">Active Alerts</h2>
			{state.alerts.map((alert) => (
				<AlertItem key={alert.id} alert={alert} />
			))}
		</div>
	);
};
