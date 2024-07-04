import {Dispatch} from "redux";
import {setSleepTemp, setWakeTemp} from "../../state/slices/scheduleSlice.ts";

interface HandleTempDownParams{
    dispatch: Dispatch;
    isWakeSet: boolean;
    wakeTemp: number;
    sleepTemp: number;
}
export const handleTempDown = ({dispatch, isWakeSet, wakeTemp, sleepTemp}: HandleTempDownParams) => {
    if(!isWakeSet)
        dispatch(setWakeTemp(wakeTemp-1));
    else
        dispatch(setSleepTemp(sleepTemp-1));
}