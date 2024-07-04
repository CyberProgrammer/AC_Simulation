import {useDispatch, useSelector} from 'react-redux';
import {Mode} from '@customTypes/enums.ts';
import {Dispatch} from 'redux';
import {setMode} from '../../../state/slices/generalSlice.ts';
import {checkSchedule} from '@utils/schedule_handlers/checkSchedule.ts';
import {RootState} from '../../../state/store.ts';
import {setIsFollowingSchedule} from "../../../state/slices/scheduleSlice.ts";

interface ScheduleStatusParams {
    dispatch: Dispatch;
    isFollowingSchedule: boolean;
}

export const useHandleScheduleChange = (): ((params: ScheduleStatusParams) => void) => {
    const dispatch = useDispatch();
    const scheduleDays = useSelector((state: RootState) => state.schedule.scheduleDays);
    const isManualTime = useSelector((state: RootState) => state.datetime.isManualTime);
    const isManualDate = useSelector((state: RootState) => state.datetime.isManualDate);
    const manualMonth = useSelector((state: RootState) => state.datetime.manualMonth);
    const manualDay = useSelector((state: RootState) => state.datetime.manualDay);
    const manualCalendarDay = useSelector((state: RootState) => state.datetime.manualCalendarDay);
    const fullDateTime = useSelector((state: RootState) => state.datetime.fullDateTime);
    const wakeTime = useSelector((state: RootState) => state.schedule.wakeTime);
    const sleepTime = useSelector((state: RootState) => state.schedule.sleepTime);
    const wakeTemp = useSelector((state: RootState) => state.schedule.wakeTemp);
    const sleepTemp = useSelector((state: RootState) => state.schedule.sleepTemp);

    return ({isFollowingSchedule}: ScheduleStatusParams) => {
        console.log("Handling status...");
        // Set the is following schedule to the opposite
        !isFollowingSchedule ? dispatch(setMode(Mode.Auto)) : null;
        !isFollowingSchedule ?
            checkSchedule({
                dispatch,
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
            }) : null;
        isFollowingSchedule ? dispatch(setIsFollowingSchedule(false)) : dispatch(setIsFollowingSchedule(true));
    };
};
