import { cilReload } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';

import React from 'react';

export const LoadingSpinner: React.FC = () => (
	<div className="flex h-screen items-center justify-center">
		<CIcon icon={cilReload} className="h-8 w-8 animate-spin text-blue-500" />
	</div>
);
