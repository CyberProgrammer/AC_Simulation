import {Dispatch} from "redux";
import {
    setIsFollowingSchedule,
    setIsScheduleSet,
    setScheduleDays,
    setSleepTemp,
    setSleepTime,
    setWakeTemp,
    setWakeTime
} from "../../state/slices/scheduleSlice.ts";

export const initializeSchedule = (dispatch:Dispatch) => {
    const initialWakeTime = new Date();
    initialWakeTime.setHours(6, 0, 0, 0);
    dispatch(setWakeTime(initialWakeTime.getTime()));
    dispatch(setWakeTemp(70));

    const initialSleepTime = new Date();
    initialSleepTime.setHours(18, 0, 0, 0);
    dispatch(setSleepTime(initialSleepTime.getTime()));
    dispatch(setSleepTemp(80));

    dispatch(setScheduleDays([]));
}

export const removeSchedule = (dispatch: Dispatch) => {
    initializeSchedule(dispatch);
    dispatch(setIsScheduleSet(false));
    dispatch(setIsFollowingSchedule(false));
}