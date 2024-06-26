import { updateStatus } from './updateStatus';
import { FanSetting, FanStatus, SystemStatus } from "../../types/enums.ts";
import React from "react";

interface HandleHeatModeParams {
    setTemp: number;
    currentTemp: number;
    fanSetting: FanSetting;
    callForCooling: boolean;
    setStatus: (val: SystemStatus) => void;
    setCallForCooling: React.Dispatch<React.SetStateAction<boolean>>;
    setFanStatus: (status: FanStatus) => void;
}

export const handleHeatMode = ({
                                   setTemp,
                                   currentTemp,
                                   fanSetting,
                                   callForCooling,
                                   setStatus,
                                   setCallForCooling,
                                   setFanStatus,
                               }: HandleHeatModeParams) => {
    console.log("Setting to heat...");
    if (setTemp > currentTemp) {
        if (fanSetting === FanSetting.On) {
            updateStatus({
                setStatus,
                setCallForCooling,
                setFanStatus,
                waitTime: 5000,
                finalStatus: SystemStatus.Heat,
                coolingStatus: true,
            });
        } else if (fanSetting === FanSetting.Auto) {
            updateStatus({
                setStatus,
                setCallForCooling,
                setFanStatus,
                waitTime: 5000,
                finalStatus: SystemStatus.Heat,
                coolingStatus: true,
                fanStatus: FanStatus.On,
            });
        }
    } else if (setTemp < currentTemp) {
        if (callForCooling) {
            updateStatus({
                setStatus,
                setCallForCooling,
                setFanStatus,
                waitTime: 5000,
                finalStatus: SystemStatus.AtTemp,
                coolingStatus: false,
                fanStatus: FanStatus.Off,
            });
        } else {
            updateStatus({
                setStatus,
                setCallForCooling,
                setFanStatus,
                waitTime: 1000,
                finalStatus: SystemStatus.AtTemp,
            });
        }
    }
};
