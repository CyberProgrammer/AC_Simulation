import { updateStatus } from './updateStatus';
import { FanSetting, FanStatus, SystemStatus } from "../../types/enums.ts";
import React from "react";

interface HandleAutoModeParams {
    currentTemp: number;
    setTemp: number;
    fanSetting: FanSetting;
    setStatus: (val: SystemStatus) => void;
    setCallForCooling: React.Dispatch<React.SetStateAction<boolean>>;
    setFanStatus: (status: FanStatus) => void;
}

export const handleAutoMode = ({
                                   currentTemp,
                                   setTemp,
                                   fanSetting,
                                   setStatus,
                                   setCallForCooling,
                                   setFanStatus,
                               }: HandleAutoModeParams) => {
    console.log("Setting to auto...");
    if (currentTemp > setTemp) {
        if (fanSetting === FanSetting.On) {
            updateStatus({
                setStatus,
                setCallForCooling,
                setFanStatus,
                waitTime: 5000,
                finalStatus: SystemStatus.Cool,
                coolingStatus: true,
            });
        } else {
            updateStatus({
                setStatus,
                setCallForCooling,
                setFanStatus,
                waitTime: 5000,
                finalStatus: SystemStatus.Cool,
                coolingStatus: true,
                fanStatus: FanStatus.On,
            });
        }
    } else if (currentTemp < setTemp) {
        if (fanSetting === FanSetting.On) {
            updateStatus({
                setStatus,
                setCallForCooling,
                setFanStatus,
                waitTime: 5000,
                finalStatus: SystemStatus.Heat,
                coolingStatus: true,
            });
        } else {
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
    }
};
