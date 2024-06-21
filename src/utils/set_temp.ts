import {SystemStatus} from '../types/enums';

interface setTempParams{
    setTemp: number;
    setSetTemp: (value:number) => void;
    currentTemp: number;
    callForCooling: boolean;
    setCallForCooling: (value: boolean) => void;
    changeStatus: (status: SystemStatus) => void;
}
export const handleSetTempUp = (
    {setTemp, setSetTemp, currentTemp, callForCooling, setCallForCooling, changeStatus}
        : setTempParams) => {
    const nextTemp = setTemp + 1;
    setSetTemp(nextTemp);
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
export const handleSetTempDown = (
    {setTemp, setSetTemp, currentTemp, callForCooling, setCallForCooling, changeStatus}
        :setTempParams) => {
    const nextTemp = setTemp - 1;
    setSetTemp(nextTemp);
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