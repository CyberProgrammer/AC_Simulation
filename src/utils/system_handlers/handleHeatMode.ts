import { updateStatus } from './updateStatus';
import { FanSetting, FanStatus, SystemStatus } from "@customTypes/enums";
import {Dispatch} from "redux";

interface HandleHeatModeParams {
    dispatch: Dispatch;
    setTemp: number;
    currentTemp: number;
    fanSetting: FanSetting;
    callForCooling: boolean;
}

export const handleHeatMode = ({
                                   dispatch,
                                   setTemp,
                                   currentTemp,
                                   fanSetting,
                                   callForCooling,
                               }: HandleHeatModeParams) => {
    console.log("Setting to heat...");
    if (setTemp > currentTemp) {
        if (fanSetting === FanSetting.On) {
            updateStatus({
                dispatch,
                waitTime: 5000,
                finalStatus: SystemStatus.Heat,
                coolingStatus: true,
            });
        } else if (fanSetting === FanSetting.Auto) {
            updateStatus({
                dispatch,
                waitTime: 5000,
                finalStatus: SystemStatus.Heat,
                coolingStatus: true,
                fanStatus: FanStatus.On,
            });
        }
    } else if (setTemp < currentTemp) {
        if (callForCooling) {
            updateStatus({
                dispatch,
                waitTime: 5000,
                finalStatus: SystemStatus.AtTemp,
                coolingStatus: false,
                fanStatus: FanStatus.Off,
            });
        } else {
            updateStatus({
                dispatch,
                waitTime: 1000,
                finalStatus: SystemStatus.AtTemp,
            });
        }
    }
};
