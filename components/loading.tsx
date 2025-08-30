import { icon } from "@/constant/icon";
import { useAuth } from "@/context/auth-context";
import { Redirect } from "expo-router";
import React from "react";
import { Image, View } from "react-native";

const Loading = () => {
	const { authState } = useAuth();
	const [isAuthenticated, setIsAthenticated] = React.useState(false);

	React.useEffect(() => {
		if (!authState?.authenticated) {
			setIsAthenticated(true);
			return;
		}
		setIsAthenticated(false);
		return;
	}, [authState]);

	if (isAuthenticated) {
		return <Redirect href={"/sign-in"} />;
	}

	return (
		<View className="flex justify-center items-center h-full">
			<Image
				source={icon.logo}
				resizeMode="contain"
				className="w-[180px] h-[100px]"
			/>
		</View>
	);
};

export default Loading;
