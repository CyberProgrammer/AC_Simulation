import ThermostatButton from "../../../../../components/buttons/thermostat_button.tsx";
import ScheduleDaysControls from "../../button_groups/schedule_days/schedule_days.tsx";
import React, {useState} from "react";

import '../../edit/styles/create_schedule.css'
import ArrowButton from "../../../../../components/buttons/arrow_button.tsx";
import TriangleUp from "../../../../../assets/icons/triangle-up.svg";
import TriangleDown from "../../../../../assets/icons/triangle-down.svg";
import {useSchedule} from "../../../../../contexts/schedule_context.tsx";

interface CreateScheduleParams{
    setView: React.Dispatch<React.SetStateAction<number>>;
    setIsNavigationActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateSchedule = ({setView, setIsNavigationActive}:CreateScheduleParams) => {
    const {
        wakeTime,
        wakeTemp,
        setWakeTime,
        setWakeTemp,
        sleepTime,
        setSleepTime,
        sleepTemp ,
        setSleepTemp,
        setScheduleSet
    } = useSchedule()

    const [isWakeSet, setIsWakeSet] = useState<boolean>(false);

    const handleTimeUp = () => {
        if(!isWakeSet)
            setWakeTime(new Date(wakeTime.getTime() + 900000)); // Increment by 15 minutes
        else
            setSleepTime(new Date(sleepTime.getTime() + 900000));
    }

    const handleTimeDown = () => {
        if(!isWakeSet)
            setWakeTime(new Date(wakeTime.getTime() - 900000)); // Decrement by 15 minutes
        else
            setSleepTime(new Date(sleepTime.getTime() - 900000)); // Decrement by 15 minutes
    }

    const handleTempUp = () => {
        if(!isWakeSet)
            setWakeTemp(wakeTemp+1);
        else
            setSleepTemp(sleepTemp+1);
    }

    const handleTempDown = () => {
        if(!isWakeSet)
            setWakeTemp(wakeTemp-1);
        else
            setSleepTemp(sleepTemp-1);
    }
    const handleButtonClick = (id:number) => {
        switch (id){
            case 1:
                // Set wake time
                setIsWakeSet(true);
                break;
            case 2:
                console.log("Cancel creating schedule");
                setIsNavigationActive(true);
                setView(-1);
                break;
            case 3:
                // Create schedule
                setScheduleSet(true);
                setIsNavigationActive(true);
                setView(-1);
                break;
        }
    }
    const formatTime = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const amPm = hours >= 12 ? 'pm' : 'am';
        return `${formattedHours}:${formattedMinutes} ${amPm}`;
    }

    return (
        <div className={"menu-container"}>
            <div className={"menu-body"}>
                <div className={"menu-content"}>
                    <div className={"menu-options"}>
                        <div className={"menu-option"}>
                            <p className={"dotted-text prompt"}>
                                { !isWakeSet ? "Set Wake time & temperature" : "Set Sleep time & temperature"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={"schedule-controls"}>
                    <div className={"control-center"}>
                        <ThermostatButton
                            className={"thermostat-button"}
                            clickEvent={!isWakeSet ? () => handleButtonClick(1) : () => handleButtonClick(3)}
                            isNavigationActive={true}
                            text={"Done"}
                        />
                        <ThermostatButton
                            className={"thermostat-button"}
                            clickEvent={() => handleButtonClick(2)}
                            isNavigationActive={true}
                            text={"Cancel"}
                        />
                    </div>
                </div>
            </div>
            <div className={"schedule-time-controls"}>
                <div className={"schedule-time-left"}>
                    <div className={"schedule-control"}>
                        <ArrowButton className={"temp-button"} isDisabled={false} clickEvent={handleTimeUp} icon={TriangleUp} />
                        <h4 className={"time digital-text"}>{formatTime(!isWakeSet ? wakeTime : sleepTime)}</h4>
                        <ArrowButton className={"temp-button"} isDisabled={false} clickEvent={handleTimeDown} icon={TriangleDown} />
                    </div>
                </div>
                <div className={"schedule-time-right"}>
                    <div className={"schedule-control"}>
                        <ArrowButton className={"temp-button"} isDisabled={false} clickEvent={handleTempUp}
                                     icon={TriangleUp}/>
                        <h2 className={"temp digital-text"}>{!isWakeSet ? wakeTemp : sleepTemp}</h2>
                        <ArrowButton className={"temp-button"} isDisabled={false} clickEvent={handleTempDown}
                                     icon={TriangleDown}/>
                    </div>
                </div>
            </div>
            <ScheduleDaysControls />
        </div>
    )
}

export default CreateSchedule;