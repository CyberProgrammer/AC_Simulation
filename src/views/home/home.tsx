import {getCurrentTime, handleSetTempDown, handleSetTempUp} from '../../utils';

import TriangleUp from '../../assets/icons/triangle-up.svg';
import TriangleDown from '../../assets/icons/triangle-down.svg';
import React, {useEffect, useState } from 'react';

import {Mode, FanStatus, FanSetting, SystemStatus} from '../../types/enums';
import ArrowButton from "../../components/buttons/arrow_button.tsx";


import './home.css';

/* Contexts */
import {useSchedule} from "@contexts/schedule_context.tsx";
import {useGeneralStates} from "@contexts/general_context.tsx";
import {useCondenser} from "@contexts/condenser_context.tsx";
import {useFan} from "@contexts/fan_context.tsx";

import ControlButton from "@components/buttons/control_button.tsx";

interface HomeProps{
}
const Home:React.FC<HomeProps> = () => {
    const {mode, setMode, setTemp, setSetTemp, currentTemp, status, setStatus} = useGeneralStates();
    const {callForCooling, setCallForCooling} = useCondenser();
    const {fanSetting,  setFanStatus} = useFan()
    const {isFollowingSchedule, setIsFollowingSchedule, isScheduleSet, checkSchedule} = useSchedule();

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
    const changeStatus = (updateStatus: SystemStatus) => {
        setStatus(SystemStatus.Wait);
        // If the fan is on auto, the fan follows the condenser status.
        // When the compressor is on, the fan is on. When the compressor is off, the fan is off.
        // Each time a change in status occurs and the fan is on auto, the fan status is yellow.
        if ((updateStatus === SystemStatus.Cool || updateStatus === SystemStatus.AtTemp || updateStatus === SystemStatus.Heat) && fanSetting === FanSetting.Auto) {
            setFanStatus(FanStatus.Wait);
        }

        setTimeout(() => {
            if (updateStatus === SystemStatus.Cool || updateStatus === SystemStatus.Heat) {
                setFanStatus(FanStatus.On);
            } else if (updateStatus === SystemStatus.AtTemp && fanSetting === FanSetting.Auto) {
                setFanStatus(FanStatus.Off);
            }

            setStatus(updateStatus);
        }, 5000);
    };

    // Set temp up
    const handleUp = () => {
        handleSetTempUp({
            mode,
            setTemp,
            setSetTemp,
            currentTemp,
            callForCooling,
            setCallForCooling,
            changeStatus
        });
    };

    // Set temp down
    const handleDown = () => {
        handleSetTempDown({
            mode,
            setTemp,
            setSetTemp,
            currentTemp,
            callForCooling,
            setCallForCooling,
            changeStatus
        });
    };

    // Checks for new time on interval
    useEffect(() => {
        const interval = setInterval(() => {
            const { time, isAM } = getCurrentTime();
            console.log("Checking time...");
            setCurrentTime(time);
            setIsAM(isAM);
        }, 20000); // Update every 20 seconds

        return () => clearInterval(interval);
    }, []);

    const handleScheduleStatusChange = () => {
        console.log("Handeling status...");

        // Set the is following schedule to the opposite
        !isFollowingSchedule ? setMode(Mode.Auto) : null;
        !isFollowingSchedule ? checkSchedule({setSetTemp}) : null;
        isFollowingSchedule ? setIsFollowingSchedule(false) : setIsFollowingSchedule(true);

    }

    return(
        <>
            <div className={"thermostat-textbox"}>
                <p className={"h3 dotted-text"}>System: {SystemStatus[status] === "AtTemp" ? "At Temp" : SystemStatus[status]}</p>
                <p className={"h3 dotted-text"}>Outdoor: 80&#176;/55%</p>
                { isScheduleSet && (
                    <div className={"update-schedule-status"}>
                        <ControlButton buttonClass={"schedule-status"} clickEvent={handleScheduleStatusChange}
                                       textClass={""} text={isFollowingSchedule ? "Override Schedule" : "Resume Schedule"}/>
                    </div>
                )}
            </div>
            <div className={"thermostat-info"}>
                <div className={"info-left"}>
                    <h3 className={"digital-text"}>{currentTime}</h3>
                    <p>{isAM ? "am" : "pm"}</p>
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
                                    <ArrowButton className={"temp-button"} isDisabled={status === SystemStatus.Wait || isFollowingSchedule}
                                                 clickEvent={handleUp} icon={TriangleUp}/>
                                    <div className={"temp-reading"}>
                                        <h2 className={"digital-text"}>{setTemp}</h2>
                                        <h3>&#176;</h3>
                                    </div>
                                    <ArrowButton className={"temp-button"} isDisabled={status === SystemStatus.Wait || isFollowingSchedule}
                                                 clickEvent={handleDown} icon={TriangleDown}/>
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