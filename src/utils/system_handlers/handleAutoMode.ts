import { updateStatus } from './updateStatus';
import { FanSetting, FanStatus, SystemStatus } from "@customTypes/enums";
import React from "react";
import {Dispatch} from "redux";

interface HandleAutoModeParams {
    dispatch: Dispatch;
    currentTemp: number;
    setTemp: number;
    fanSetting: FanSetting;
    setCallForCooling: React.Dispatch<React.SetStateAction<boolean>>;
    setFanStatus: (status: FanStatus) => void;
}

export const handleAutoMode = (
    {
        dispatch,
        currentTemp,
        setTemp,
        fanSetting,
        setCallForCooling,
        setFanStatus,
    }: HandleAutoModeParams) => {

    console.log("Setting to auto...");
    if (currentTemp > setTemp) {
        if (fanSetting === FanSetting.On) {
            updateStatus({
                dispatch,
                setCallForCooling,
                setFanStatus,
                waitTime: 5000,
                finalStatus: SystemStatus.Cool,
                coolingStatus: true,
            });
        } else {
            updateStatus({
                dispatch,
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
                dispatch,
                setCallForCooling,
                setFanStatus,
                waitTime: 5000,
                finalStatus: SystemStatus.Heat,
                coolingStatus: true,
            });
        } else {
            updateStatus({
                dispatch,
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
