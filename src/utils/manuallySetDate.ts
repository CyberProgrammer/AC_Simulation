import {Months} from "@customTypes/enums.ts";
import {getDayPostfix} from "@contexts/utils/datetime/getDayPostFix.ts";
import {getFullDateTime} from "@contexts/utils/datetime/getFullDateTime.ts";
import {Dispatch} from "redux";
import {
    setFormattedDate, setFullDateTime,
    setIsManualDate,
    setManualCalendarDay,
    setManualDay,
    setManualMonth
} from "../state/slices/datetimeSlice.ts";

export const manuallySetDate = (dispatch:Dispatch, isManualTime:boolean, monthInput:Months, dayInput:number, manualHour?:number, manualMinute?:number) => {
    const currentYear = new Date().getFullYear();
    const setDate = new Date(currentYear, monthInput, dayInput);
    dispatch(setIsManualDate(true));
    dispatch(setManualMonth(monthInput));
    dispatch(setManualDay(dayInput));
    dispatch(setManualCalendarDay(setDate.getDay()));
    dispatch(setFormattedDate(Months[monthInput] + " " + dayInput + getDayPostfix(dayInput)));

    // Use current date to fill in missing date data if manual time is not being used
    const currentDate = new Date();

    // Set the full date time
    if(isManualTime && manualHour && manualMinute){
        dispatch(setFullDateTime(getFullDateTime(currentDate.getFullYear(), monthInput, dayInput, manualHour, manualMinute).getTime()));
    } else{
        dispatch(setFullDateTime(getFullDateTime(currentDate.getFullYear(), monthInput, dayInput, currentDate.getHours(), currentDate.getMinutes()).getTime()));
    }
}