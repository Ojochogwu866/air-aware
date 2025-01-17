import React from 'react';

interface MetricDisplayProps {
	label: string;
	value: number;
	unit: string;
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({
	label,
	value,
	unit,
}) => (
	<div className="rounded bg-white p-2">
		<div className="text-sm text-gray-500">{label}</div>
		<div className="font-semibold">
			{value} {unit}
		</div>
	</div>
);
