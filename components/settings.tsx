import { icon } from "@/constant/icon";
import { useAuth } from "@/context/auth-context";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
	launchImageLibraryAsync,
	useMediaLibraryPermissions,
} from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import React from "react";
import {
	Image,
	Modal,
	Pressable,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const Settings = () => {
	const [visible, setVisible] = React.useState(false);
	const [mediaPermission, requestMediaPermission] =
		useMediaLibraryPermissions();
	const [, setRefreshing] = React.useState(false);
	const { userImage, userData } = useAuth();

	const { onLogout } = useAuth();

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 1000);
	}, []);

	const chooseFromLibrary = async () => {
		if (!mediaPermission?.granted) {
			requestMediaPermission();
		} else {
			let result = await launchImageLibraryAsync({
				mediaTypes: "livePhotos",
				allowsEditing: true,
				aspect: [5, 5],
			});
			await SecureStore.deleteItemAsync("image");
			if (!result.canceled) {
				await SecureStore.setItemAsync("image", result.assets[0].uri);
			}
			onRefresh();
		}
	};

	return (
		<View className="flex">
			<TouchableOpacity
				onPress={() => setVisible((prev) => !prev)}
				className="flex-col items-center justify-center"
			>
				<Image source={icon.settings} tintColor={"white"} className="w-7 h-7" />
			</TouchableOpacity>
			<Modal
				transparent
				visible={visible}
				onRequestClose={() => setVisible(false)}
				animationType="fade"
			>
				<View className=" bg-white w-screen h-screen pt-8">
					<View className="flex p-4 flex-row gap-2 items-center justify-start">
						<Pressable onPress={() => setVisible(false)} className=" mr-5">
							<Ionicons name="arrow-back" size={24} color="#334155" />
						</Pressable>
						<Text className="text-text font-bold text-xl">Settings</Text>
					</View>
					<View className="flex w-full justify-center items-center pt-5">
						<Image
							source={userImage ? { uri: userImage.image } : icon.user}
							className="w-28 h-28 border border-slate-700 rounded-full"
						/>

						<Text className="text-text py-5 font-bold text-2xl">
							{userData ? userData.name : "Sproink User"}
						</Text>
					</View>
					<Pressable className="flex-row px-4 py-2 justify-start items-center gap-5 active:bg-gray-300/20 transition-all duration-300 active:transition-all active:duration-300">
						<View className="bg-red-500 rounded-full p-3">
							<Feather name="at-sign" size={24} color="white" />
						</View>
						<View>
							<Text className=" text-lg text-slate-500">User Email</Text>
							<Text className="text-gray-400 text-xs">
								{userData ? userData.email : "Sproink User"}
							</Text>
						</View>
					</Pressable>

					<View className="py-2">
						<Pressable
							onPress={() => chooseFromLibrary()}
							className="flex-row px-4 py-2 justify-start items-center gap-5 active:bg-gray-300/20 transition-all duration-300 active:transition-all active:duration-300"
						>
							<View className="bg-slate-200 rounded-full p-3">
								<Entypo name="camera" size={24} color="#334155" />
							</View>
							<Text className=" text-lg text-slate-700">
								Change Profile Image
							</Text>
						</Pressable>
					</View>
					<View className="flex-1 justify-end bottom-20 items-center">
						<TouchableOpacity onPress={onLogout} className="">
							<Text className="text-center text-slate-700 font-medium">
								Logout
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default Settings;
