import { updateStatus } from './updateStatus';
import { FanSetting, FanStatus, SystemStatus } from "@customTypes/enums";
import React from "react";
import {Dispatch} from "redux";

interface HandleOffModeParams {
    dispatch: Dispatch;
    callForCooling: boolean;
    fanSetting: FanSetting;
    setCallForCooling: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleOffMode = ({ dispatch, callForCooling, fanSetting, setCallForCooling}: HandleOffModeParams) => {
    console.log("Setting to off...");
    if (callForCooling) {
        if (fanSetting === FanSetting.Auto) {
            updateStatus({
                dispatch,
                setCallForCooling,
                waitTime: 5000,
                finalStatus: SystemStatus.Off,
                coolingStatus: false,
                fanStatus: FanStatus.Off
            });
        } else {
            updateStatus({
                dispatch,
                setCallForCooling,
                waitTime: 5000,
                finalStatus: SystemStatus.Off,
                coolingStatus: false
            });
        }
    } else {
        updateStatus({
            dispatch,
            setCallForCooling,
            waitTime: 1000,
            finalStatus: SystemStatus.Off
        });
    }
};
