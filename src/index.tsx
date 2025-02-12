import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AirQualityProvider } from './context/AirQualityContext';
import './index.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<AirQualityProvider>
			<App />
		</AirQualityProvider>
	</React.StrictMode>
);
