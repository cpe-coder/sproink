import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import "../global.css";

export default function Index() {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.push("/Home");
		}, 2000);
	});
	return (
		<View className="bg-white flex-1 items-center justify-center">
			<Text className="text-blue-600">
				Edit app/index.tsx to edit this screen.
			</Text>
		</View>
	);
}
