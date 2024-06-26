import React from "react";

interface HandleTimeUpParams{
    isWakeSet: boolean;
    wakeTime: Date;
    setWakeTime: React.Dispatch<React.SetStateAction<Date>>;
    sleepTime: Date;
    setSleepTime: React.Dispatch<React.SetStateAction<Date>>;
}
export const handleTimeUp = ({isWakeSet, wakeTime, setWakeTime, sleepTime, setSleepTime}:HandleTimeUpParams) => {
    if(!isWakeSet)
        setWakeTime(new Date(wakeTime.getTime() + 900000)); // Increment by 15 minutes
    else
        setSleepTime(new Date(sleepTime.getTime() + 900000));
}
