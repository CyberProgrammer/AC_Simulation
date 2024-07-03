import {FanSetting,Mode, SystemStatus} from '@customTypes/enums';
import {changeStatus} from "../views/home/utils/handleChangeSystemStatus.ts";
import {setSetTemp} from "../state/slices/generalSlice.ts";
import {Dispatch} from "redux";
import {setCallForCooling} from "../state/slices/condenserSlice.ts";

interface setTempParams{
    dispatch: Dispatch;
    mode: Mode;
    setTemp: number;
    currentTemp: number;
    callForCooling: boolean;
    fanSetting: FanSetting,
}

export const handleSetTempUp = (
    {
        dispatch,
        mode,
        setTemp,
        currentTemp,
        callForCooling,
        fanSetting,
    }: setTempParams) => {
    // Create new temp and send it to dispatch
    const nextTemp = setTemp + 1;
    dispatch(setSetTemp(nextTemp));

    console.log("Set up");
    console.log("Next temp: ", nextTemp)

    // If cool mode
    manageCoolStatus(dispatch, mode, nextTemp, currentTemp, callForCooling, fanSetting);

    // If heat mode
    manageHeatStatus(dispatch, mode, nextTemp, currentTemp, callForCooling, fanSetting);
}

export const handleSetTempDown = (
    {
        dispatch,
        mode,
        setTemp,
        currentTemp,
        callForCooling,
        fanSetting,
    }:setTempParams) => {
    const nextTemp = setTemp - 1;
    dispatch(setSetTemp(nextTemp));

    console.log("Set down");
    console.log("Next temp: ", nextTemp)
    // If cool mode
    manageCoolStatus(dispatch, mode, nextTemp, currentTemp, callForCooling, fanSetting);

    // If heat mode
    manageHeatStatus(dispatch, mode, nextTemp, currentTemp, callForCooling, fanSetting);
}

const manageCoolStatus = (
    dispatch: Dispatch,
    mode: Mode,
    nextTemp: number,
    currentTemp: number,
    callForCooling: boolean,
    fanSetting: FanSetting
) => {

    if(mode === Mode.Cool){
        /*
             If the set temp is greater than or equal to the current temp, turn the condenser off
             Else if set temp is less than current temp, turn/keep condenser on
        */
        if(nextTemp >= currentTemp){
            if(callForCooling){
                dispatch(setCallForCooling(false));
                changeStatus(SystemStatus.AtTemp, fanSetting, dispatch);
            }
        }
        else if(!callForCooling){
            dispatch(setCallForCooling(true));
            changeStatus(SystemStatus.Cool, fanSetting, dispatch);
        }
    }
}
const manageHeatStatus = (
    dispatch: Dispatch,
    mode: Mode,
    nextTemp: number,
    currentTemp: number,
    callForCooling: boolean,
    fanSetting: FanSetting
) => {
    if(mode === Mode.Heat){
        if(nextTemp <= currentTemp){
            if(callForCooling){
                dispatch(setCallForCooling(false));
                changeStatus(SystemStatus.AtTemp, fanSetting, dispatch);
            }
        }
        else if(!callForCooling){
            dispatch(setCallForCooling(true));
            changeStatus(SystemStatus.Heat, fanSetting, dispatch);
        }
    }
}