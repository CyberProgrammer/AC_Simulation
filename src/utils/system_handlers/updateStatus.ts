
// Update status handles logic to tell the system what to do once a mode has been set
import {FanStatus, SystemStatus} from "@customTypes/enums";
import React from "react";
import {Dispatch} from "redux";
import {setStatus} from "../../state/slices/generalSlice.ts";
import {setFanStatus} from "../../state/slices/fanSlice.ts";

interface UpdateStatusParams {
    dispatch: Dispatch;
    setCallForCooling: React.Dispatch<React.SetStateAction<boolean>>;
    waitTime: number;
    finalStatus: SystemStatus;
    coolingStatus?: boolean;
    fanStatus?: FanStatus | null;
}
export const updateStatus = (
    {dispatch, setCallForCooling, waitTime, finalStatus, coolingStatus = false, fanStatus = null }: UpdateStatusParams
) => {
    // If coolingStatus then that means a transition in state is happening
    if(coolingStatus) dispatch(setStatus(SystemStatus.Wait));

    // If fan status then that means a transition in state is happening
    if (fanStatus !== null) dispatch(setFanStatus(FanStatus.Wait));
    setTimeout(() => {
        dispatch(setStatus(finalStatus));
        setCallForCooling(coolingStatus);
        if (fanStatus !== null) dispatch(setFanStatus(fanStatus));
    }, waitTime);
};
