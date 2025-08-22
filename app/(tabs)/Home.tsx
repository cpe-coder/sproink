import { icon } from "@/constant/icon";
import React from "react";
import { Image, Text, View } from "react-native";

const Home = () => {
	return (
		<View className="flex-1 items-center py-8">
			<Text className="text-3xl font-bold text-slate-700">Welcome Back!</Text>
			<Image className="w-40 h-40" source={icon.logo} />
		</View>
	);
};

export default Home;
