import { updateStatus } from './updateStatus';
import { FanSetting, FanStatus, SystemStatus } from "@customTypes/enums";
import React from "react";

interface HandleCoolModeParams {
    setTemp: number;
    currentTemp: number;
    fanSetting: FanSetting;
    callForCooling: boolean;
    setStatus: (val: SystemStatus) => void;
    setCallForCooling: React.Dispatch<React.SetStateAction<boolean>>;
    setFanStatus: (status: FanStatus) => void;
}
export const handleCoolMode = (
    {
        setTemp,
        currentTemp,
        fanSetting,
        callForCooling,
        setStatus,
        setCallForCooling,
        setFanStatus,
    }: HandleCoolModeParams) => {

    console.log("Setting to cool...");
    if (setTemp < currentTemp) {
        if (fanSetting === FanSetting.On) {
            updateStatus({
                setStatus,
                setCallForCooling,
                setFanStatus,
                waitTime: 5000,
                finalStatus: SystemStatus.Cool,
                coolingStatus: true,
            });
        } else if (fanSetting === FanSetting.Auto) {
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
    } else if (setTemp > currentTemp) {
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
            console.log("Here")
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
