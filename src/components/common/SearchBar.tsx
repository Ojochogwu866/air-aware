import { cilSearch } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';
import React from 'react';

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
	value,
	onChange,
	placeholder = 'Search by city',
}) => (
	<div className="relative">
		<input
			type="text"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			className="w-full rounded-lg border py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500"
		/>
		<CIcon
			icon={cilSearch}
			className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
		/>
	</div>
);
