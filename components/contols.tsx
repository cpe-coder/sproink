import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";

const Controls = () => {
	const [showPicker, setShowPicker] = useState(false);
	const [alarmString, setAlarmString] = useState<string | null>(null);
	const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
	const [isRunning, setIsRunning] = useState(false);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

	const formatSeconds = (totalSeconds: number) => {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};

	useEffect(() => {
		if (isRunning && timerSeconds !== null && timerSeconds > 0) {
			intervalRef.current = setInterval(() => {
				setTimerSeconds((prev) => (prev !== null ? prev - 1 : null));
			}, 1000);
		} else if (timerSeconds === 0) {
			setIsRunning(false);
			if (intervalRef.current) clearInterval(intervalRef.current);
			// You can trigger an alarm or notification here
			alert("⏰ Timer finished!");
		}
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [isRunning, timerSeconds]);

	return (
		<View className="p-2">
			<Text className="font-medium text-slate-700">Controls</Text>
			<View className=" py-2 w-28 items-center rounded-lg">
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => setShowPicker(true)}
				>
					<View>
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
						const totalSeconds =
							(pickedDuration.hours || 0) * 3600 +
							(pickedDuration.minutes || 0) * 60 +
							(pickedDuration.seconds || 0);
						setAlarmString(formatTime(pickedDuration));
						setTimerSeconds(totalSeconds);
						setIsRunning(true);
						setShowPicker(false);
					}}
					modalTitle="Set Alarm"
					onCancel={() => setShowPicker(false)}
					closeOnOverlayPress
					use12HourPicker
				/>
				{isRunning && timerSeconds !== null && timerSeconds > 0 && (
					<View className="mt-2">
						<Text className="text-lg font-bold text-slate-700">
							{formatSeconds(timerSeconds)}
						</Text>
					</View>
				)}
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
