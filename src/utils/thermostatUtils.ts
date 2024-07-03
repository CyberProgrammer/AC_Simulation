import {Mode, SystemStatus, FanStatus, FanSetting} from '@customTypes/enums';
import {Dispatch} from "redux";
import {setStatus} from "../state/slices/generalSlice.ts";
import {setFanStatus} from "../state/slices/fanSlice.ts";

// Recheck status
/*
    The checkStatus is used to determine when a temperature has been reached for both the cool and heat
    mode.

    If temperature has been reached, the appropriate handle function will execute to then determine
    if the (condenser) or (condenser and fan) need to be turned off.
 */
const handleCoolingOff = (
    dispatch: Dispatch,
    fanSetting: FanSetting,
    setCallForCooling: (cooling: boolean) => void
) => {
    if (fanSetting === FanSetting.Auto) {
        dispatch(setStatus(SystemStatus.Wait));
        dispatch(setFanStatus(FanStatus.Wait));
    } else {
        dispatch(setStatus(SystemStatus.Wait));
    }
    setTimeout(() => {
        setCallForCooling(false);
        dispatch(setStatus(SystemStatus.AtTemp));
        if (fanSetting === FanSetting.Auto) {
            dispatch(setFanStatus(FanStatus.Off));
        }
    }, 5000);
};

const handleHeatingOff = (
    dispatch: Dispatch,
    fanSetting: FanSetting,
    setCallForCooling: (cooling: boolean) => void
) => {
    if (fanSetting === FanSetting.Auto) {
        dispatch(setStatus(SystemStatus.Wait));
        dispatch(setFanStatus(FanStatus.Wait));
    } else {
        dispatch(setStatus(SystemStatus.Wait));
    }

    setTimeout(() => {
        setCallForCooling(false);
        dispatch(setStatus(SystemStatus.AtTemp));
        if (fanSetting === FanSetting.Auto) {
            dispatch(setFanStatus(FanStatus.Off));
        }
    }, 5000);
};

export const checkStatus = (
    dispatch: Dispatch,
    mode: Mode,
    currentTemp: number,
    setTemp: number,
    status: SystemStatus,
    fanSetting: FanSetting,
    setCallForCooling: (cooling: boolean) => void
) => {
    if (mode === Mode.Cool && currentTemp <= setTemp && status === SystemStatus.Cool) {
        handleCoolingOff(dispatch, fanSetting, setCallForCooling);
    }

    if (mode === Mode.Heat && currentTemp >= setTemp && status === SystemStatus.Heat) {
        handleHeatingOff(dispatch, fanSetting, setCallForCooling);
    }

    // Auto modes
    if(mode === Mode.Auto && currentTemp >= setTemp && status === SystemStatus.Heat){
        handleHeatingOff(dispatch, fanSetting, setCallForCooling);
    }

    if(mode === Mode.Auto && currentTemp <= setTemp && status === SystemStatus.Cool){
        handleCoolingOff(dispatch, fanSetting, setCallForCooling);
    }
};