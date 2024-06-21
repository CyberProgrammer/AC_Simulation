import {getCurrentTime} from '../../utils/index';
import { handleSetTempUp, handleSetTempDown } from '../../utils/index';

import TriangleUp from '../../assets/icons/triangle-up.svg';
import TriangleDown from '../../assets/icons/triangle-down.svg';
import {useEffect, useState } from 'react';

interface HomeProps{
    callForCooling: boolean;
    currentTemp: number;
    setCurrentTemp: (value:number) => void;
    setTemp: number;
    setSetTemp: (value:number) => void;
    setCallForCooling: (value: boolean) => void;
    fanSetting: number;
    fanStatus: number;
    setFanStatus: (value:number) => void;
    status: string;
    setStatus: (value:string) => void;
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
        setStatus
    }) => {

    const changeStatus = (updateStatus: string) => {
        setStatus("Wait");
        // If the fan is on auto, the fan follows the condenser status.
        // When the compressor is on, the fan is on. When the compressor is off, the fan is off
        // Each time a change in status occurs and the fan is on auto, the fan status is yellow
        if((updateStatus === "Cool" || updateStatus === "At Temp") && fanSetting === 1)
            setFanStatus(2);

        setTimeout(() => {
            if(updateStatus === "Cool")
                setFanStatus(1);
            else if(updateStatus === "At Temp" && fanSetting === 1)
                setFanStatus(0);

            setStatus(updateStatus);
        }, 5000);
    }

    // Set temp up
    const handleUp = () => {
        handleSetTempUp({
            setTemp,
            setSetTemp,
            currentTemp,
            callForCooling,
            setCallForCooling,
            changeStatus
        });
    }

    // Set temp down
    const handleDown = () => {
        handleSetTempDown({
            setTemp,
            setSetTemp,
            currentTemp,
            callForCooling,
            setCallForCooling,
            changeStatus
        });
    }

    // State for time and period
    const [currentTime, setCurrentTime] = useState(getCurrentTime().time);
    const [isAM, setIsAM] = useState(getCurrentTime().isAM);

    //Checks for new time on interval
    useEffect(() => {
        const interval = setInterval(() => {
            const { time, isAM } = getCurrentTime();
            console.log("Checking time...");
            setCurrentTime(time);
            setIsAM(isAM);
        }, 10000); // Update every 10seconds

        return () => clearInterval(interval);
    }, []);

    return(
        <>
            <div className={"thermostat-textbox"}>
                <h3>System: {status}</h3>
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
                    <div className={"set-info"}>
                        <p className={"small-text"}>Set</p>
                        <p className={"small-text"}>To</p>
                    </div>
                    <div className={"set-controls"}>
                        <button className={"temp-button"} onClick={handleUp}>
                            <img src={TriangleUp} alt={"Icon"} />
                        </button>
                        <div className={"temp-reading"}>
                            <h2 className={"digital-text"}>{setTemp}</h2>
                            <h3>&#176;</h3>
                        </div>
                        <button className={"temp-button"} onClick={handleDown}>
                            <img src={TriangleDown} alt={"Icon"} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;