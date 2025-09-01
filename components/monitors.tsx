import React from "react";
import { Text, View } from "react-native";

const Monitors = () => {
	const [temperature, setTemperature] = React.useState(0);
	const [humidity, setHumidity] = React.useState(0);
	const [soil, setSoil] = React.useState(0);

	const getBarColor = (value: number) => {
		if (value < 30) return "bg-blue-500";
		if (value < 70) return "bg-yellow-500";
		return "bg-red-500";
	};

	const fetchData = () => {
		setTemperature(Math.floor(Math.random() * 100));
		setHumidity(Math.floor(Math.random() * 100));
		setSoil(Math.floor(Math.random() * 100));
	};

	React.useEffect(() => {
		fetchData();

		const interval = setInterval(() => {
			fetchData();
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<View className="gap-2 rounded-md w-full px-4 bg-slate-300 py-4">
			<View className="">
				<Text className="font-medium text-base text-slate-500">
					Temperature
				</Text>
				<View className="flex flex-row justify-between items-center gap-2">
					<Text className="font-bold text-xl">{temperature}%</Text>
					<View className="flex flex-row items-center">
						<View
							style={{ width: temperature * 2.8 }}
							className={`h-6 rounded-md ${getBarColor(temperature)}`}
						></View>
						<View className="h-6 w-1 bg-slate-500 rounded-md"></View>
					</View>
				</View>
			</View>
			<View className="">
				<Text className="font-medium text-base text-slate-500">Humidity</Text>

				<View className="flex flex-row justify-between items-center gap-2">
					<Text className="font-bold text-xl">{humidity}%</Text>
					<View className="flex flex-row items-center">
						<View
							style={{ width: humidity * 2.8 }}
							className={`h-6 rounded-md ${getBarColor(humidity)}`}
						></View>
						<View className="h-6 w-1 bg-slate-500 rounded-md"></View>
					</View>
				</View>
			</View>
			<View className="">
				<Text className="font-medium text-base text-slate-500">Soil</Text>
				<View className="flex flex-row justify-between items-center gap-2">
					<Text className="font-bold text-xl">{soil}%</Text>

					<View>
						<View className="flex flex-row items-center">
							<View
								style={{ width: soil * 2.8 }}
								className={`h-6 rounded-md ${getBarColor(soil)}`}
							></View>
							<View className="h-6 w-1 bg-slate-500 rounded-md"></View>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Monitors;
