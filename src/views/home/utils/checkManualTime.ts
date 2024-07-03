import {incrementManualTime} from "./incrementManualTime.ts";
import {Dispatch} from "redux";
import {Months} from "@customTypes/enums.ts";

export const checkManualTime = (
        dispatch: Dispatch,
        isManualDate: boolean,
        manualMonth: Months,
        manualDay: number,
        manualMinute: number,
        manualHour: number,
        manualPeriod: string,
        setIsAM: (isAM: boolean) => void,
    ) => {

    console.log("Checking manual time...");
    incrementManualTime({
        dispatch,
        isManualDate,
        manualMonth,
        manualDay,
        manualMinute,
        manualHour,
    });
    setIsAM(manualPeriod === "am");
};