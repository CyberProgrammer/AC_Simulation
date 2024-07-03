import {manuallySetTime} from "@utils/manuallySetTime.ts";
import {Dispatch} from "redux";
import {setManualHour, setManualMinute} from "../../../state/slices/datetimeSlice.ts";
import {Months} from "@customTypes/enums.ts";

interface params{
    dispatch: Dispatch;
    isManualDate: boolean;
    manualMonth: Months;
    manualDay: number;
    manualMinute: number;
    manualHour: number;
}

const handleNextHour = (dispatch: Dispatch, prevHour:number) => {
    const newMinute = 0;
    let newHour = prevHour + 1;
    // If next hour is midnight, advance to 0
    if (newHour === 24) {
        newHour = 0;
    }
    dispatch(setManualHour(newHour));
    dispatch(setManualMinute(newMinute));
}
 export const incrementManualTime = ({dispatch, isManualDate, manualMonth, manualDay, manualMinute, manualHour}:params) => {
    const newMinute = manualMinute + 1;
    if(newMinute === 60) handleNextHour(dispatch, manualHour);
    else{
        dispatch(setManualMinute(newMinute));
        manuallySetTime(dispatch, isManualDate, manualHour, newMinute, manualMonth, manualDay);
    }
};
