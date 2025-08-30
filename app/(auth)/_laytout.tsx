import { Slot } from "expo-router";
import React from "react";

const AuthLayout = () => {
	return (
		<>
			<Slot screenOptions={{ headerShown: false }} />
		</>
	);
};

export default AuthLayout;
