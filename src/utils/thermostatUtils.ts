import {Mode, SystemStatus, FanStatus, FanSetting} from '@customTypes/enums';
import {Dispatch} from "redux";
import {setStatus} from "../state/slices/generalSlice.ts";

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
    setFanStatus: (status: FanStatus) => void,
    setCallForCooling: (cooling: boolean) => void
) => {
    if (fanSetting === FanSetting.Auto) {
        dispatch(setStatus(SystemStatus.Wait));
        setFanStatus(FanStatus.Wait);
    } else {
        dispatch(setStatus(SystemStatus.Wait));
    }
    setTimeout(() => {
        setCallForCooling(false);
        dispatch(setStatus(SystemStatus.AtTemp));
        if (fanSetting === FanSetting.Auto) {
            setFanStatus(FanStatus.Off);
        }
    }, 5000);
};

const handleHeatingOff = (
    dispatch: Dispatch,
    fanSetting: FanSetting,
    setFanStatus: (status: FanStatus) => void,
    setCallForCooling: (cooling: boolean) => void
) => {
    if (fanSetting === FanSetting.Auto) {
        dispatch(setStatus(SystemStatus.Wait));
        setFanStatus(FanStatus.Wait);
    } else {
        setStatus(SystemStatus.Wait);
    }

    setTimeout(() => {
        setCallForCooling(false);
        dispatch(setStatus(SystemStatus.AtTemp));
        if (fanSetting === FanSetting.Auto) {
            setFanStatus(FanStatus.Off);
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
    setFanStatus: (status: FanStatus) => void,
    setCallForCooling: (cooling: boolean) => void
) => {
    if (mode === Mode.Cool && currentTemp <= setTemp && status === SystemStatus.Cool) {
        handleCoolingOff(dispatch, fanSetting, setFanStatus, setCallForCooling);
    }

    if (mode === Mode.Heat && currentTemp >= setTemp && status === SystemStatus.Heat) {
        handleHeatingOff(dispatch, fanSetting, setFanStatus, setCallForCooling);
    }

    // Auto modes
    if(mode === Mode.Auto && currentTemp >= setTemp && status === SystemStatus.Heat){
        handleHeatingOff(dispatch, fanSetting, setFanStatus, setCallForCooling);
    }

    if(mode === Mode.Auto && currentTemp <= setTemp && status === SystemStatus.Cool){
        handleCoolingOff(dispatch, fanSetting, setFanStatus, setCallForCooling);
    }
};