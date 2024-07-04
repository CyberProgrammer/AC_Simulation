import {Dispatch} from "redux";
import {setSleepTemp, setWakeTemp} from "../../state/slices/scheduleSlice.ts";

interface HandleTempUpParams{
    dispatch: Dispatch;
    isWakeSet: boolean;
    wakeTemp: number;
    sleepTemp: number;
}
export const handleTempUp = ({dispatch, isWakeSet, wakeTemp, sleepTemp}: HandleTempUpParams) => {
    if(!isWakeSet)
        dispatch(setWakeTemp(wakeTemp+1));
    else
        dispatch(setSleepTemp(sleepTemp+1));
}