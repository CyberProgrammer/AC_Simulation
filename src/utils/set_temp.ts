import {FanSetting, FanStatus, Mode, SystemStatus} from '@customTypes/enums';
import {changeStatus} from "../views/home/utils/handleChangeSystemStatus.ts";
import {setSetTemp} from "../state/slices/generalSlice.ts";
import {Dispatch} from "redux";

interface setTempParams{
    mode: Mode;
    setTemp: number;
    currentTemp: number;
    callForCooling: boolean;
    setCallForCooling: (value: boolean) => void;
    fanSetting: FanSetting,
    setFanStatus: (fanStatus: FanStatus) => void,
    dispatch: Dispatch;
}

export const handleSetTempUp = (
    {
        mode,
        setTemp,
        currentTemp,
        callForCooling,
        setCallForCooling,
        fanSetting,
        setFanStatus,
        dispatch,
    }: setTempParams) => {
    // Create new temp and send it to dispatch
    const nextTemp = setTemp + 1;
    dispatch(setSetTemp(nextTemp));

    console.log("Set up");
    console.log("Next temp: ", nextTemp)

    // If cool mode
    manageCoolStatus(mode, nextTemp, currentTemp, callForCooling, setCallForCooling, fanSetting, setFanStatus, dispatch);

    // If heat mode
    manageHeatStatus(mode, nextTemp, currentTemp, callForCooling, setCallForCooling, fanSetting, setFanStatus, dispatch);
}

export const handleSetTempDown = (
    {
        mode,
        setTemp,
        currentTemp,
        callForCooling,
        setCallForCooling,
        fanSetting,
        setFanStatus,
        dispatch
    }:setTempParams) => {
    const nextTemp = setTemp - 1;
    dispatch(setSetTemp(nextTemp));

    console.log("Set down");
    console.log("Next temp: ", nextTemp)
    // If cool mode
    manageCoolStatus(mode, nextTemp, currentTemp, callForCooling, setCallForCooling, fanSetting, setFanStatus, dispatch);

    // If heat mode
    manageHeatStatus(mode, nextTemp, currentTemp, callForCooling, setCallForCooling, fanSetting, setFanStatus, dispatch);
}

const manageCoolStatus = (
    mode: Mode,
    nextTemp: number,
    currentTemp: number,
    callForCooling: boolean,
    setCallForCooling: (value: boolean) => void,
    fanSetting: FanSetting,
    setFanStatus: (fanStatus: FanStatus) => void,
    dispatch: Dispatch,
) => {

    if(mode === Mode.Cool){
        /*
             If the set temp is greater than or equal to the current temp, turn the condenser off
             Else if set temp is less than current temp, turn/keep condenser on
        */
        if(nextTemp >= currentTemp){
            if(callForCooling){
                setCallForCooling(false);
                changeStatus(SystemStatus.AtTemp, fanSetting, setFanStatus, dispatch);
            }
        }
        else if(!callForCooling){
            setCallForCooling(true);
            changeStatus(SystemStatus.Cool, fanSetting, setFanStatus, dispatch);
        }
    }
}
const manageHeatStatus = (
    mode: Mode,
    nextTemp: number,
    currentTemp: number,
    callForCooling: boolean,
    setCallForCooling: (value: boolean) => void,
    fanSetting: FanSetting,
    setFanStatus: (fanStatus: FanStatus) => void,
    dispatch: Dispatch,
) => {
    if(mode === Mode.Heat){
        if(nextTemp <= currentTemp){
            if(callForCooling){
                setCallForCooling(false);
                changeStatus(SystemStatus.AtTemp, fanSetting, setFanStatus, dispatch);
            }
        }
        else if(!callForCooling){
            setCallForCooling(true);
            changeStatus(SystemStatus.Heat, fanSetting, setFanStatus, dispatch);
        }
    }
}