import { Settings } from "@/components";
import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
	return (
		<>
			<Stack>
				<Stack.Screen
					name="Home"
					options={{
						title: "Home",
						headerStyle: {
							backgroundColor: "#64748b",
						},
						headerRight: () => {
							return <Settings />;
						},
						headerTintColor: "white",
					}}
				/>
			</Stack>
		</>
	);
}
