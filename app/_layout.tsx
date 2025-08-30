import { AuthProvider } from "@/context/auth-context";
import { Slot } from "expo-router";
import React from "react";
import "../global.css";

export default function RootLayout() {
	return (
		<AuthProvider>
			<Slot />
		</AuthProvider>
	);
}
