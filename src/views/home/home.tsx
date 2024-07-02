// noinspection t

import {useEffect, useState } from 'react';
import './home.css';

import {getCurrentTime} from '../../utils';
import {Mode} from '@customTypes/enums';

/* Contexts */
import {useSchedule} from "@contexts/schedule_context.tsx";
import {useGeneralStates} from "@contexts/general_context.tsx";
import {useCondenser} from "@contexts/condenser_context.tsx";
import {useFan} from "@contexts/fan_context.tsx";

import ControlButton from "@components/buttons/control_button.tsx";
import {handleScheduleChange} from "./utils/handleScheduleChange.ts";
import {useDatetimeStates} from "@contexts/datetime_context.tsx";
import {checkAutomaticTime} from "./utils/checkAutomaticTime.ts";
import {checkManualTime} from "./utils/checkManualTime.ts";
import SystemStatusText from "./components/system_status_text.tsx";
import OutdoorInfo from "./components/outdoor_info.tsx";
import TimeInfo from "./components/time_info.tsx";
import TempInfo from "./components/temp_info.tsx";
import HumidityInfo from "./components/humidity_info.tsx";
import SetControls from "./components/set_controls.tsx";
import FollowingScheduleInfo from "./components/following_schedule_info.tsx";
const Home = () => {
    const {
        mode,
        setMode, setTemp,
        setSetTemp,
        currentTemp,
        status,
        setStatus
    } = useGeneralStates();
    const {callForCooling, setCallForCooling} = useCondenser();
    const {fanSetting, setFanStatus} = useFan();
    const {isFollowingSchedule, setIsFollowingSchedule, isScheduleSet, checkSchedule} = useSchedule();
    const {
        formattedManualTime,
        fullDateTime,
        manuallySetTime,
        manualPeriod,
        isManualTime,
        isManualDate,
        manualMonth,
        manualDay,
        manualCalendarDay,
        manualHour,
        manualMinute,
        setManualMinute,
        setManualHour
    } = useDatetimeStates();

    // State for time and period
    const [currentTime, setCurrentTime] = useState(getCurrentTime().time);
    const [isAM, setIsAM] = useState(getCurrentTime().isAM);
    useEffect(() => {
        // Args depend on is manual time is set or not
        checkSchedule(!isManualTime && !isManualDate
            ? {setSetTemp} :
            {setSetTemp, isManualTime, isManualDate, manualMonth, manualDay, manualCalendarDay, fullDateTime})
    }, [currentTime]);

    // Checks for new time on interval
    let refreshTime = 20000;
    if(isManualTime) refreshTime = 60000;
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isManualTime) {
                checkAutomaticTime(setCurrentTime, setIsAM);
            } else {
                checkManualTime(manualMinute,
                    manualHour,
                    setManualHour,
                    setManualMinute,
                    manuallySetTime,
                    manualPeriod,
                    setIsAM);
                checkSchedule(!isManualTime && !isManualDate ? { setSetTemp } : { setSetTemp, isManualTime, isManualDate, manualMonth, manualDay, manualCalendarDay, fullDateTime });
            }
        }, refreshTime); // Update every 60 seconds

        return () => clearInterval(interval);
    }, [isManualTime, manualHour, manualMinute, refreshTime]);

    return(
        <>
            <div className={"thermostat-textbox"}>
                <SystemStatusText status={status} />
                <OutdoorInfo outdoorTemp={80} outdoorHumidity={55} />
                { isScheduleSet && isFollowingSchedule && (
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
                <TimeInfo isManualTime={isManualTime} formattedManualTime={formattedManualTime} currentTime={currentTime} manualPeriod={manualPeriod} isAM={isAM} />
                <div className={"info-center"}>
                    <TempInfo currentTemp={currentTemp} />
                    <HumidityInfo humidityPercentage={45} />
                </div>
                <div className={"info-right"}>
                    { mode != Mode.Off && (
                        <>
                            <FollowingScheduleInfo isFollowingSchedule={isFollowingSchedule} />
                            <SetControls
                                mode={mode}
                                status={status}
                                isFollowingSchedule={isFollowingSchedule}
                                setTemp={setTemp}
                                setSetTemp={setSetTemp}
                                currentTemp={currentTemp}
                                callForCooling={callForCooling}
                                setCallForCooling={setCallForCooling}
                                fanSetting={fanSetting}
                                setStatus={setStatus}
                                setFanStatus={setFanStatus}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
export default Home;