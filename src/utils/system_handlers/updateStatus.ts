
// Update status handles logic to tell the system what to do once a mode has been set
import {FanStatus, SystemStatus} from "../../types/enums.ts";
import React from "react";


interface UpdateStatusParams {
    setStatus: (val: SystemStatus) => void;
    setCallForCooling: React.Dispatch<React.SetStateAction<boolean>>;
    setFanStatus: (status: FanStatus) => void;
    waitTime: number;
    finalStatus: SystemStatus;
    coolingStatus?: boolean;
    fanStatus?: FanStatus | null;
}
export const updateStatus = (
    { setStatus, setCallForCooling, setFanStatus, waitTime, finalStatus, coolingStatus = false, fanStatus = null }: UpdateStatusParams
) => {
    // If coolingStatus then that means a transition in state is happening
    if(coolingStatus) setStatus(SystemStatus.Wait);

    // If fan status then that means a transition in state is happening
    if (fanStatus !== null) setFanStatus(FanStatus.Wait);
    setTimeout(() => {
        setStatus(finalStatus);
        setCallForCooling(coolingStatus);
        if (fanStatus !== null) setFanStatus(fanStatus);
    }, waitTime);
};
