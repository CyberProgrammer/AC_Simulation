import {Dispatch} from "redux";
import {setSetTemp} from "../../../state/slices/generalSlice.ts";

export const handleAutomaticTime = (dispatch: Dispatch, wakeTime:Date, sleepTime:Date, wakeTemp:number, sleepTemp:number, currentTime: Date) => {
    if (currentTime >= wakeTime && currentTime < sleepTime) {
        console.log("Wake schedule...");
        dispatch(setSetTemp(wakeTemp));
    } else if (currentTime >= sleepTime) {
        console.log("Sleep schedule...");
        dispatch(setSetTemp(sleepTemp));
    }
};