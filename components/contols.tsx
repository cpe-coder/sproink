import database from "@/lib/firebase.config";
import { ref, set } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";
import Monitors from "./monitors";

type TimerType = "water" | "pesticides" | "fertilizer";

const Controls = () => {
	const [activeTimer, setActiveTimer] = useState<TimerType | null>(null);

	const [waterSeconds, setWaterSeconds] = useState<number | null>(null);
	const [pesticidesSeconds, setPesticidesSeconds] = useState<number | null>(
		null,
	);
	const [fertilizerSeconds, setFertilizerSeconds] = useState<number | null>(
		null,
	);

	const [waterRunning, setWaterRunning] = useState(false);
	const [pesticidesRunning, setPesticidesRunning] = useState(false);
	const [fertilizerRunning, setFertilizerRunning] = useState(false);
	const [isCanceling, setIsCanceling] = useState(false);

	const waterRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const pesticidesRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const fertilizerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const formatSeconds = (totalSeconds: number) => {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		setPumpRunningValue();

		if (isCanceling) {
			waterRef.current && clearInterval(waterRef.current);
			pesticidesRef.current && clearInterval(pesticidesRef.current);
			fertilizerRef.current && clearInterval(fertilizerRef.current);
			setWaterSeconds(null);
			setPesticidesSeconds(null);
			setFertilizerSeconds(null);
			setWaterRunning(false);
			setPesticidesRunning(false);
			setFertilizerRunning(false);
			setIsCanceling(false);
		}
	});

	useEffect(() => {
		if (waterRunning && waterSeconds !== null && waterSeconds > 0) {
			waterRef.current = setInterval(() => {
				setWaterSeconds((prev) => (prev !== null ? prev - 1 : null));
			}, 1000);
		} else if (waterSeconds === 0) {
			setWaterRunning(false);
			if (waterRef.current) clearInterval(waterRef.current);
		}
		return () => {
			if (waterRef.current) clearInterval(waterRef.current);
		};
	}, [waterRunning, waterSeconds]);

	useEffect(() => {
		if (
			pesticidesRunning &&
			pesticidesSeconds !== null &&
			pesticidesSeconds > 0
		) {
			pesticidesRef.current = setInterval(() => {
				setPesticidesSeconds((prev) => (prev !== null ? prev - 1 : null));
			}, 1000);
		} else if (pesticidesSeconds === 0) {
			setPesticidesRunning(false);
			if (pesticidesRef.current) clearInterval(pesticidesRef.current);
		}
		return () => {
			if (pesticidesRef.current) clearInterval(pesticidesRef.current);
		};
	}, [pesticidesRunning, pesticidesSeconds]);

	useEffect(() => {
		if (
			fertilizerRunning &&
			fertilizerSeconds !== null &&
			fertilizerSeconds > 0
		) {
			fertilizerRef.current = setInterval(() => {
				setFertilizerSeconds((prev) => (prev !== null ? prev - 1 : null));
			}, 1000);
		} else if (fertilizerSeconds === 0) {
			setFertilizerRunning(false);
			if (fertilizerRef.current) clearInterval(fertilizerRef.current);
		}
		return () => {
			if (fertilizerRef.current) clearInterval(fertilizerRef.current);
		};
	}, [fertilizerRunning, fertilizerSeconds]);

	const handleConfirm = (pickedDuration: {
		hours?: number;
		minutes?: number;
		seconds?: number;
	}) => {
		const totalSeconds =
			(pickedDuration.hours || 0) * 3600 +
			(pickedDuration.minutes || 0) * 60 +
			(pickedDuration.seconds || 0);

		if (activeTimer === "water") {
			setWaterSeconds(totalSeconds);
			setWaterRunning(true);
		} else if (activeTimer === "pesticides") {
			setPesticidesSeconds(totalSeconds);
			setPesticidesRunning(true);
		} else if (activeTimer === "fertilizer") {
			setFertilizerSeconds(totalSeconds);
			setFertilizerRunning(true);
		}
		setActiveTimer(null);
	};

	const handleCancel = () => {
		setActiveTimer(null);
	};

	useEffect(() => {
		setWaterRunningValue();
		setPesticidesRunningValue();
		setFertilizerRunningValue();
	});

	const setPumpRunningValue = async () => {
		const setValueRef = ref(database, "controls/pumpRunning");
		if (
			(waterRunning && waterSeconds !== null && waterSeconds > 0) ||
			(pesticidesRunning &&
				pesticidesSeconds !== null &&
				pesticidesSeconds > 0) ||
			(fertilizerRunning &&
				fertilizerSeconds !== null &&
				fertilizerSeconds > 0) ||
			(fertilizerRunning && fertilizerSeconds !== null && fertilizerSeconds > 0)
		) {
			return await set(setValueRef, true);
		}
		return await set(setValueRef, false);
	};

	const setWaterRunningValue = async () => {
		const setValueRef = ref(database, "controls/waterRunning");

		if (waterRunning && waterSeconds !== null && waterSeconds > 0) {
			return await set(setValueRef, true);
		}
		return await set(setValueRef, false);
	};

	const setPesticidesRunningValue = async () => {
		const setValueRef = ref(database, "controls/pesticiedsRunning");
		if (
			pesticidesRunning &&
			pesticidesSeconds !== null &&
			pesticidesSeconds > 0
		) {
			return await set(setValueRef, true);
		}

		return await set(setValueRef, false);
	};

	const setFertilizerRunningValue = async () => {
		const setValueRef = ref(database, "controls/fertilizerRunning");
		if (
			fertilizerRunning &&
			fertilizerSeconds !== null &&
			fertilizerSeconds > 0
		) {
			return await set(setValueRef, true);
		}
		return await set(setValueRef, false);
	};

	const cancelTimer = () => {
		setIsCanceling(true);
	};

	return (
		<View>
			{(waterRunning && waterSeconds !== null && waterSeconds > 0) ||
			(pesticidesRef && pesticidesSeconds !== null && pesticidesSeconds > 0) ||
			(fertilizerRef && fertilizerSeconds !== null && fertilizerSeconds > 0) ? (
				<Text
					className={`text-3xl text-center font-bold  ${
						(waterRunning && waterSeconds !== null && waterSeconds <= 10) ||
						(pesticidesRunning &&
							pesticidesSeconds !== null &&
							pesticidesSeconds <= 10) ||
						(fertilizerRunning &&
							fertilizerSeconds !== null &&
							fertilizerSeconds <= 10)
							? "text-red-700"
							: "text-slate-700"
					}`}
				>
					{formatSeconds(
						waterSeconds || pesticidesSeconds || fertilizerSeconds || 0,
					)}
				</Text>
			) : (
				<Text className="text-3xl text-center font-bold text-slate-500">
					00:00:00
				</Text>
			)}

			<Text className="font-medium text-lg text-slate-500">Controls</Text>
			<View className="w-28 items-center rounded-lg">
				<TimerPickerModal
					visible={activeTimer !== null}
					setIsVisible={(isVisible: boolean) => {
						if (!isVisible) setActiveTimer(null);
					}}
					onConfirm={handleConfirm}
					onCancel={handleCancel}
					closeOnOverlayPress
					modalProps={{
						overlayOpacity: 0.2,
					}}
				/>
			</View>
			<View className="flex flex-row justify-around w-full px-4 bg-slate-300 py-5 rounded-md">
				<TouchableOpacity
					disabled={waterRunning || pesticidesRunning || fertilizerRunning}
					onPress={() => setActiveTimer("water")}
					className={`bg-slate-700 py-2 w-28 items-center rounded-lg ${
						waterRunning || pesticidesRunning || fertilizerRunning
							? "opacity-50"
							: ""
					}`}
				>
					<Text className="text-slate-50 font-medium">Water</Text>
				</TouchableOpacity>
				<TouchableOpacity
					disabled={waterRunning || pesticidesRunning || fertilizerRunning}
					onPress={() => setActiveTimer("pesticides")}
					className={`bg-slate-700 py-2 w-28 items-center rounded-lg ${
						waterRunning || pesticidesRunning || fertilizerRunning
							? "opacity-50"
							: ""
					}`}
				>
					<Text className="text-slate-50 font-medium">Pesticides</Text>
				</TouchableOpacity>
				<TouchableOpacity
					disabled={waterRunning || pesticidesRunning || fertilizerRunning}
					onPress={() => setActiveTimer("fertilizer")}
					className={`bg-slate-700 py-2 w-28 items-center rounded-lg ${
						waterRunning || pesticidesRunning || fertilizerRunning
							? "opacity-50"
							: ""
					}`}
				>
					<Text className="text-slate-50 font-medium">Fertilizer</Text>
				</TouchableOpacity>
			</View>
			<View>
				{(waterRunning && waterSeconds !== null && waterSeconds > 0) ||
				(pesticidesRef &&
					pesticidesSeconds !== null &&
					pesticidesSeconds > 0) ||
				(fertilizerRef &&
					fertilizerSeconds !== null &&
					fertilizerSeconds > 0) ? (
					<TouchableOpacity
						onPress={cancelTimer}
						className="bg-red-500 p-2 mt-2 rounded-md"
					>
						<Text className="text-white font-medium text-sm text-center">
							Cancel
						</Text>
					</TouchableOpacity>
				) : (
					""
				)}
			</View>
			<View className="flex items-center mb-6">
				<Text className="text-lg text-red-400 italic">
					* Only one timer can run at a time.
				</Text>
				<Text className="text-md text-slate-400 italic">
					{waterRunning &&
						waterSeconds !== null &&
						waterSeconds > 0 &&
						"Spraying water..."}
					{pesticidesRef &&
						pesticidesSeconds !== null &&
						pesticidesSeconds > 0 &&
						"Spraying pesticides..."}
					{fertilizerRef &&
						fertilizerSeconds !== null &&
						fertilizerSeconds > 0 &&
						"Spraying fertilizer..."}
				</Text>
			</View>
			<Text className="font-medium text-slate-500 text-lg">Monitor</Text>
			<Monitors />
			<View className="flex py-10 items-center">
				<Text className="text-sm text-slate-400 italic mt-2">
					Reminder: Don&apos;t close the app while a timer is running.
				</Text>
			</View>
		</View>
	);
};

export default Controls;
