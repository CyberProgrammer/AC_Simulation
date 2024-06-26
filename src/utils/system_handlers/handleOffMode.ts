import { updateStatus } from './updateStatus';
import { FanSetting, FanStatus, SystemStatus } from "../../types/enums.ts";
import React from "react";

interface HandleOffModeParams {
    callForCooling: boolean;
    fanSetting: FanSetting;
    setStatus: (val: SystemStatus) => void;
    setCallForCooling: React.Dispatch<React.SetStateAction<boolean>>;
    setFanStatus: (status: FanStatus) => void;
}

export const handleOffMode = ({ callForCooling, fanSetting, setStatus, setCallForCooling, setFanStatus }: HandleOffModeParams) => {
    console.log("Setting to off...");
    if (callForCooling) {
        if (fanSetting === FanSetting.Auto) {
            updateStatus({
                setStatus,
                setCallForCooling,
                setFanStatus,
                waitTime: 5000,
                finalStatus: SystemStatus.Off,
                coolingStatus: false,
                fanStatus: FanStatus.Off
            });
        } else {
            updateStatus({
                setStatus,
                setCallForCooling,
                setFanStatus,
                waitTime: 5000,
                finalStatus: SystemStatus.Off,
                coolingStatus: false
            });
        }
    } else {
        updateStatus({
            setStatus,
            setCallForCooling,
            setFanStatus,
            waitTime: 1000,
            finalStatus: SystemStatus.Off
        });
    }
};
