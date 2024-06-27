import React from "react";
import {Mode} from "@customTypes/enums.ts";

interface SetTemp{
    setSetTemp: React.Dispatch<React.SetStateAction<number>>;
}

interface ScheduleStatusParams {
    isFollowingSchedule: boolean;
    setMode: (mode: Mode) => void;
    setSetTemp: React.Dispatch<React.SetStateAction<number>>;
    checkSchedule: ({setSetTemp}:SetTemp) => void;
    setIsFollowingSchedule: React.Dispatch<React.SetStateAction<boolean>>;
}
export const handleScheduleChange = ({isFollowingSchedule, setMode, checkSchedule, setSetTemp, setIsFollowingSchedule}:ScheduleStatusParams) => {
    console.log("Handling status...");
    // Set the is following schedule to the opposite
    !isFollowingSchedule ? setMode(Mode.Auto) : null;
    !isFollowingSchedule ? checkSchedule({setSetTemp}) : null;
    isFollowingSchedule ? setIsFollowingSchedule(false) : setIsFollowingSchedule(true);
}