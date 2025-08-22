import { icon } from "@/constant/icon";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, View } from "react-native";
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
			<Image className="w-40 h-40" source={icon.logo} />
		</View>
	);
}
