import React, {createContext, ReactNode, useContext, useState} from "react";
import {SystemStatus, Mode, Months} from "../types/enums"
import {b} from "vite/dist/node/types.d-aGj9QkWt";

interface GeneralContextProps{
    currentTemp: number;
    setCurrentTemp: React.Dispatch<React.SetStateAction<number>>;
    setTemp: number;
    setSetTemp: React.Dispatch<React.SetStateAction<number>>;
    mode: Mode;
    setMode: (mode:Mode) => void;
    status: SystemStatus;
    setStatus: (val: SystemStatus) => void;
    month: Months;
    setMonth: (month:Months) => void;
    day: number;
    setDay: (day:number) => void;
    hour: number;
    setHour: (hour:number) => void;
    minute: number;
    setMinute: (minute:number) => void;
    manualTime: boolean;
    setManualTime: (manualTime:boolean) => void;
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

    // Manual Time / Date state
    const [month, setMonth] = useState(Months.Jan);
    const [day, setDay] = useState(1);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [manualTime, setManualTime] = useState<boolean>(false);

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
            month,
            setMonth,
            day,
            setDay,
            hour,
            setHour,
            minute,
            setMinute,
            manualTime,
            setManualTime
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