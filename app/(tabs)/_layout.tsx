import { Settings } from "@/components";
import { useAuth } from "@/context/auth-context";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
	const { authState } = useAuth();

	const [isAuthenticated, setIsAuthenticated] = React.useState(false);

	React.useEffect(() => {
		if (!authState?.authenticated) {
			setIsAuthenticated(true);
			return;
		}

		setIsAuthenticated(false);
	}, [authState]);

	if (isAuthenticated) {
		return <Redirect href={"/sign-in"} />;
	}

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
