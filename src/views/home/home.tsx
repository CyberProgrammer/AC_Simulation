import {getCurrentTime, handleSetTempDown, handleSetTempUp} from '../../utils';

import TriangleUp from '@assets/icons/triangle-up.svg';
import TriangleDown from '@assets/icons/triangle-down.svg';
import {useEffect, useState } from 'react';

import {Mode, SystemStatus} from '@customTypes/enums';
import ArrowButton from "@components/buttons/arrow_button.tsx";

import './home.css';

/* Contexts */
import {useSchedule} from "@contexts/schedule_context.tsx";
import {useGeneralStates} from "@contexts/general_context.tsx";
import {useCondenser} from "@contexts/condenser_context.tsx";
import {useFan} from "@contexts/fan_context.tsx";

import ControlButton from "@components/buttons/control_button.tsx";
import {handleScheduleChange} from "./utils/handleScheduleChange.ts";
import {useDatetimeStates} from "@contexts/datetime_context.tsx";
import {formatTime} from "@utils/set_current_time.ts";
const Home = () => {
    const {mode, setMode, setTemp, setSetTemp, currentTemp, status, setStatus} = useGeneralStates();
    const {callForCooling, setCallForCooling} = useCondenser();
    const {fanSetting,  setFanStatus} = useFan();
    const {isFollowingSchedule, setIsFollowingSchedule, isScheduleSet, checkSchedule} = useSchedule();
    const {formattedManualTime, manuallySetTime, manualPeriod, isManualTime, manualHour, manualMinute, setManualMinute, setManualHour} = useDatetimeStates();
    // State for time and period
    const [currentTime, setCurrentTime] = useState(getCurrentTime().time);
    const [isAM, setIsAM] = useState(getCurrentTime().isAM);

    useEffect(() => {
        checkSchedule({setSetTemp})
    }, [currentTime]);

    /*
    Change status is responsible for keeping the condenser and fan status
    updated when the set temperature controls are adjusted.
    */

    // Checks for new time on interval
    let refreshTime = 20000;
    if(isManualTime) refreshTime = 60000;
    useEffect(() => {

        const interval = setInterval(() => {
            if (!isManualTime) {
                const { time, isAM } = getCurrentTime();
                console.log("Checking time...");
                setCurrentTime(time);
                setIsAM(isAM);
            } else {
                console.log("Checking manual time...");
                incrementManualTime();
                console.log("Period: ", manualPeriod);
                console.log("Hour: ", manualHour);
                setIsAM(manualPeriod === "am");
            }
        }, refreshTime); // Update every 60 seconds

        return () => clearInterval(interval);
    }, [isManualTime, manualHour, manualMinute]);

    const incrementManualTime = () => {
        let newMinute = manualMinute + 1;
        let newHour = manualHour;
        if(newMinute === 60){
            newMinute = 0;
            newHour = newHour + 1;
            if (newHour === 24) {
                newHour = 0;
            }
            setManualHour(newHour)
        }
        setManualMinute(newMinute);
        manuallySetTime(newHour, newMinute);
    };



    return(
        <>
            <div className={"thermostat-textbox"}>
                <p className={"h3 dotted-text"}>System: {SystemStatus[status] === "AtTemp" ? "At Temp" : SystemStatus[status]}</p>
                <p className={"h3 dotted-text"}>Outdoor: 80&#176;/55%</p>
                { isScheduleSet && (
                    <div className={"update-schedule-status"}>
                        <ControlButton
                            buttonClass={"schedule-status"}
                            clickEvent={() => handleScheduleChange({isFollowingSchedule, setMode, checkSchedule, setSetTemp, setIsFollowingSchedule})}
                            textClass={""}
                            text={isFollowingSchedule ? "Override Schedule" : "Resume Schedule"}
                        />
                    </div>
                )}
            </div>
            <div className={"thermostat-info"}>
                <div className={"info-left"}>
                    <h3 className={"digital-text"}>{isManualTime ? formattedManualTime : currentTime}</h3>
                    <p>{isManualTime ? manualPeriod : isAM ? "am" : "pm"}</p>
                </div>
                <div className={"info-center"}>
                    <div className={"temp-reading"}>
                        <h1 className={"digital-text"}>{currentTemp}</h1>
                        <h2>&#176;</h2>
                    </div>
                    <div className={"humidity-reading"}>
                        <p className={"digital-text"}>45%</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div className={"info-right"}>
                    { mode != Mode.Off && (
                        <>
                            <div className={'info-container'}>
                                <div className={"schedule-info"}>
                                    <p className={`small-text ${!isFollowingSchedule ? "hidden-text" : ""}`}>
                                        Following Schedule
                                    </p>
                                </div>
                            </div>
                            <div className={"set-controls"}>
                                <div className={"set-info"}>
                                    <p className={"small-text"}>Set</p>
                                    <p className={"small-text"}>To</p>
                                </div>
                                <div className={"controls"}>
                                    <ArrowButton
                                        className={"temp-button"}
                                        isDisabled={status === SystemStatus.Wait || isFollowingSchedule}
                                        clickEvent={() =>
                                            handleSetTempUp({mode,
                                                setTemp,
                                                setSetTemp,
                                                currentTemp,
                                                callForCooling,
                                                setCallForCooling,
                                                fanSetting,
                                                setStatus,
                                                setFanStatus
                                                })}
                                        icon={TriangleUp}
                                    />
                                    <div className={"temp-reading"}>
                                        <h2 className={"digital-text"}>{setTemp}</h2>
                                        <h3>&#176;</h3>
                                    </div>
                                    <ArrowButton
                                        className={"temp-button"}
                                        isDisabled={status === SystemStatus.Wait || isFollowingSchedule}
                                        clickEvent={() =>
                                            handleSetTempDown({
                                                mode,
                                                setTemp,
                                                setSetTemp,
                                                currentTemp,
                                                callForCooling,
                                                setCallForCooling,
                                                fanSetting,
                                                setStatus,
                                                setFanStatus
                                            })}
                                        icon={TriangleDown}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
export default Home;