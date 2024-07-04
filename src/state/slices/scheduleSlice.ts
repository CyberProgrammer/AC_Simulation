import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ScheduleState{
    scheduleDays: number[],
    wakeTime: number,
    wakeTemp: number,
    sleepTime: number,
    sleepTemp: number,
    isScheduleSet: boolean,
    isFollowingSchedule: boolean,
}

const initialState : ScheduleState = {
    scheduleDays: [],
    wakeTime: new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDay(), 6, 0).getTime(),
    wakeTemp: 70,
    sleepTime: new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDay(), 18, 0).getTime(),
    sleepTemp: 80,
    isScheduleSet: false,
    isFollowingSchedule: false,
}

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers:{
        setScheduleDays: ((state, action: PayloadAction<number[]>) => {
            state.scheduleDays = action.payload;
        }),
        setWakeTime: ((state, action: PayloadAction<number>) => {
            state.wakeTime = action.payload;
        }),
        setWakeTemp: ((state, action: PayloadAction<number>) => {
            state.wakeTemp = action.payload;
        }),
        setSleepTime: ((state, action: PayloadAction<number>)=> {
            state.sleepTime = action.payload;
        }),
        setSleepTemp: ((state, action: PayloadAction<number>) => {
            state.sleepTemp = action.payload;
        }),
        setIsScheduleSet: ((state, action: PayloadAction<boolean>) => {
            state.isScheduleSet = action.payload;
        }),
        setIsFollowingSchedule: ((state, action: PayloadAction<boolean>) => {
            state.isFollowingSchedule = action.payload;
        })
    }
})

export const {
    setScheduleDays,
    setWakeTime,
    setWakeTemp,
    setSleepTime,
    setSleepTemp,
    setIsScheduleSet,
    setIsFollowingSchedule,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;