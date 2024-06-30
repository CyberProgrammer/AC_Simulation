import React, { createContext, ReactNode, useContext, useState } from "react";
import { DayOfWeek, Months } from "@customTypes/enums.ts";
import { formatTime } from "@utils/set_current_time.ts";
import {getDayPostfix} from "@contexts/utils/datetime/getDayPostFix.ts";
import {getFullDateTime} from "@contexts/utils/datetime/getFullDateTime.ts";

interface DatetimeContextProps {
    manualMonth: Months;
    setManualMonth: (month: Months) => void;
    manualDay: number;
    setManualDay: (day: number) => void;
    manualHour: number;
    setManualHour: (hour: number) => void;
    manualMinute: number;
    setManualMinute: (minute: number) => void;
    isManualTime: boolean;
    setIsManualTime: (manualTime: boolean) => void;
    manuallySetTime: (hourInput: number, minuteInput: number) => void;
    manualPeriod: string;
    formattedManualTime: string;
    manuallySetDate: (monthInput: Months, dayInput: number) => void;
    formattedDate: string;
    manualCalendarDay: DayOfWeek;
    setManualCalendarDay: (day: DayOfWeek) => void;
    isManualDate: boolean;
    setIsManualDate: (manualDate: boolean) => void;
    fullDateTime: Date;
}

interface DatetimeProviderProps{
    children: ReactNode
}

const DatetimeContext = createContext<DatetimeContextProps | undefined>(undefined)

export const DatetimeProvider: React.FC<DatetimeProviderProps> = ({children}) => {
    const [isManualTime, setIsManualTime] = useState<boolean>(false);
    const [isManualDate, setIsManualDate] = useState<boolean>(false)
    const [manualCalendarDay, setManualCalendarDay] = useState<DayOfWeek>(DayOfWeek.Sunday);
    const [fullDateTime, setFullDateTime] = useState<Date>(new Date());

    // Manual Time / Date state
    const [manualHour, setManualHour] = useState(0);
    const [manualMinute, setManualMinute] = useState(0);
    const [manualPeriod, setManualPeriod ] = useState<string>("");
    const [formattedManualTime, setFormattedManualTime] = useState<string>("");
    const manuallySetTime = (hourInput:number, minuteInput:number) => {
        const returned = formatTime(hourInput, minuteInput);
        setFormattedManualTime(returned.time)
        setIsManualTime(true);
        setManualHour(hourInput);
        setManualMinute(minuteInput);
        setManualPeriod(returned.period);

        // Use current date to fill in missing date data if manual date is not being used
        const currentDate = new Date();

        // Set the full date time
        if (isManualDate) {
            console.log("Manual date, setting manual time");
            setFullDateTime(getFullDateTime(currentDate.getFullYear(), manualMonth, manualDay, hourInput, minuteInput));
        } else {
            console.log("No manual date, setting manual time");
            setFullDateTime(getFullDateTime(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hourInput, minuteInput));
        }
    }

    // Manual Date state
    const [manualMonth, setManualMonth] = useState(Months.Jan);
    const [manualDay, setManualDay] = useState(1);
    const [formattedDate, setFormattedDate] = useState<string>("");
    const manuallySetDate = (monthInput:Months, dayInput:number) => {
        const currentYear = new Date().getFullYear();
        const setDate = new Date(currentYear, monthInput, dayInput);
        setIsManualDate(true);
        setManualMonth(monthInput);
        setManualDay(dayInput);
        setManualCalendarDay(setDate.getDay());
        setFormattedDate(Months[monthInput] + " " + dayInput + getDayPostfix(dayInput));

        // Use current date to fill in missing date data if manual time is not being used
        const currentDate = new Date();

        // Set the full date time
        if(isManualTime){
            setFullDateTime(getFullDateTime(currentDate.getFullYear(), monthInput, dayInput, manualHour, manualMinute))
        } else{
            setFullDateTime(getFullDateTime(currentDate.getFullYear(), monthInput, dayInput, currentDate.getHours(), currentDate.getMinutes()))
        }
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
            formattedDate,
            manualCalendarDay,
            setManualCalendarDay,
            isManualDate,
            setIsManualDate,
            fullDateTime
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