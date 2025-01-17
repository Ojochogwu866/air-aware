import React from 'react';

interface ThresholdInputProps {
	label: string;
	value: number;
	onChange: (value: number) => void;
}

export const ThresholdInput: React.FC<ThresholdInputProps> = ({
	label,
	value,
	onChange,
}) => (
	<div>
		<label className="block text-sm font-medium text-gray-700">{label}</label>
		<input
			type="number"
			value={value}
			onChange={(e) => onChange(Number(e.target.value))}
			className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
		/>
	</div>
);
