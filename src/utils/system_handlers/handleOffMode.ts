import { updateStatus } from './updateStatus';
import { FanSetting, FanStatus, SystemStatus } from "@customTypes/enums";
import {Dispatch} from "redux";

interface HandleOffModeParams {
    dispatch: Dispatch;
    callForCooling: boolean;
    fanSetting: FanSetting;
}

export const handleOffMode = ({ dispatch, callForCooling, fanSetting}: HandleOffModeParams) => {
    console.log("Setting to off...");
    if (callForCooling) {
        if (fanSetting === FanSetting.Auto) {
            updateStatus({
                dispatch,
                waitTime: 5000,
                finalStatus: SystemStatus.Off,
                coolingStatus: false,
                fanStatus: FanStatus.Off
            });
        } else {
            updateStatus({
                dispatch,
                waitTime: 5000,
                finalStatus: SystemStatus.Off,
                coolingStatus: false
            });
        }
    } else {
        updateStatus({
            dispatch,
            waitTime: 1000,
            finalStatus: SystemStatus.Off
        });
    }
};
