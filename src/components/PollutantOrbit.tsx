const PollutantOrbit = () => {
	const pollutants = [
		{ name: 'PM2.5', radius: 120, duration: 20 },
		{ name: 'SO2', radius: 90, duration: 15 },
		{ name: 'CO2', radius: 60, duration: 10 },
		{ name: 'NO2', radius: 30, duration: 5 },
	];

	return (
		<div className="mx-auto w-full max-w-lg">
			<svg viewBox="0 0 300 300" className="h-full w-full bg-transparent">
				<circle cx="150" cy="150" r="4" fill="white" />
				{pollutants.map(({ name, radius, duration }) => (
					<g key={name}>
						<circle
							cx="150"
							cy="150"
							r={radius}
							fill="none"
							stroke="rgba(255,255,255,0.2)"
							strokeWidth="1"
						/>

						<circle cx="150" cy={150 - radius} r="4" fill="white">
							<animateTransform
								attributeName="transform"
								type="rotate"
								from="0 150 150"
								to="360 150 150"
								dur={`${duration}s`}
								repeatCount="indefinite"
							/>
						</circle>

						<text
							x={150}
							y={150 - radius}
							fill="white"
							fontSize="12"
							textAnchor="middle"
							dy="-8"
						>
							{name}
							<animateTransform
								attributeName="transform"
								type="rotate"
								from="0 150 150"
								to="360 150 150"
								dur={`${duration}s`}
								repeatCount="indefinite"
							/>
						</text>
					</g>
				))}
			</svg>
		</div>
	);
};

export default PollutantOrbit;
