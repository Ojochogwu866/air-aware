import { cilInfo } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';
import React from 'react';

interface ErrorDisplayProps {
	message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
	<div className="border border-red-300 bg-red-50 p-4">
		<div className="flex items-center gap-2 text-red-600">
			<CIcon icon={cilInfo} className="h-5 w-5" />
			<p>{message}</p>
		</div>
	</div>
);
