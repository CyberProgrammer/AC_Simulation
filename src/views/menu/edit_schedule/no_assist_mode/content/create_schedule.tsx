import React, {useState} from "react";
import '../../styles/create_schedule.css'
/* Assets */
import TriangleUp from "@assets/icons/triangle-up.svg";
import TriangleDown from "@assets/icons/triangle-down.svg";
/* Components */
import ThermostatButton from "@components/buttons/thermostat_button.tsx";
import ArrowButton from "@components/buttons/arrow_button.tsx";
import ScheduleDaysControls from "@components/prompts/controls/schedule_days.tsx";
import {Mode} from "@customTypes/enums.ts";
/* Contexts */
import {useSchedule} from "@contexts/schedule_context.tsx";
import {useCondenser} from "@contexts/condenser_context.tsx";
/* Utils */
import {handleAutoMode} from "@utils/system_handlers/handleAutoMode.ts";
import {formatTime} from "@utils/schedule_handlers/formatTIme.ts";
import {handleTimeDown} from "@utils/schedule_handlers/handleTimeDown.ts";
import {handleTimeUp} from "@utils/schedule_handlers/handleTimeUp.ts";
import {handleTempUp} from "@utils/schedule_handlers/handleTempUp.ts";
import {handleTempDown} from "@utils/schedule_handlers/handleTempDown.ts";
import {useDatetimeStates} from "@contexts/datetime_context.tsx";
import TextPrompt from "./components/text_prompt.tsx";
import {useDispatch, useSelector} from "react-redux";
import {setMode} from "../../../../../state/slices/generalSlice.ts";
import {RootState} from "../../../../../state/store.ts";

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
        scheduleDays,
        setIsFollowingSchedule,
        checkSchedule
    } = useSchedule()

    const dispatch = useDispatch();
    const currentTemp = useSelector((state: RootState) => state.general.currentTemp);
    const setTemp = useSelector((state: RootState) => state.general.setTemp);

    const fanSetting = useSelector((state: RootState) => state.fan.fanSetting);

    const [isWakeSet, setIsWakeSet] = useState<boolean>(false);

    const {isManualTime, manualCalendarDay, isManualDate, manualMonth, manualDay} = useDatetimeStates();
    const {setCallForCooling} = useCondenser();
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

                if(scheduleDays.includes(isManualDate ? manualCalendarDay : new Date().getDay())){
                    // Switch to auto mode and handle transition
                    dispatch(setMode(Mode.Auto));
                    handleAutoMode({dispatch, currentTemp, setTemp, fanSetting, setCallForCooling});

                    setIsFollowingSchedule(true);
                    console.log("Create schedule is manual time? : ", isManualTime)
                    // Switch the set temp to follow the schedule
                    checkSchedule(!isManualTime && !isManualDate
                        ? {dispatch} :
                        {dispatch, isManualTime, isManualDate, manualMonth, manualDay, manualCalendarDay});
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
                <TextPrompt text={"Set Wake time & temperature"} text_two={"Set Sleep time & temperature"} condition={isWakeSet} />
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
                                     clickEvent={() =>
                                         handleTimeUp({
                                             isWakeSet,
                                             wakeTime,
                                             setWakeTime,
                                             sleepTime,
                                             setSleepTime,
                                             isManualDate,
                                             manualMonth,
                                             manualDay
                                         })}
                                     icon={TriangleUp}
                        />
                        <h4 className={"time digital-text"}>{formatTime(!isWakeSet ? wakeTime : sleepTime)}</h4>
                        <ArrowButton className={"temp-button"}
                                     isDisabled={false}
                                     clickEvent={() =>
                                         handleTimeDown({
                                             isWakeSet,
                                             wakeTime,
                                             setWakeTime,
                                             sleepTime,
                                             setSleepTime,
                                             isManualDate,
                                             manualMonth,
                                             manualDay
                                         })}
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