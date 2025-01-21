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
	<div className="border border-[#404040] h-11 flex flex-col items-start justify-center bg-[#282828] p-3 transition-colors hover:bg-[#323232]">
		<div className="text-xs text-gray-400 font-normal">{label}</div>
		<div className="font-medium text-gray-100">
			{value} <span className="text-gray-300 text-[10px]">{unit}</span>
		</div>
	</div>
);
