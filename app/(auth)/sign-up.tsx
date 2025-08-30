import { CustomButton, InputField, Loading } from "@/components";
import { icon } from "@/constant/icon";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "expo-router";
import React from "react";
import {
	Dimensions,
	Image,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
	const [disable, setDisable] = React.useState(false);
	const [isSubmit, setIsSubmit] = React.useState(false);
	const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");
	const [successMessage, setSuccessMessage] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const [form, setForm] = React.useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const { onRegister } = useAuth();
	const router = useRouter();

	React.useEffect(() => {
		checkingForm();
	});

	const checkingForm = async () => {
		if (
			form.name === "" ||
			form.email === "" ||
			form.password === "" ||
			form.confirmPassword === ""
		) {
			setDisable(true);
		} else {
			setDisable(false);
			setConfirmPasswordError(false);
		}
	};

	const handleSubmit = async () => {
		setIsSubmit(true);
		setErrorMessage("");
		setConfirmPasswordError(false);
		if (form.password !== form.confirmPassword) {
			setConfirmPasswordError(true);
			setIsSubmit(false);
			setForm({ ...form, confirmPassword: "" });
			return;
		}

		if (onRegister) {
			await onRegister!(
				form.name,
				form.email,
				form.password,
				form.confirmPassword
			)
				.then((res) => {
					if (res.status === 201) {
						setErrorMessage("");
						setForm({
							name: "",
							email: "",
							password: "",
							confirmPassword: "",
						});
						setSuccessMessage(res.data.message);
						setIsSubmit(false);
						setIsLoading(true);
						setTimeout(() => {
							router.push("/sign-in");
						}, 1500);
					}
				})
				.catch((error) => {
					setErrorMessage(error.response.data.message);
					setIsSubmit(false);
				});
		} else {
			setErrorMessage("Registration function is not available.");
			setIsSubmit(false);
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	const handleRoute = () => {
		router.push("/(auth)/sign-in");
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
							Create an account
						</Text>
					</View>
					<InputField
						placeholder=""
						title="Name"
						value={form.name}
						handleChangeText={(e) => setForm({ ...form, name: e })}
						otherStyles="mt-10"
					/>

					<InputField
						placeholder=""
						title="Email"
						value={form.email}
						handleChangeText={(e: any) => setForm({ ...form, email: e })}
						otherStyles="mt-7"
					/>
					<InputField
						placeholder=""
						title="Password"
						value={form.password}
						handleChangeText={(e) => setForm({ ...form, password: e })}
						otherStyles="mt-7"
					/>
					<InputField
						placeholder=""
						title="Confirm Password"
						value={form.confirmPassword}
						handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
						otherStyles="mt-7 "
						borderStyle={confirmPasswordError ? "border-red-500" : ""}
					/>
					<Text
						className={`text-lg text-secondary font-semibold text-center py-1 px-4 ${
							errorMessage ? "block" : "hidden"
						}`}
					>
						{errorMessage}
					</Text>
					<Text
						className={`text-lg text-secondary font-semibold text-center py-1 ${
							confirmPasswordError ? "block" : "hidden"
						}`}
					>
						{confirmPasswordError && "Password does not match"}
					</Text>
					<Text
						className={`text-lg text-green-500 font-semibold text-center py-1 ${
							successMessage ? "block" : "hidden"
						}`}
					>
						{successMessage}
					</Text>
					<CustomButton
						handlePress={handleSubmit}
						textStyles=""
						title="Sign Up"
						disable={disable || isSubmit}
						containerStyles="mt-7 "
						submitting={isSubmit || isSubmit}
					/>

					<View className="flex justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Don&apos;t have an account?
						</Text>
						<Pressable onPress={handleRoute}>
							<Text className="text-lg font-psemibold text-secondary">
								Sign In
							</Text>
						</Pressable>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;
