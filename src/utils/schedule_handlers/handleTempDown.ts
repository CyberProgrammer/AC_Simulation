import React from "react";

interface HandleTempDownParams{
    isWakeSet: boolean;
    wakeTemp: number;
    setWakeTemp: React.Dispatch<React.SetStateAction<number>>;
    sleepTemp: number;
    setSleepTemp: React.Dispatch<React.SetStateAction<number>>;
}
export const handleTempDown = ({isWakeSet, wakeTemp, setWakeTemp, sleepTemp, setSleepTemp}: HandleTempDownParams) => {
    if(!isWakeSet)
        setWakeTemp(wakeTemp-1);
    else
        setSleepTemp(sleepTemp-1);
}