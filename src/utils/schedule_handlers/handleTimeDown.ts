import React from "react";

interface HandleTimeDownParams{
    isWakeSet: boolean;
    wakeTime: Date;
    setWakeTime: React.Dispatch<React.SetStateAction<Date>>;
    sleepTime: Date;
    setSleepTime: React.Dispatch<React.SetStateAction<Date>>;
}
export const handleTimeDown = ({isWakeSet, wakeTime, setWakeTime, sleepTime, setSleepTime}:HandleTimeDownParams) => {
    if(!isWakeSet)
        setWakeTime(new Date(wakeTime.getTime() - 900000)); // Decrement by 15 minutes
    else
        setSleepTime(new Date(sleepTime.getTime() - 900000)); // Decrement by 15 minutes
}