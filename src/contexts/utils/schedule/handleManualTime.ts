import React from "react";
export const handleManualTime = (wakeTime: Date, sleepTime: Date, wakeTemp: number, sleepTemp: number, fullDateTime: Date, setSetTemp: React.Dispatch<React.SetStateAction<number>>) => {
    if (fullDateTime >= wakeTime && fullDateTime < sleepTime) {
        console.log("Manual time wake...");
        setSetTemp(wakeTemp);
    } else {
        console.log("Manual time sleep...");
        setSetTemp(sleepTemp);
    }
};