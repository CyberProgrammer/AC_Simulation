import { updateStatus } from './updateStatus';
import { FanSetting, FanStatus, SystemStatus } from "@customTypes/enums";
import {Dispatch} from "redux";

interface HandleCoolModeParams {
    dispatch: Dispatch;
    setTemp: number;
    currentTemp: number;
    fanSetting: FanSetting;
    callForCooling: boolean;
}
export const handleCoolMode = (
    {
        dispatch,
        setTemp,
        currentTemp,
        fanSetting,
        callForCooling,
    }: HandleCoolModeParams) => {

    console.log("Setting to cool...");
    if (setTemp < currentTemp) {
        if (fanSetting === FanSetting.On) {
            console.log("Fan is currently on")
            updateStatus({
                dispatch,
                waitTime: 5000,
                finalStatus: SystemStatus.Cool,
                coolingStatus: true,
            });
        } else if (fanSetting === FanSetting.Auto) {
            console.log("Fan is currently auto")
            updateStatus({
                dispatch,
                waitTime: 5000,
                finalStatus: SystemStatus.Cool,
                coolingStatus: true,
                fanStatus: FanStatus.On,
            });
        }
    } else if (setTemp > currentTemp) {
        if (callForCooling) {
            console.log("Set temp > current temp")
            updateStatus({
                dispatch,
                waitTime: 5000,
                finalStatus: SystemStatus.AtTemp,
                coolingStatus: false,
                fanStatus: FanStatus.Off,
            });
        } else {
            console.log("Set temp < current temp")
            updateStatus({
                dispatch,
                waitTime: 1000,
                finalStatus: SystemStatus.AtTemp,
            });
        }
    }
};
