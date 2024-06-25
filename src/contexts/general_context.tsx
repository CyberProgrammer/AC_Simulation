import React, {createContext, ReactNode, useContext, useState} from "react";
import {SystemStatus, Mode} from "../types/enums"

interface GeneralContextProps{
    currentTemp: number;
    setCurrentTemp: React.Dispatch<React.SetStateAction<number>>;
    setTemp: number;
    setSetTemp: React.Dispatch<React.SetStateAction<number>>;
    mode: Mode;
    setMode: (mode:Mode) => void;
    status: SystemStatus;
    setStatus: (val: SystemStatus) => void;
}

interface GeneralProviderProps{
    children: ReactNode
}

const GeneralContext = createContext<GeneralContextProps | undefined>(undefined)

export const GeneralProvider: React.FC<GeneralProviderProps> = ({children}) => {
    // Mode state
    const [mode, setMode] = useState<Mode>(Mode.Off);
    const [status, setStatus] = useState<SystemStatus>(SystemStatus.Off);

    // Temp state
    const [currentTemp, setCurrentTemp] = useState<number>(72);
    const [setTemp, setSetTemp] = useState<number>(73);

    return(
        <GeneralContext.Provider value={{
            mode,
            setMode,
            status,
            setStatus,
            currentTemp,
            setCurrentTemp,
            setTemp,
            setSetTemp,
        }}>
            {children}
        </GeneralContext.Provider>
    )
}

export const useGeneralStates = () => {
    const context = useContext(GeneralContext);
    if(context === undefined){
        throw new Error("useFan must be used within a CondenserProvider");
    }
    return context;
}