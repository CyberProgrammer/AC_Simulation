// noinspection t

import {useEffect, useState} from 'react';
import './home.css';

import {getCurrentTime} from '../../utils';
import {Mode} from '@customTypes/enums';

/* Contexts */
import ControlButton from "@components/buttons/control_button.tsx";
import {useHandleScheduleChange} from "./utils/handleScheduleChange.ts";

import {checkAutomaticTime} from "./utils/checkAutomaticTime.ts";
import {checkManualTime} from "./utils/checkManualTime.ts";
import SystemStatusText from "./components/system_status_text.tsx";
import OutdoorInfo from "./components/outdoor_info.tsx";
import TimeInfo from "./components/time_info.tsx";
import TempInfo from "./components/temp_info.tsx";
import HumidityInfo from "./components/humidity_info.tsx";
import SetControls from "./components/set_controls.tsx";
import FollowingScheduleInfo from "./components/following_schedule_info.tsx";

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../state/store.ts";
import {checkSchedule} from "@utils/schedule_handlers/checkSchedule.ts";
const Home = () => {
    const dispatch = useDispatch();

    // General state
    const { currentTemp, mode, status } = useSelector((state: RootState) => state.general);

    // DateTime state
    const {
        isManualTime,
        isManualDate,
        manualMonth,
        manualDay,
        manualHour,
        manualPeriod,
        manualCalendarDay,
        manualMinute,
        fullDateTime,
        formattedManualTime
    } = useSelector((state: RootState) => state.datetime);

    // Schedule state
    const {
        scheduleDays,
        isFollowingSchedule,
        isScheduleSet,
        wakeTime,
        sleepTime,
        wakeTemp,
        sleepTemp
    } = useSelector((state: RootState) => state.schedule);

    // State for time and period
    const [currentTime, setCurrentTime] = useState(getCurrentTime().time);
    const [isAM, setIsAM] = useState(getCurrentTime().isAM);

    const handleCheckSchedule = () => {
        checkSchedule({
            dispatch ,
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
            sleepTemp,
        })
    }
    useEffect(() => {
        // Args depend on is manual time is set or not
        handleCheckSchedule();
    }, [currentTime]);

    // Checks for new time on interval
    let refreshTime = 20000;
    if(isManualTime) refreshTime = 60000;
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isManualTime) {
                checkAutomaticTime(setCurrentTime, setIsAM);
            } else {
                checkManualTime(
                    dispatch,
                    isManualDate,
                    manualMonth,
                    manualDay,
                    manualMinute,
                    manualHour,
                    manualPeriod,
                    setIsAM);
                handleCheckSchedule();
            }
        }, refreshTime); // Update every 60 seconds

        return () => clearInterval(interval);
    }, [isManualTime, manualHour, manualMinute, refreshTime]);

    const handleScheduleChange = useHandleScheduleChange();
    const handleButtonClick = () => {
        handleScheduleChange({ dispatch, isFollowingSchedule });
    };

    return(
        <>
            <div className={"thermostat-textbox"}>
                <SystemStatusText status={status} />
                <OutdoorInfo outdoorTemp={80} outdoorHumidity={55} />
                { isScheduleSet && isFollowingSchedule && (
                    <div className={"update-schedule-status"}>
                        <ControlButton
                            buttonClass={"schedule-status"}
                            clickEvent={handleButtonClick}
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
                                isFollowingSchedule={isFollowingSchedule}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
export default Home;