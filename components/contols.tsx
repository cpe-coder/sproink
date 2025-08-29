import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";

type TimerType = "water" | "pesticides" | "fertilizer";

const Controls = () => {
	const [activeTimer, setActiveTimer] = useState<TimerType | null>(null);

	const [waterTimer, setWaterTimer] = useState(false);
	const [pesticidesTimer, setPesticidesTimer] = useState(false);
	const [fertilizerTimer, setFertilizerTimer] = useState(false);
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
		}
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [isRunning, timerSeconds]);

	return (
		<View>
			{isRunning && timerSeconds !== null && timerSeconds > 0 ? (
				<Text
					className={`text-3xl text-center font-bold  ${timerSeconds <= 10 ? "text-red-700" : "text-slate-700"}`}
				>
					{formatSeconds(timerSeconds)}
				</Text>
			) : (
				<Text className="text-3xl text-center font-bold text-slate-500">
					00:00:00
				</Text>
			)}
			<Text className="font-medium text-lg text-slate-500">Controls</Text>
			<View className="w-28 items-center rounded-lg">
				<TimerPickerModal
					visible={waterTimer || pesticidesTimer || fertilizerTimer}
					setIsVisible={
						setWaterTimer || setPesticidesTimer || setFertilizerTimer
					}
					onConfirm={(pickedDuration) => {
						setAlarmString(formatTime(pickedDuration));
						setWaterTimer(false);
						setPesticidesTimer(false);
						setFertilizerTimer(false);
					}}
					onCancel={() => {
						setWaterTimer(false);
						setPesticidesTimer(false);
						setFertilizerTimer(false);
					}}
					closeOnOverlayPress
					modalProps={{
						overlayOpacity: 0.2,
					}}
				/>
			</View>
			<View className="flex flex-row justify-around w-full px-4 bg-slate-300 py-5 rounded-md mb-6">
				<TouchableOpacity
					onPress={() => setWaterTimer(true)}
					className="bg-slate-700 py-2 w-28 items-center rounded-lg"
				>
					<Text className="text-slate-50 font-medium">Water</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setPesticidesTimer(true)}
					className="bg-slate-700 py-2 w-28 items-center rounded-lg"
				>
					<Text className="text-slate-50 font-medium">Pesticides</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setFertilizerTimer(true)}
					className="bg-slate-700 py-2 w-28 items-center rounded-lg"
				>
					<Text className="text-slate-50 font-medium">Fertilizer</Text>
				</TouchableOpacity>
			</View>
			<Text className="font-medium text-slate-500 text-lg rounded-md">
				Monitor
			</Text>
			<View className="items-center w-full px-4 bg-slate-300 py-4">
				<Text className="font-medium text-base">Temperature</Text>
				<Text className="font-bold text-4xl">20%</Text>
			</View>
		</View>
	);
};

export default Controls;
