import React, {createContext, ReactNode, useContext, useState} from "react";
import {Months} from "@customTypes/enums.ts";
import {formatTime} from "@utils/set_current_time.ts";

interface DatetimeContextProps{
    manualMonth: Months;
    setManualMonth: (month:Months) => void;
    manualDay: number;
    setManualDay: (day:number) => void;
    manualHour: number;
    setManualHour: (hour:number) => void;
    manualMinute: number;
    setManualMinute: (minute:number) => void;
    isManualTime: boolean;
    setIsManualTime: (manualTime:boolean) => void;
    manuallySetTime: (hourInput: number, minuteInput: number) => void;
    manualPeriod: string;
    formattedManualTime: string;
    manuallySetDate: (monthInput: Months, dayInput: number) => void;
    formattedDate: string;
}

interface DatetimeProviderProps{
    children: ReactNode
}

const DatetimeContext = createContext<DatetimeContextProps | undefined>(undefined)

export const DatetimeProvider: React.FC<DatetimeProviderProps> = ({children}) => {
    const [isManualTime, setIsManualTime] = useState<boolean>(false);
    const [manualDate, setManualDate] = useState<boolean>(false)

    // Manual Time / Date state
    const [manualHour, setManualHour] = useState(0);
    const [manualMinute, setManualMinute] = useState(0);
    const [manualPeriod, setManualPeriod ] = useState<string>("");
    const [formattedManualTime, setFormattedManualTime] = useState<string>("");
    const manuallySetTime = (hourInput:number, minuteInput:number) => {
        const returned = formatTime(hourInput, minuteInput);
        setFormattedManualTime(returned.time)
        console.log("Set hour:", hourInput);
        console.log("Set minute:", minuteInput);

        if(!isManualTime) setIsManualTime(true);
        setManualHour(hourInput);
        setManualMinute(minuteInput);
        setManualPeriod(returned.period);
    }

    // Manual Date state
    const [manualMonth, setManualMonth] = useState(Months.Jan);
    const [manualDay, setManualDay] = useState(1);
    const [formattedDate, setFormattedDate] = useState<string>("");
    const manuallySetDate = (monthInput:Months, dayInput:number) => {
        if(!manualDate) setManualDate(true);
        setManualMonth(monthInput);
        setManualDay(dayInput);

        let dayPostfix;
        if(dayInput === 1) dayPostfix = "st";
        else if(dayInput === 2) dayPostfix = "nd";
        else if(dayInput === 3) dayPostfix = "rd";
        else dayPostfix = "th";
        setFormattedDate(Months[monthInput] + " " + dayInput + dayPostfix);
    }

    return(
        <DatetimeContext.Provider value={{
            manualMonth,
            setManualMonth,
            manualDay,
            setManualDay,
            manualHour,
            setManualHour,
            manualMinute,
            setManualMinute,
            isManualTime,
            setIsManualTime,
            manuallySetTime,
            manualPeriod,
            formattedManualTime,
            manuallySetDate,
            formattedDate
        }}>
            {children}
        </DatetimeContext.Provider>
    )
}

export const useDatetimeStates = () => {
    const context = useContext(DatetimeContext);
    if(context === undefined){
        throw new Error("useFan must be used within a CondenserProvider");
    }
    return context;
}