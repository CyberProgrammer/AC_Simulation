import {formatTime} from "@utils/set_current_time.ts";
import {getFullDateTime} from "@contexts/utils/datetime/getFullDateTime.ts";
import {Dispatch} from "redux";
import {
    setFormattedManualTime, setFullDateTime,
    setIsManualTime,
    setManualHour,
    setManualMinute, setManualPeriod
} from "../state/slices/datetimeSlice.ts";
import {Months} from "@customTypes/enums.ts";

export const manuallySetTime = (dispatch:Dispatch, isManualDate:boolean, hourInput:number, minuteInput:number, manualMonth:Months, manualDay: number) => {
    const returned = formatTime(hourInput, minuteInput);
    dispatch(setFormattedManualTime(returned.time));
    dispatch(setIsManualTime(true));
    dispatch(setManualHour(hourInput));
    dispatch(setManualMinute(minuteInput));
    dispatch(setManualPeriod(returned.period));

    // Use current date to fill in missing date data if manual date is not being used
    const currentDate = new Date();

    // Set the full date time
    if (isManualDate) {
        console.log("Manual date, setting manual time");
        dispatch(setFullDateTime(getFullDateTime(currentDate.getFullYear(), manualMonth, manualDay, hourInput, minuteInput)));
    } else {
        console.log("No manual date, setting manual time");
        dispatch(setFullDateTime(getFullDateTime(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hourInput, minuteInput)));
    }
}