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
	<div className=" border border-[#404040] bg-[#282828] p-3 transition-colors hover:bg-[#323232]">
		<div className="text-sm text-gray-400">{label}</div>
		<div className="font-semibold text-gray-100">
			{value} <span className="text-gray-300">{unit}</span>
		</div>
	</div>
);
