import React from "react";
import { Text, View } from "react-native";

const Monitors = () => {
	return (
		<View className=" flex flex-row justify-around items-center rounded-md w-full px-4 bg-slate-300 py-4">
			<View className="items-center">
				<Text className="font-medium text-base">Temperature</Text>
				<Text className="font-bold text-2xl">20%</Text>
			</View>
			<View className="items-center">
				<Text className="font-medium text-base">Humidity</Text>
				<Text className="font-bold text-2xl">30%</Text>
			</View>
			<View className="items-center">
				<Text className="font-medium text-base">Soil</Text>
				<Text className="font-bold text-2xl">30%</Text>
			</View>
		</View>
	);
};

export default Monitors;
