import { useAirQualityContext } from '../context/AirQualityContext';

const Navigation = ({ city }: { city: string }) => {
	const { state } = useAirQualityContext();
	const currentData = state.currentData;

	const getGasConcentrations = () => {
		if (!currentData) return '';
		return `CO: ${currentData.co.toFixed(1)} | NO2: ${currentData.no2.toFixed(1)} | O3: ${currentData.o3.toFixed(1)} | PM2.5: ${currentData.pm25.toFixed(1)}`;
	};

	return (
		<div className="relative flex h-[50px] w-full items-center border-b border-[#9CA3AF] bg-black text-white">
			<div className="flex w-full items-center justify-between px-4">
				<div className="flex h-[50px] items-center justify-center border-r border-[#9CA3AF] pr-[20px]">
					<h1 className="font-['Space_Grotesk'] text-base font-semibold">
						Air-Aware
					</h1>
				</div>
				<div className="flex-1 overflow-hidden pl-4">
					<div className="animate-scrolling-text whitespace-nowrap font-['JetBrains_Mono']">
						<span className="inline-block">
							City: {city} | {getGasConcentrations()}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
