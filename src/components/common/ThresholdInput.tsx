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
		<label className="mb-1 block text-sm font-medium text-gray-300">
			{label}
		</label>
		<input
			type="number"
			value={value}
			onChange={(e) => onChange(Number(e.target.value))}
			className="w-full appearance-none rounded-lg border border-[#404040] bg-[#282828] px-3 py-2 text-gray-100 transition-colors [-moz-appearance:textfield] focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
		/>
	</div>
);
