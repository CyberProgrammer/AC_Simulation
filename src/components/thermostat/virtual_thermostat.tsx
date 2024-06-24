import {useEffect, useState } from 'react';

import Navigation from '../../views/navigation/navigation';
import Home from '../../views/home/home';
import Fan from '../../views/fan/fan';
import System from '../../views/system/system';
import LEDDisplay from '../../shared/led/LEDDisplay';


import {Mode, FanStatus, FanSetting, SystemStatus} from '../../types/enums'
import Menu from '../../views/menu/menu';
import {checkStatus} from "../../utils/thermostatUtils.ts";
const Virtual_Thermostat = () => {
    const [menu, setMenu] = useState<number>(0);

    // Home states
    const [currentTemp, setCurrentTemp] = useState<number>(72);
    const [setTemp, setSetTemp] = useState<number>(73);

    // Fan states
    const [fanSetting, setFanSetting] = useState<FanSetting>(FanSetting.Auto);

    // Fan status
    const [fanStatus, setFanStatus] = useState<FanStatus>(FanStatus.Off);

    // Mode states
    const [mode, setMode] = useState<Mode>(Mode.Off);

    // General states
    const [callForCooling, setCallForCooling] = useState<boolean>(false);
    const [status, setStatus] = useState<SystemStatus>(SystemStatus.Off);

    // Artificially change the current temp to simulate real change
    useEffect(() => {
        let tempChange: NodeJS.Timeout;

        // If cool mode and current temp is greater than set temp, change the current temp - 1
        if (mode === Mode.Cool && currentTemp > setTemp) {
            tempChange = setInterval(() => {
                setCurrentTemp(prevTemp => prevTemp - 1);
                clearInterval(tempChange);
            }, 10000);
        }

        // If heat mode and current temp is less than set temp, change the current temp + 1
        if (mode === Mode.Heat && currentTemp < setTemp) {
            tempChange = setInterval(() => {
                setCurrentTemp(prevTemp => prevTemp + 1);
                clearInterval(tempChange);
            }, 10000);
        }

        checkStatus(mode, currentTemp, setTemp, status, fanSetting, setStatus, setFanStatus, setCallForCooling);

        return () => clearInterval(tempChange);
    }, [setTemp, currentTemp, mode, status, fanSetting]);

    return (
        <>
            <div className={"thermostat-body"}>
                <div className={"thermostat-content"}>
                    <Navigation menu={menu} status={status} setMenu={setMenu}/>
                    {menu === 0 && (
                        <Home
                            callForCooling={callForCooling}
                            setCallForCooling={setCallForCooling}
                            currentTemp={currentTemp}
                            setTemp={setTemp}
                            setSetTemp={setSetTemp}
                            fanSetting={fanSetting}
                            setFanStatus={setFanStatus}
                            status={status}
                            setStatus={setStatus}
                            mode={mode}
                        />
                    )}
                    {menu === 1 && (
                        <Fan
                            callForCooling={callForCooling}
                            fanSetting={fanSetting}
                            setFanSetting={setFanSetting}
                            setFanStatus={setFanStatus}
                            setMenu={setMenu}
                        />
                    )}
                    {menu === 2 && (
                        <System
                            currentTemp={currentTemp}
                            setTemp={setTemp}
                            fanSetting={fanSetting}
                            setFanStatus={setFanStatus}
                            mode={mode}
                            setMode={setMode}
                            setMenu={setMenu}
                            callForCooling={callForCooling}
                            setCallForCooling={setCallForCooling}
                            setStatus={setStatus}
                        />
                    )}
                    {menu === 3 && (
                        <Menu

                        />
                    )}
                </div>
            </div>
            <div className={"led-displays"}>
                <LEDDisplay label="Condenser Status" mode={mode} status={status} isCooling={callForCooling}/>
                <LEDDisplay label="Fan Status" mode={mode} status={fanStatus} fanStatus={fanStatus}/>
            </div>
        </>

    )
}
export default Virtual_Thermostat;