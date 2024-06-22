import {getCurrentTime} from '../../utils/index';
import { handleSetTempUp, handleSetTempDown } from '../../utils/index';

import TriangleUp from '../../assets/icons/triangle-up.svg';
import TriangleDown from '../../assets/icons/triangle-down.svg';
import {useEffect, useState } from 'react';

import {Mode, FanStatus, FanSetting, SystemStatus} from '../../types/enums';

interface HomeProps{
    callForCooling: boolean;
    currentTemp: number;
    setCurrentTemp: (value:number) => void;
    setTemp: number;
    setSetTemp: (value:number) => void;
    setCallForCooling: (value: boolean) => void;
    fanSetting: FanSetting;
    fanStatus: FanStatus;
    setFanStatus: (val:FanStatus) => void;
    status: SystemStatus;
    setStatus: (val: SystemStatus) => void;
    mode: Mode;
}
const Home:React.FC<HomeProps> = (
    {
        callForCooling,
        currentTemp,
        setCurrentTemp,
        setTemp,
        setSetTemp,
        setCallForCooling,
        fanSetting,
        fanStatus,
        setFanStatus,
        status,
        setStatus,
        mode,
    }) => {

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

    // State for time and period
    const [currentTime, setCurrentTime] = useState(getCurrentTime().time);
    const [isAM, setIsAM] = useState(getCurrentTime().isAM);

    // Checks for new time on interval
    useEffect(() => {
        const interval = setInterval(() => {
            const { time, isAM } = getCurrentTime();
            console.log("Checking time...");
            setCurrentTime(time);
            setIsAM(isAM);
        }, 10000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, []);

    return(
        <>
            <div className={"thermostat-textbox"}>
                <h3>System: {SystemStatus[status]}</h3>
                <h3>Outdoor: 80&#176;/55%</h3>
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
                            <div className={"set-info"}>
                                <p className={"small-text"}>Set</p>
                                <p className={"small-text"}>To</p>
                            </div>
                            <div className={"set-controls"}>
                                <button className={"temp-button"} disabled={status === SystemStatus.Wait} onClick={handleUp}>
                                    <img src={TriangleUp} alt={"Icon"}/>
                                </button>
                                <div className={"temp-reading"}>
                                    <h2 className={"digital-text"}>{setTemp}</h2>
                                    <h3>&#176;</h3>
                                </div>
                                <button className={"temp-button"} disabled={status === SystemStatus.Wait} onClick={handleDown}>
                                    <img src={TriangleDown} alt={"Icon"}/>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
export default Home;