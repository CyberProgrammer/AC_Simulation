import {useEffect, useState} from 'react';

import Navigation from '../../views/navigation/navigation';
import Home from '../../views/home/home';
import Fan from '../../views/fan/fan';
import System from '../../views/system/system';
import LEDDisplay from '../../shared/led/LEDDisplay';

import {FanSetting, FanStatus, Mode, SystemStatus} from '../../types/enums'
import Menu from '../../views/menu/menu';
import {checkStatus} from "../../utils/thermostatUtils.ts";
import {useFan} from "../../contexts/fan_context.tsx";
import {useCondenser} from "../../contexts/condenser_context.tsx";
import {useGeneralStates} from "../../contexts/general_context.tsx";
const Virtual_Thermostat = () => {
    const {mode, currentTemp, setTemp, setCurrentTemp, status, setStatus} = useGeneralStates();
    const {fanSetting, setFanStatus} = useFan();
    const {callForCooling, setCallForCooling} = useCondenser();
    const [menu, setMenu] = useState<number>(0);

    // Disable navigation state
    const [isNavigationActive, setIsNavigationActive] = useState<boolean>(true);

    const randomInt = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Artificially change the current temp to simulate real change
    useEffect(() => {
        let tempChange: NodeJS.Timeout;

        const adjustTemperature = () => {
            if (mode === Mode.Cool && currentTemp > setTemp) {
                tempChange = setInterval(() => {
                    setCurrentTemp((prevTemp: number) => prevTemp - 1);
                }, 10000);
            } else if (mode === Mode.Heat && currentTemp < setTemp) {
                tempChange = setInterval(() => {
                    setCurrentTemp((prevTemp: number) => prevTemp + 1);
                }, 10000);
            } else if (mode === Mode.Auto) {
                if (currentTemp < setTemp && status === SystemStatus.Heat) {
                    tempChange = setInterval(() => {
                        setCurrentTemp((prevTemp: number) => prevTemp + 1);
                    }, 10000);
                } else if (currentTemp > setTemp && status === SystemStatus.Cool) {
                    tempChange = setInterval(() => {
                        setCurrentTemp((prevTemp: number) => prevTemp - 1);
                    }, 10000);
                } else{
                    tempChange = setInterval(() => {
                        setCurrentTemp((prevTemp: number) => prevTemp - 2);
                    }, 10000);
                }
            }
        };

        adjustTemperature();

        checkStatus(mode, currentTemp, setTemp, status, fanSetting, setStatus, setFanStatus, setCallForCooling);

        return () => clearInterval(tempChange);
    }, [mode, currentTemp, setTemp, status]);

    // For auto mode only, constantly check current temp to determine when heating or cooling is required
    useEffect(() => {
        let checkTime: NodeJS.Timeout;

        if (mode === Mode.Auto) {
            checkTime = setInterval(() => {
                if (currentTemp < setTemp && status === SystemStatus.AtTemp) {
                    if (fanSetting === FanSetting.On) {
                        setStatus(SystemStatus.Wait);
                        setTimeout(() => {
                            setStatus(SystemStatus.Heat);
                            setCallForCooling(true);
                        }, 5000);
                    } else {
                        setStatus(SystemStatus.Wait);
                        setFanStatus(FanStatus.Wait);
                        setTimeout(() => {
                            setFanStatus(FanStatus.On);
                            setStatus(SystemStatus.Heat);
                            setCallForCooling(true);
                        }, 5000);
                    }
                }

                if (currentTemp > setTemp && status === SystemStatus.AtTemp) {
                    if (fanSetting === FanSetting.On) {
                        setStatus(SystemStatus.Wait);
                        setTimeout(() => {
                            setStatus(SystemStatus.Cool);
                            setCallForCooling(true);
                        }, 5000);
                    } else {
                        setStatus(SystemStatus.Wait);
                        setFanStatus(FanStatus.Wait);
                        setTimeout(() => {
                            setFanStatus(FanStatus.On);
                            setStatus(SystemStatus.Cool);
                            setCallForCooling(true);
                        }, 5000);
                    }
                }
            }, 5000);
        }

        return () => clearInterval(checkTime);
    }, [mode, currentTemp, setTemp, status, fanSetting, setFanStatus, setCallForCooling]);

    return (
        <>
            <div className={"thermostat-body"}>
                <div className={"thermostat-content"}>
                    <Navigation menu={menu} status={status} setMenu={setMenu} isNavigationActive={isNavigationActive}/>
                    {menu === 0 && (
                        <Home/>
                    )}
                    {menu === 1 && (
                        <Fan
                            setMenu={setMenu}
                        />
                    )}
                    {menu === 2 && (
                        <System setMenu={setMenu} />
                    )}
                    {menu === 3 && (
                        <Menu
                            setIsNavigationActive={setIsNavigationActive}
                        />
                    )}
                </div>
            </div>
            <div className={"led-displays"}>
                <LEDDisplay label="Condenser Status" isCooling={callForCooling} />
                <LEDDisplay label="Fan Status" />
            </div>
        </>

    )
}
export default Virtual_Thermostat;