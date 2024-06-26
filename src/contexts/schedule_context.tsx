import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";

interface ScheduleContextProps {
    scheduleDays: number[];
    setScheduleDays: React.Dispatch<React.SetStateAction<number[]>>;
    wakeTime: Date;
    setWakeTime: React.Dispatch<React.SetStateAction<Date>>;
    wakeTemp: number;
    setWakeTemp: React.Dispatch<React.SetStateAction<number>>;
    sleepTime: Date;
    setSleepTime: React.Dispatch<React.SetStateAction<Date>>;
    sleepTemp: number;
    setSleepTemp: React.Dispatch<React.SetStateAction<number>>;
    isScheduleSet: boolean;
    setScheduleSet:  React.Dispatch<React.SetStateAction<boolean>>;
    removeSchedule: () => void;
    isFollowingSchedule: boolean;
    setIsFollowingSchedule: React.Dispatch<React.SetStateAction<boolean>>;
    checkSchedule: ({ setSetTemp }: CheckScheduleParams) => void;
}

interface ScheduleProviderProps {
    children: ReactNode;
}

interface CheckScheduleParams{
    setSetTemp: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context
const ScheduleContext = createContext<ScheduleContextProps | undefined>(undefined);
export const ScheduleProvider: React.FC<ScheduleProviderProps> = ({ children }) => {
    const initializeSchedule = () => {
        const initialWakeTime = new Date();
        initialWakeTime.setHours(6, 0, 0, 0);
        setWakeTime(initialWakeTime)
        setWakeTemp(70);

        const initialSleepTime = new Date();
        initialSleepTime.setHours(18, 0, 0, 0);
        setSleepTime(initialSleepTime);
        setSleepTemp(80);

        setScheduleDays([]);
    }

    const removeSchedule = () => {
        initializeSchedule();
        setScheduleSet(false);
        setIsFollowingSchedule(false);
    }
    const checkSchedule = ({ setSetTemp }: CheckScheduleParams) => {
        const currentTime = new Date();

        if(!scheduleDays.includes(currentTime.getDay())){
            setIsFollowingSchedule(false);
            return;
        }

        if(currentTime >= wakeTime && currentTime < sleepTime && isFollowingSchedule){
            console.log("Wake schedule...");
            console.log("Wake time:" , wakeTime);
            setSetTemp(wakeTemp);
        } else if(currentTime >= sleepTime && isFollowingSchedule){
            console.log("Sleep schedule...");
            console.log("Wake time:" , sleepTime);
            setSetTemp(sleepTemp);
        }
    };

    // Wake time
    const [wakeTime, setWakeTime] = useState<Date>(new Date());
    const [wakeTemp, setWakeTemp] = useState<number>(0);

    // Sleep time
    const [sleepTime, setSleepTime] = useState<Date>(new Date());
    const [sleepTemp, setSleepTemp] = useState<number>(0);

    // Initialize
    useEffect(() => {
        initializeSchedule();
    }, []);

    // Set schedule days
    const initialDays:number[] = [];
    const [scheduleDays, setScheduleDays] = useState<number[]>(initialDays);

    // Boolean to check if schedule is set
    const [isScheduleSet, setScheduleSet] = useState<boolean>(false);

    // Boolean to check if following schedule
    const [isFollowingSchedule, setIsFollowingSchedule] = useState<boolean>(false);

    return (
        <ScheduleContext.Provider value={{
            scheduleDays,
            setScheduleDays,
            wakeTime,
            setWakeTime,
            wakeTemp,
            setWakeTemp,
            sleepTime,
            setSleepTime,
            sleepTemp,
            setSleepTemp,
            isScheduleSet,
            setScheduleSet,
            removeSchedule,
            isFollowingSchedule,
            setIsFollowingSchedule,
            checkSchedule
        }}>
            {children}
        </ScheduleContext.Provider>
    );
};

export const useSchedule = () => {
    const context = useContext(ScheduleContext);
    if (context === undefined) {
        throw new Error("useSchedule must be used within a ScheduleProvider");
    }
    return context;
};