import {getCurrentTime} from "@utils/get_current_time.ts";

export const checkAutomaticTime = (setCurrentTime: (time:string)=>void, setIsAM: (isAM:boolean)=>void) => {
    console.log("Checking time...");
    const { time, isAM } = getCurrentTime();
    // Set updated time and period
    setCurrentTime(time);
    setIsAM(isAM);
};