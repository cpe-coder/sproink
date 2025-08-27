import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Controls = () => {
	return (
		<View className="p-2">
			<Text className="font-medium text-slate-700">Controls</Text>
			<View className="flex flex-row justify-around w-full px-4 bg-slate-300 py-5 rounded-md mb-6">
				<TouchableOpacity className="bg-slate-700 py-2 w-28 items-center rounded-lg">
					<Text className="text-slate-50 font-medium">Water</Text>
				</TouchableOpacity>
				<TouchableOpacity className="bg-slate-700 py-2 w-28 items-center rounded-lg">
					<Text className="text-slate-50 font-medium">Pesticides</Text>
				</TouchableOpacity>
				<TouchableOpacity className="bg-slate-700 py-2 w-28 items-center rounded-lg">
					<Text className="text-slate-50 font-medium">Vitamins</Text>
				</TouchableOpacity>
			</View>
			<Text className="font-medium text-slate-700 rounded-md">Monitor</Text>
			<View className="items-center w-full px-4 bg-slate-300 py-4">
				<Text className="font-medium text-base">Temperature</Text>
				<Text className="font-bold text-4xl">20%</Text>
			</View>
		</View>
	);
};

export default Controls;
