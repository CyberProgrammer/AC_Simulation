
import {returnUpdatedDate} from "@utils/schedule_handlers/returnUpdatedDate.ts";
import {Dispatch} from "redux";
import {setSleepTime, setWakeTime} from "../../state/slices/scheduleSlice.ts";

interface HandleTimeUpParams{
    dispatch: Dispatch;
    isWakeSet: boolean;
    wakeTime: number;
    sleepTime: number;
    isManualDate: boolean;
    manualMonth: number;
    manualDay: number;
}
export const handleTimeUp = ({dispatch, isWakeSet, wakeTime, sleepTime, isManualDate, manualMonth, manualDay}:HandleTimeUpParams) => {
    // Convert the number stamp to date
    const wake = new Date(wakeTime);
    const sleep = new Date(sleepTime);

    // Check if manual date is set
    let date;
    if(!isWakeSet){
        date = new Date(wake.getTime() + 900000); // Increment by 15 minutes
        dispatch(setWakeTime(returnUpdatedDate(date, isManualDate, manualMonth, manualDay)));
    }
    else{
        date = new Date(sleep.getTime() + 900000); // Decrement by 15 minutes
        dispatch(setSleepTime(returnUpdatedDate(date, isManualDate, manualMonth, manualDay)));
    }

}
