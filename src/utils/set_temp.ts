import {FanSetting, FanStatus, Mode, SystemStatus} from '@customTypes/enums';
import {changeStatus} from "../views/home/utils/handleChangeSystemStatus.ts";

interface setTempParams{
    mode: Mode;
    setTemp: number;
    setSetTemp: (value:number) => void;
    currentTemp: number;
    callForCooling: boolean;
    setCallForCooling: (value: boolean) => void;
    fanSetting: FanSetting,
    setStatus: (status: SystemStatus) => void,
    setFanStatus: (fanStatus: FanStatus) => void,
}

export const handleSetTempUp = (
    {
        mode,
        setTemp,
        setSetTemp,
        currentTemp,
        callForCooling,
        setCallForCooling,
        fanSetting,
        setStatus,
        setFanStatus
    }: setTempParams) => {
    const nextTemp = setTemp + 1;
    setSetTemp(nextTemp);

    console.log("Set up");

    // If cool mode
    manageCoolStatus(mode, nextTemp, currentTemp, callForCooling, setCallForCooling, fanSetting, setStatus, setFanStatus);

    // If heat mode
    manageHeatStatus(mode, nextTemp, currentTemp, callForCooling, setCallForCooling, fanSetting, setStatus, setFanStatus);
}

export const handleSetTempDown = (
    {
        mode,
        setTemp,
        setSetTemp,
        currentTemp,
        callForCooling,
        setCallForCooling,
        fanSetting,
        setStatus,
        setFanStatus
    }:setTempParams) => {
    const nextTemp = setTemp - 1;
    setSetTemp(nextTemp);

    console.log("Set down");
    // If cool mode
    manageCoolStatus(mode, nextTemp, currentTemp, callForCooling, setCallForCooling, fanSetting, setStatus, setFanStatus);

    // If heat mode
    manageHeatStatus(mode, nextTemp, currentTemp, callForCooling, setCallForCooling, fanSetting, setStatus, setFanStatus);
}

const manageCoolStatus = (
    mode: Mode,
    nextTemp: number,
    currentTemp: number,
    callForCooling: boolean,
    setCallForCooling: (value: boolean) => void,
    fanSetting: FanSetting,
    setStatus: (status: SystemStatus) => void,
    setFanStatus: (fanStatus: FanStatus) => void,
) => {

    if(mode === Mode.Cool){
        /*
             If the set temp is greater than or equal to the current temp, turn the condenser off
             Else if set temp is less than current temp, turn/keep condenser on
        */
        if(nextTemp >= currentTemp){
            if(callForCooling){
                setCallForCooling(false);
                changeStatus(SystemStatus.AtTemp, fanSetting, setStatus, setFanStatus);
            }
        }
        else if(!callForCooling){
            setCallForCooling(true);
            changeStatus(SystemStatus.Cool, fanSetting, setStatus, setFanStatus);
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
    setStatus: (status: SystemStatus) => void,
    setFanStatus: (fanStatus: FanStatus) => void,
) => {
    if(mode === Mode.Heat){
        if(nextTemp <= currentTemp){
            if(callForCooling){
                setCallForCooling(false);
                changeStatus(SystemStatus.AtTemp, fanSetting, setStatus, setFanStatus);
            }
        }
        else if(!callForCooling){
            setCallForCooling(true);
            changeStatus(SystemStatus.Heat, fanSetting, setStatus, setFanStatus);
        }
    }
}