import React from "react";

export const handleAutomaticTime = (wakeTime:Date, sleepTime:Date, wakeTemp:number, sleepTemp:number, currentTime: Date, setSetTemp: React.Dispatch<React.SetStateAction<number>>) => {
    if (currentTime >= wakeTime && currentTime < sleepTime) {
        console.log("Wake schedule...");
        setSetTemp(wakeTemp);
    } else if (currentTime >= sleepTime) {
        console.log("Sleep schedule...");
        setSetTemp(sleepTemp);
    }
};