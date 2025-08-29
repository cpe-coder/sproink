import { Controls } from "@/components";
import React from "react";
import { Text, View } from "react-native";

const Home = () => {
	return (
		<View className="flex-1 p-4">
			<View className=" flex flex-row gap-2 border-b border-slate-500 mb-4">
				<Text className="w-2 h-14 rounded-sm bg-slate-500"></Text>
				<View>
					<Text className="text-2xl text-left font-bold text-slate-500">
						Welcome Back!
					</Text>
					<Text className="text-base font-medium text-slate-400 mb-6">
						The sproink makes your job easier.
					</Text>
				</View>
			</View>
			<View className="flex-1">
				<Controls />
			</View>
		</View>
	);
};

export default Home;
