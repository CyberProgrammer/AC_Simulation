import {Mode,SystemStatus} from '@customTypes/enums';

interface setTempParams{
    mode: Mode;
    setTemp: number;
    setSetTemp: (value:number) => void;
    currentTemp: number;
    callForCooling: boolean;
    setCallForCooling: (value: boolean) => void;
    changeStatus: (status: SystemStatus) => void;
}

const manageCoolStatus = (
        mode: Mode,
        nextTemp: number,
        currentTemp: number,
        callForCooling: boolean,
        setCallForCooling: (value: boolean) => void,
        changeStatus: (status: SystemStatus) => void,
    ) => {

    if(mode === Mode.Cool){
        /*
             If the set temp is greater than or equal to the current temp, turn the condenser off
             Else if set temp is less than current temp, turn/keep condenser on
        */
        if(nextTemp >= currentTemp){
            if(callForCooling){
                setCallForCooling(false);
                changeStatus(SystemStatus.AtTemp);
            }
        }
        else if(!callForCooling){
            setCallForCooling(true);
            changeStatus(SystemStatus.Cool);
        }
    }
}
const manageHeatStatus = (
        mode: Mode,
        nextTemp: number,
        currentTemp: number,
        callForCooling: boolean,
        setCallForCooling: (value: boolean) => void,
        changeStatus: (status: SystemStatus) => void,
    ) => {
    if(mode === Mode.Heat){
        if(nextTemp <= currentTemp){
            if(callForCooling){
                setCallForCooling(false);
                changeStatus(SystemStatus.AtTemp);
            }
        }
        else if(!callForCooling){
            setCallForCooling(true);
            changeStatus(SystemStatus.Heat);
        }
    }
}

export const handleSetTempUp = (
    {mode, setTemp, setSetTemp, currentTemp, callForCooling, setCallForCooling, changeStatus}: setTempParams) => {
    const nextTemp = setTemp + 1;
    setSetTemp(nextTemp);

    console.log("Set up");

    // If cool mode
    manageCoolStatus(mode, nextTemp, currentTemp, callForCooling, setCallForCooling, changeStatus);

    // If heat mode
    manageHeatStatus(mode, nextTemp, currentTemp, callForCooling, setCallForCooling, changeStatus);
}

export const handleSetTempDown = (
    {mode, setTemp, setSetTemp, currentTemp, callForCooling, setCallForCooling, changeStatus}:setTempParams) => {
    const nextTemp = setTemp - 1;
    setSetTemp(nextTemp);

    console.log("Set down");
    // If cool mode
    manageCoolStatus(mode, nextTemp, currentTemp, callForCooling, setCallForCooling, changeStatus);

    // If heat mode
    manageHeatStatus(mode, nextTemp, currentTemp, callForCooling, setCallForCooling, changeStatus);
}