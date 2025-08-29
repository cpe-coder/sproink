import { Controls } from "@/components";
import React from "react";
import { Text, View } from "react-native";

const Home = () => {
	return (
		<View className="flex-1 p-4">
			<Text className="text-2xl text-left font-bold text-slate-500">
				Welcome Back!
			</Text>
			<Text className="text-base font-medium text-slate-400 mb-6">
				The sproink makes your job easier.
			</Text>
			<View className="flex-1">
				<Controls />
			</View>
		</View>
	);
};

export default Home;
