import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";

const Controls = () => {
	const [showPicker, setShowPicker] = useState(false);
	const [alarmString, setAlarmString] = useState<string | null>(null);

	const formatTime = ({
		hours,
		minutes,
		seconds,
	}: {
		hours?: number;
		minutes?: number;
		seconds?: number;
	}) => {
		const timeParts = [];

		if (hours !== undefined) {
			timeParts.push(hours.toString().padStart(2, "0"));
		}
		if (minutes !== undefined) {
			timeParts.push(minutes.toString().padStart(2, "0"));
		}
		if (seconds !== undefined) {
			timeParts.push(seconds.toString().padStart(2, "0"));
		}

		return timeParts.join(":");
	};

	return (
		<View className="p-2">
			<Text className="font-medium text-slate-700">Controls</Text>
			<View className=" py-2 w-28 items-center rounded-lg">
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => setShowPicker(true)}
				>
					<View style={{ alignItems: "center" }}>
						{alarmString !== null ? (
							<Text className="text-slate-700 font-medium">{alarmString}</Text>
						) : null}
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => setShowPicker(true)}
						>
							<View className="mt-3">
								<Text className="text-slate-700 font-medium">Set Alarm 🔔</Text>
							</View>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
				<TimerPickerModal
					visible={showPicker}
					setIsVisible={setShowPicker}
					onConfirm={(pickedDuration) => {
						setAlarmString(formatTime(pickedDuration));
						setShowPicker(false);
					}}
					modalTitle="Set Alarm"
					onCancel={() => setShowPicker(false)}
					closeOnOverlayPress
					use12HourPicker
				/>
			</View>
			<View className="flex flex-row justify-around w-full px-4 bg-slate-300 py-5 rounded-md mb-6">
				<TouchableOpacity className="bg-slate-700 py-2 w-28 items-center rounded-lg">
					<Text className="text-slate-50 font-medium">Water</Text>
				</TouchableOpacity>
				<TouchableOpacity className="bg-slate-700 py-2 w-28 items-center rounded-lg">
					<Text className="text-slate-50 font-medium">Pesticides</Text>
				</TouchableOpacity>
				<TouchableOpacity className="bg-slate-700 py-2 w-28 items-center rounded-lg">
					<Text className="text-slate-50 font-medium">Fertilizer</Text>
				</TouchableOpacity>
			</View>
			<Text className="font-medium text-slate-700 rounded-md">Monitor</Text>
			<View className="items-center w-full px-4 bg-slate-300 py-4">
				<Text className="font-medium text-base">Temperature</Text>
				<Text className="font-bold text-4xl">20%</Text>
			</View>
		</View>
	);
};

export default Controls;
