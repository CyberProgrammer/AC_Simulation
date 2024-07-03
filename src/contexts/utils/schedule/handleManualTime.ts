import {returnUpdatedDate} from "@utils/schedule_handlers/returnUpdatedDate.ts";
import {Dispatch} from "redux";
import {setSetTemp} from "../../../state/slices/generalSlice.ts";
export const handleManualTime = (
    dispatch: Dispatch,
    wakeTime: Date,
    sleepTime: Date,
    wakeTemp: number,
    sleepTemp: number,
    fullDateTime: Date,
    isManualDate: boolean,
    manualMonth: number,
    manualDay:number
    ) => {

    if(isManualDate){
        wakeTime = returnUpdatedDate(wakeTime, isManualDate, manualMonth, manualDay);
        sleepTime = returnUpdatedDate(sleepTime, isManualDate, manualMonth, manualDay);
    }

    console.log("Full date time: ", fullDateTime);
    console.log("Wake time: ", wakeTime);
    console.log("Sleep time: ", sleepTime);

    if (fullDateTime >= wakeTime && fullDateTime < sleepTime) {
        console.log("Manual time wake...");
        dispatch(setSetTemp(wakeTemp));
    } else {
        console.log("Manual time sleep...");
        dispatch(setSetTemp(sleepTemp));
    }
};