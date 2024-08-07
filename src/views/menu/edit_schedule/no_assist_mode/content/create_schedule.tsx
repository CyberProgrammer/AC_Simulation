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

/* Utils */
import {handleAutoMode} from "@utils/system_handlers/handleAutoMode.ts";
import {formatTime} from "@utils/schedule_handlers/formatTIme.ts";
import {handleTimeDown} from "@utils/schedule_handlers/handleTimeDown.ts";
import {handleTimeUp} from "@utils/schedule_handlers/handleTimeUp.ts";
import {handleTempUp} from "@utils/schedule_handlers/handleTempUp.ts";
import {handleTempDown} from "@utils/schedule_handlers/handleTempDown.ts";
import TextPrompt from "./components/text_prompt.tsx";
import {useDispatch, useSelector} from "react-redux";
import {setMode} from "../../../../../state/slices/generalSlice.ts";
import {RootState} from "../../../../../state/store.ts";
import {setIsFollowingSchedule, setIsScheduleSet} from "../../../../../state/slices/scheduleSlice.ts";
import {checkSchedule} from "@utils/schedule_handlers/checkSchedule.ts";

interface CreateScheduleParams{
    setView: React.Dispatch<React.SetStateAction<number>>;
    setIsNavigationActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateSchedule = ({setView, setIsNavigationActive}:CreateScheduleParams) => {


    const dispatch = useDispatch();
    const currentTemp = useSelector((state: RootState) => state.general.currentTemp);
    const setTemp = useSelector((state: RootState) => state.general.setTemp);

    const fanSetting = useSelector((state: RootState) => state.fan.fanSetting);

    const [isWakeSet, setIsWakeSet] = useState<boolean>(false);

    const isManualTime = useSelector((state: RootState) => state.datetime.isManualTime);
    const manualCalendarDay = useSelector((state: RootState) => state.datetime.manualCalendarDay);
    const isManualDate = useSelector((state: RootState) => state.datetime.isManualDate);
    const manualMonth = useSelector((state: RootState) => state.datetime.manualMonth);
    const manualDay = useSelector((state: RootState) => state.datetime.manualDay);
    const fullDateTime = useSelector((state:RootState) => state.datetime.fullDateTime);

    const scheduleDays = useSelector((state:RootState) => state.schedule.scheduleDays);
    const isFollowingSchedule = useSelector((state:RootState) => state.schedule.isFollowingSchedule);
    const wakeTime = useSelector((state:RootState) => state.schedule.wakeTime);
    const sleepTime = useSelector((state:RootState) => state.schedule.sleepTime);
    const wakeTemp = useSelector((state:RootState) => state.schedule.wakeTemp);
    const sleepTemp = useSelector((state:RootState) => state.schedule.sleepTemp);
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
                dispatch(setIsScheduleSet(true));

                if(scheduleDays.includes(isManualDate ? manualCalendarDay : new Date().getDay())){
                    // Switch to auto mode and handle transition
                    dispatch(setMode(Mode.Auto));
                    handleAutoMode({dispatch, currentTemp, setTemp, fanSetting});

                    dispatch(setIsFollowingSchedule(true));
                    console.log("Create schedule is manual time? : ", isManualTime)
                    // Switch the set temp to follow the schedule
                    checkSchedule({
                        dispatch,
                        scheduleDays,
                        isFollowingSchedule,
                        isManualTime,
                        isManualDate,
                        manualMonth,
                        manualDay,
                        manualCalendarDay,
                        fullDateTime,
                        wakeTime,
                        sleepTime,
                        wakeTemp,
                        sleepTemp
                    });
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
                        <ArrowButton
                            className={"temp-button"}
                            isDisabled={false}
                            clickEvent={() =>
                                handleTimeUp({
                                    dispatch,
                                    isWakeSet,
                                    wakeTime,
                                    sleepTime,
                                    isManualDate,
                                    manualMonth,
                                    manualDay
                                })}
                            icon={TriangleUp}
                        />
                        <h4 className={"time digital-text"}>{formatTime(!isWakeSet ? new Date(wakeTime) : new Date(sleepTime))}</h4>
                        <ArrowButton
                            className={"temp-button"}
                            isDisabled={false}
                            clickEvent={() =>
                                handleTimeDown({
                                    dispatch,
                                    isWakeSet,
                                    wakeTime,
                                    sleepTime,
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
                                     clickEvent={() => handleTempUp({dispatch, isWakeSet, wakeTemp, sleepTemp})}
                                     icon={TriangleUp}
                        />
                        <h2 className={"temp digital-text"}>{!isWakeSet ? wakeTemp : sleepTemp}</h2>
                        <ArrowButton className={"temp-button"}
                                     isDisabled={false}
                                     clickEvent={() => handleTempDown({dispatch, isWakeSet, wakeTemp, sleepTemp})}
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