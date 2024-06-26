import ThermostatButton from "../../../../../components/buttons/thermostat_button.tsx";
import ScheduleDaysControls from "../../button_groups/schedule_days/schedule_days.tsx";
import React, {useState} from "react";

import '../../edit/styles/create_schedule.css'
import ArrowButton from "../../../../../components/buttons/arrow_button.tsx";
import TriangleUp from "../../../../../assets/icons/triangle-up.svg";
import TriangleDown from "../../../../../assets/icons/triangle-down.svg";
import {useSchedule} from "../../../../../contexts/schedule_context.tsx";
import {useGeneralStates} from "../../../../../contexts/general_context.tsx";
import {Mode} from "../../../../../types/enums.ts";
import {handleAutoMode} from "../../../../../utils/system_handlers/handleAutoMode.ts";
import {useFan} from "../../../../../contexts/fan_context.tsx";
import {useCondenser} from "../../../../../contexts/condenser_context.tsx";
import {formatTime} from "../../../../../utils/schedule_handlers/formatTIme.ts";
import {handleTimeDown} from "../../../../../utils/schedule_handlers/handleTimeDown.ts";
import {handleTimeUp} from "../../../../../utils/schedule_handlers/handleTimeUp.ts";
import {handleTempUp} from "../../../../../utils/schedule_handlers/handleTempUp.ts";
import {handleTempDown} from "../../../../../utils/schedule_handlers/handleTempDown.ts";

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
        setScheduleSet,
    } = useSchedule()

    const [isWakeSet, setIsWakeSet] = useState<boolean>(false);

    const {checkSchedule, scheduleDays} = useSchedule();
    const {setCallForCooling} = useCondenser();
    const {fanSetting, setFanStatus} = useFan();
    const {setMode, currentTemp, setTemp, setStatus, setSetTemp} = useGeneralStates();
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
            case 3: // Create schedule
                // Set and follow schedule
                setScheduleSet(true);

                if(scheduleDays.includes(new Date().getDay())){
                    // Switch to auto mode and handle transition
                    setMode(Mode.Auto);
                    handleAutoMode({currentTemp, setTemp, fanSetting, setStatus, setCallForCooling, setFanStatus,});

                    // Switch the set temp to follow the schedule
                    checkSchedule({setSetTemp});
                }

                // Restore navigation and switch back to home
                setIsNavigationActive(true);
                setView(-1);
                break;
        }
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
                        <ArrowButton className={"temp-button"}
                                     isDisabled={false}
                                     clickEvent={() => handleTimeUp({ isWakeSet, wakeTime, setWakeTime, sleepTime, setSleepTime })}
                                     icon={TriangleUp}
                        />
                        <h4 className={"time digital-text"}>{formatTime(!isWakeSet ? wakeTime : sleepTime)}</h4>
                        <ArrowButton className={"temp-button"}
                                     isDisabled={false}
                                     clickEvent={() => handleTimeDown({ isWakeSet, wakeTime, setWakeTime, sleepTime, setSleepTime })}
                                     icon={TriangleDown}
                        />
                    </div>
                </div>
                <div className={"schedule-time-right"}>
                    <div className={"schedule-control"}>
                        <ArrowButton className={"temp-button"}
                                     isDisabled={false}
                                     clickEvent={() => handleTempUp({isWakeSet, wakeTemp, setWakeTemp, sleepTemp, setSleepTemp})}
                                     icon={TriangleUp}
                        />
                        <h2 className={"temp digital-text"}>{!isWakeSet ? wakeTemp : sleepTemp}</h2>
                        <ArrowButton className={"temp-button"}
                                     isDisabled={false}
                                     clickEvent={() => handleTempDown({isWakeSet, wakeTemp, setWakeTemp, sleepTemp, setSleepTemp})}
                                     icon={TriangleDown}
                        />
                    </div>
                </div>
            </div>
            <ScheduleDaysControls />
        </div>
    )
}

export default CreateSchedule;