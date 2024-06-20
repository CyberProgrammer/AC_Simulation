interface setTempParams{
    setTemp: number;
    setSetTemp: (value:number) => void;
    currentTemp: number;
    callForCooling: boolean;
    setCallForCooling: (value: boolean) => void;
    changeStatus: (status: string) => void;
}
export const handleSetTempUp = (
    {setTemp, setSetTemp, currentTemp, callForCooling, setCallForCooling, changeStatus}
        : setTempParams) => {
    const nextTemp = setTemp + 1;
    setSetTemp(nextTemp);
    if(nextTemp >= currentTemp){
        if(callForCooling){
            setCallForCooling(false);
            changeStatus("At Temp");
        }
    }
    else{
        if(!callForCooling) {
            setCallForCooling(true);
            changeStatus("Cool");
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
            changeStatus("Cool");
        }
    }
    else{
        if(callForCooling){
            setCallForCooling(false);
            changeStatus("At Temp");
        }
    }
}