import {incrementManualTime} from "./incrementManualTime.ts";

export const checkManualTime = (
        manualMinute: number,
        manualHour: number,
        setManualHour: (hour: number) => void,
        setManualMinute: (minute: number) => void,
        manuallySetTime: (hourInput: number, minuteInput: number) => void,
        manualPeriod: string,
        setIsAM: (isAM: boolean) => void,
    ) => {

    console.log("Checking manual time...");
    incrementManualTime({
        manualMinute,
        manualHour,
        setManualHour,
        setManualMinute,
        manuallySetTime: (hourInput, minuteInput) => manuallySetTime(hourInput, minuteInput)
    });
    setIsAM(manualPeriod === "am");
};