import database from "@/lib/firebase.config";
import { onValue, ref } from "firebase/database";
import React from "react";
import { Text, View } from "react-native";

const Monitors = () => {
	const [temperature, setTemperature] = React.useState(0);
	const [humidity, setHumidity] = React.useState(0);
	const [soil1, setSoil1] = React.useState(0);
	const [soil2, setSoil2] = React.useState(0);

	const getBarColor = (value: number) => {
		if (value < 30) return "bg-blue-500";
		if (value < 70) return "bg-yellow-500";
		return "bg-red-500";
	};

	React.useEffect(() => {
		getTemperatureValue();
		getHumidityValue();
		getSoil1Value();
		getSoil2Value();
	}, []);

	const getTemperatureValue = async () => {
		const tempRef = ref(database, "sensors/temperature");
		const subscribe = onValue(tempRef, (snapshot) => {
			const data = snapshot.val();
			setTemperature(data);
		});

		return () => subscribe();
	};
	const getHumidityValue = async () => {
		const tempRef = ref(database, "sensors/humidity");
		const subscribe = onValue(tempRef, (snapshot) => {
			const data = snapshot.val();
			setHumidity(data);
		});

		return () => subscribe();
	};
	const getSoil1Value = async () => {
		const tempRef = ref(database, "sensors/soil1");
		const subscribe = onValue(tempRef, (snapshot) => {
			const data = snapshot.val();
			setSoil1(data);
		});

		return () => subscribe();
	};
	const getSoil2Value = async () => {
		const tempRef = ref(database, "sensors/soil2");
		const subscribe = onValue(tempRef, (snapshot) => {
			const data = snapshot.val();
			setSoil2(data);
		});

		return () => subscribe();
	};

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
							className={`h-6 rounded-sm ${getBarColor(temperature)}`}
						></View>
						<View className="h-8 w-0.5 bg-slate-500 rounded-sm"></View>
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
							className={`h-6 rounded-sm ${getBarColor(humidity)}`}
						></View>
						<View className="h-8 w-0.5 bg-slate-500 rounded-sm"></View>
					</View>
				</View>
			</View>
			<View className="">
				<Text className="font-medium text-base text-slate-500">Soil 1</Text>
				<View className="flex flex-row justify-between items-center gap-2">
					<Text className="font-bold text-xl">{soil1}%</Text>

					<View>
						<View className="flex flex-row items-center">
							<View
								style={{ width: soil1 * 2.8 }}
								className={`h-6 rounded-sm ${getBarColor(soil1)}`}
							></View>
							<View className="h-8 w-0.5 bg-slate-500 rounded-sm"></View>
						</View>
					</View>
				</View>
			</View>
			<View className="">
				<Text className="font-medium text-base text-slate-500">Soil 2</Text>
				<View className="flex flex-row justify-between items-center gap-2">
					<Text className="font-bold text-xl">{soil2}%</Text>

					<View>
						<View className="flex flex-row items-center">
							<View
								style={{ width: soil2 * 2.8 }}
								className={`h-6 rounded-sm ${getBarColor(soil2)}`}
							></View>
							<View className="h-8 w-0.5 bg-slate-500 rounded-sm"></View>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Monitors;
