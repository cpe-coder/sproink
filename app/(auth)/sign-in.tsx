import { CustomButton, InputField, Loading } from "@/components";
import { useRouter } from "expo-router";
import {
	Dimensions,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icon } from "@/constant/icon";
import { useAuth } from "@/context/auth-context";
import React from "react";

const SignIn = () => {
	const [disable, setDisable] = React.useState(true);
	const [isSubmit, setIsSubmit] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");
	const [successMessage, setSuccessMessage] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const { onLogin } = useAuth();
	const router = useRouter();
	const [form, setForm] = React.useState({
		email: "",
		password: "",
	});

	React.useEffect(() => {
		checkingForm();
	});

	const checkingForm = async () => {
		if (form.email === "" || form.password === "") {
			setDisable(true);
		} else {
			setDisable(false);
		}
	};

	const handleLogin = async () => {
		setIsSubmit(true);
		setErrorMessage("");
		if (onLogin) {
			try {
				const res = await onLogin!(form.email, form.password);
				if (res.status === 200) {
					setErrorMessage("");
					setSuccessMessage(res.data.message);
					setIsSubmit(false);
					setIsLoading(true);
					setTimeout(() => {
						router.push("/Home");
					}, 1500);
				}
			} catch (error: any) {
				setErrorMessage(error.response.data.message);
				setIsSubmit(false);
			}
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	const handleRoute = () => {
		router.push("/(auth)/sign-up");
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View
					className="w-full flex justify-center h-full px-4 my-6"
					style={{
						minHeight: Dimensions.get("window").height - 100,
					}}
				>
					<View className="items-center -mt-20 justify-center">
						<Image
							source={icon.logo}
							resizeMode="contain"
							className="w-[180px] h-[100px]"
						/>

						<Text className="text-2xl text-center text-white mt-10 font-bold">
							adsfadfs
						</Text>
					</View>

					<InputField
						title="Email"
						placeholder=""
						value={form.email}
						handleChangeText={(e: any) => setForm({ ...form, email: e })}
						otherStyles="mt-7"
					/>

					<InputField
						placeholder=""
						title="Password"
						value={form.password}
						handleChangeText={(e: any) => setForm({ ...form, password: e })}
						otherStyles="mt-7"
					/>
					<Text
						className={`text-lg text-secondary font-semibold text-center py-1 px-4 ${
							errorMessage ? "block" : "hidden"
						}`}
					>
						{errorMessage}
					</Text>

					<Text
						className={`text-lg text-green-500 font-semibold text-center py-1 ${
							successMessage ? "block" : "hidden"
						}`}
					>
						{successMessage}
					</Text>

					<CustomButton
						title="Sign In"
						textStyles=""
						handlePress={handleLogin}
						submitting={isSubmit || isSubmit}
						containerStyles="mt-7"
						disable={disable || isSubmit}
					/>

					<View className="flex justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							don&apos;t have an account?
						</Text>
						<TouchableOpacity onPress={handleRoute}>
							<Text className="text-lg font-psemibold text-secondary">
								Sign Up
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
