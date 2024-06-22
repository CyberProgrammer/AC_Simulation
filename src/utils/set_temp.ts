import {Mode,SystemStatus} from '../types/enums';

interface setTempParams{
    mode: Mode;
    setTemp: number;
    setSetTemp: (value:number) => void;
    currentTemp: number;
    callForCooling: boolean;
    setCallForCooling: (value: boolean) => void;
    changeStatus: (status: SystemStatus) => void;
}
export const handleSetTempUp = (
    {mode, setTemp, setSetTemp, currentTemp, callForCooling, setCallForCooling, changeStatus}: setTempParams) => {
    const nextTemp = setTemp + 1;
    setSetTemp(nextTemp);

    console.log("Set up");
    // If cool mode
    if(mode === Mode.Cool){
        if(nextTemp >= currentTemp){
            if(callForCooling){
                setCallForCooling(false);
                changeStatus(SystemStatus.AtTemp);
            }
        }
        else{
            if(!callForCooling) {
                setCallForCooling(true);
                changeStatus(SystemStatus.Cool);
            }
        }
    }

    // If heat mode
    if(mode === Mode.Heat){
        if(nextTemp <= currentTemp){
            if(callForCooling){
                setCallForCooling(false);
                changeStatus(SystemStatus.AtTemp);
            }
        }
        else{
            if(!callForCooling){
                setCallForCooling(true);
                changeStatus(SystemStatus.Heat);
            }
        }
    }
}
export const handleSetTempDown = (
    {mode, setTemp, setSetTemp, currentTemp, callForCooling, setCallForCooling, changeStatus}:setTempParams) => {
    const nextTemp = setTemp - 1;
    setSetTemp(nextTemp);

    console.log("Set down");
    // If cool mode
    if(mode === Mode.Cool){
        if(nextTemp < currentTemp) {
            if (!callForCooling) {
                setCallForCooling(true);
                changeStatus(SystemStatus.Cool);
            }
        }
        else{
            if(callForCooling){
                setCallForCooling(false);
                changeStatus(SystemStatus.AtTemp);
            }
        }
    }

    // If heat mode
    if(mode === Mode.Heat){
        if(nextTemp <= currentTemp){
            if(callForCooling){
                setCallForCooling(false);
                changeStatus(SystemStatus.AtTemp);
            }
        }
        else{
            if(!callForCooling){
                setCallForCooling(true);
                changeStatus(SystemStatus.Heat);
            }
        }
    }
}