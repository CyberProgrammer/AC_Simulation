import {isValidScheduleDay} from "@contexts/utils/schedule/checkValidScheduleDay.ts";
import {handleManualTime} from "@contexts/utils/schedule/handleManualTime.ts";
import {handleAutomaticTime} from "@contexts/utils/schedule/handleAutomaticTime.ts";
import {setIsFollowingSchedule} from "../../state/slices/scheduleSlice.ts";
import {Dispatch} from "redux";
import {DayOfWeek} from "@customTypes/enums.ts";

interface CheckScheduleParams{
    dispatch: Dispatch;
    scheduleDays: number[];
    isFollowingSchedule: boolean;
    isManualTime: boolean;
    isManualDate: boolean;
    manualMonth: number;
    manualDay: number;
    manualCalendarDay?: DayOfWeek;
    fullDateTime?: number;
    wakeTime: number;
    sleepTime: number;
    wakeTemp: number;
    sleepTemp: number;
}
export const checkSchedule = (
    {
        dispatch ,
        scheduleDays,
        isFollowingSchedule,
        isManualTime,
        isManualDate,
        manualMonth,
        manualDay,
        manualCalendarDay,
        fullDateTime,
        wakeTime,
        sleepTime,
        wakeTemp,
        sleepTemp
    }: CheckScheduleParams) => {
    const currentTime = new Date();

    if (!isValidScheduleDay(scheduleDays, currentTime.getDay(), manualCalendarDay, isManualDate)) {
        dispatch(setIsFollowingSchedule(false));
        return;
    }

    if (!isFollowingSchedule) {
        return;
    }

    if (isManualTime && fullDateTime) {
        console.log("Manual time...");
        handleManualTime(dispatch, wakeTime, sleepTime, wakeTemp, sleepTemp, fullDateTime, isManualDate, manualMonth, manualDay);
    } else {
        console.log("Not manual time...");
        handleAutomaticTime(dispatch, new Date(wakeTime), new Date(sleepTime), wakeTemp, sleepTemp, currentTime);
    }
};