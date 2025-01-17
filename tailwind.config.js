/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	theme: {
		extend: {
			colors: {
				'air-good': '#34D399',
				'air-moderate': '#FBBF24',
				'air-poor': '#EF4444',
			},
			width: {
				popup: '400px',
			},
			height: {
				popup: '600px',
			},
		},
	},
	plugins: [],
};
