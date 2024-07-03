import React from "react";
import {Mode} from "@customTypes/enums.ts";
import {Dispatch} from "redux";
import {setMode} from "../../../state/slices/generalSlice.ts";

interface SetTemp{
    dispatch: Dispatch;
}

interface ScheduleStatusParams {
    isFollowingSchedule: boolean;
    checkSchedule: ({dispatch}:SetTemp) => void;
    setIsFollowingSchedule: React.Dispatch<React.SetStateAction<boolean>>;
    dispatch: Dispatch;
}
export const handleScheduleChange = ({isFollowingSchedule, checkSchedule, setIsFollowingSchedule, dispatch}:ScheduleStatusParams) => {
    console.log("Handling status...");
    // Set the is following schedule to the opposite
    !isFollowingSchedule ? dispatch(setMode(Mode.Auto)) : null;
    !isFollowingSchedule ? checkSchedule({dispatch}) : null;
    isFollowingSchedule ? setIsFollowingSchedule(false) : setIsFollowingSchedule(true);
}