import React, {createContext, ReactNode, useContext, useState} from "react";
import {FanSetting, FanStatus} from "../types/enums";


interface FanContextProps{
    fanSetting: FanSetting;
    setFanSetting: (setting:FanSetting) => void;
    fanStatus: FanStatus;
    setFanStatus: (status:FanStatus) => void;
}

interface FanProviderProps{
    children: ReactNode
}

const FanContext = createContext<FanContextProps | undefined>(undefined)

export const FanProvider: React.FC<FanProviderProps> = ({children}) => {
    // Fan states
    const [fanSetting, setFanSetting] = useState<FanSetting>(FanSetting.Auto);

    // Fan status
    const [fanStatus, setFanStatus] = useState<FanStatus>(FanStatus.Off);

    return(
        <FanContext.Provider value={{
            fanSetting,
            setFanSetting,
            fanStatus,
            setFanStatus
        }}>
            {children}
        </FanContext.Provider>
    )
}
export const useFan = () => {
    const context = useContext(FanContext);
    if(context === undefined){
        throw new Error("useFan must be used within a FanProvider");
    }
    return context;
}