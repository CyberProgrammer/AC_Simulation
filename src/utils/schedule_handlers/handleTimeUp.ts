import React from "react";
import {returnUpdatedDate} from "@utils/schedule_handlers/returnUpdatedDate.ts";

interface HandleTimeUpParams{
    isWakeSet: boolean;
    wakeTime: Date;
    setWakeTime: React.Dispatch<React.SetStateAction<Date>>;
    sleepTime: Date;
    setSleepTime: React.Dispatch<React.SetStateAction<Date>>;
    isManualDate: boolean;
    manualMonth: number;
    manualDay: number;
}
export const handleTimeUp = ({isWakeSet, wakeTime, setWakeTime, sleepTime, setSleepTime, isManualDate, manualMonth, manualDay}:HandleTimeUpParams) => {
    // Check if manual date is set
    let date;
    if(!isWakeSet){
        date = new Date(wakeTime.getTime() + 900000); // Increment by 15 minutes
        setWakeTime(returnUpdatedDate(date, isManualDate, manualMonth, manualDay));
    }
    else{
        date = new Date(sleepTime.getTime() + 900000); // Decrement by 15 minutes
        setSleepTime(returnUpdatedDate(date, isManualDate, manualMonth, manualDay));
    }

}
