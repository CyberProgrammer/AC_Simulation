import React from "react";

interface HandleTempUpParams{
    isWakeSet: boolean;
    wakeTemp: number;
    setWakeTemp: React.Dispatch<React.SetStateAction<number>>;
    sleepTemp: number;
    setSleepTemp: React.Dispatch<React.SetStateAction<number>>;
}
export const handleTempUp = ({isWakeSet, wakeTemp, setWakeTemp, sleepTemp, setSleepTemp}: HandleTempUpParams) => {
    if(!isWakeSet)
        setWakeTemp(wakeTemp+1);
    else
        setSleepTemp(sleepTemp+1);
}