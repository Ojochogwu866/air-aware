import { useAirQualityContext } from '../context/AirQualityContext';

const Navigation = ({ city }: { city: string }) => {
	const { state } = useAirQualityContext();
	const currentData = state.currentData;

	const getGasConcentrations = () => {
		if (!currentData) return '';
		return `CO: ${currentData.co.toFixed(1)} | NO2: ${currentData.no2.toFixed(1)} | O3: ${currentData.o3.toFixed(1)} | PM2.5: ${currentData.pm25.toFixed(1)}`;
	};

	return (
		<div className="flex h-[70px] relative  w-full items-center bg-black text-white border-b border-[#9CA3AF]">
			<div className="flex w-full items-center justify-between px-4">
				<div className='border-r flex justify-center items-center border-[#9CA3AF] pr-[20px] h-[70px]'>
				<h1 className="font-['Space_Grotesk'] text-xl font-bold ">Air-Aware</h1>
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
