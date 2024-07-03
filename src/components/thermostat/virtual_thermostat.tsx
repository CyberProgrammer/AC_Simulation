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

// Redux
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../state/store.ts";
import {setCurrentTemp, setStatus} from "../../state/slices/generalSlice.ts";

const Virtual_Thermostat = () => {
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.general.mode);
    const currentTemp = useSelector((state: RootState) => state.general.currentTemp);
    const setTemp = useSelector((state: RootState) => state.general.setTemp);
    const status =  useSelector((state: RootState) => state.general.status);

    const {fanSetting, setFanStatus} = useFan();
    const {callForCooling, setCallForCooling} = useCondenser();

    const [menu, setMenu] = useState<number>(0);

    // Disable navigation state
    const [isNavigationActive, setIsNavigationActive] = useState<boolean>(true);

    // Redux
    const increaseTemp = (temp: number) => {
        dispatch(setCurrentTemp(temp + 1));
    }

    const decreaseTemp = (temp: number) => {
        dispatch(setCurrentTemp(temp - 1));
    }

    const changeStatus = (newStatus: SystemStatus) => {
        dispatch(setStatus(newStatus));
    }

    // Artificially change the current temp to simulate real change
    useEffect(() => {
        let tempChange: NodeJS.Timeout;

        const adjustTemperature = () => {
            if (mode === Mode.Cool && currentTemp > setTemp) {
                tempChange = setInterval(() => {
                    decreaseTemp(currentTemp);
                }, 10000);
            } else if (mode === Mode.Heat && currentTemp < setTemp) {
                tempChange = setInterval(() => {
                    increaseTemp(currentTemp);
                }, 10000);
            } else if (mode === Mode.Auto) {
                if (currentTemp < setTemp && status === SystemStatus.Heat) {
                    tempChange = setInterval(() => {
                        increaseTemp(currentTemp);
                    }, 10000);
                } else if (currentTemp > setTemp && status === SystemStatus.Cool) {
                    tempChange = setInterval(() => {
                        decreaseTemp(currentTemp);
                    }, 10000);
                } else {
                    tempChange = setInterval(() => {
                        decreaseTemp(currentTemp);
                    }, 10000);
                }
            }
        };

        adjustTemperature();

        checkStatus(dispatch, mode, currentTemp, setTemp, status, fanSetting, setFanStatus, setCallForCooling);

        return () => clearInterval(tempChange);
    }, [mode, currentTemp, setTemp, status]);

    // For auto mode only, constantly check current temp to determine when heating or cooling is required
    useEffect(() => {
        let checkTime: NodeJS.Timeout;

        if (mode === Mode.Auto) {
            checkTime = setInterval(() => {
                if (currentTemp < setTemp && status === SystemStatus.AtTemp) {
                    if (fanSetting === FanSetting.On) {
                        changeStatus(SystemStatus.Wait);
                        setTimeout(() => {
                            changeStatus(SystemStatus.Heat);
                            setCallForCooling(true);
                        }, 5000);
                    } else {
                        changeStatus(SystemStatus.Wait);
                        setFanStatus(FanStatus.Wait);
                        setTimeout(() => {
                            setFanStatus(FanStatus.On);
                            changeStatus(SystemStatus.Heat);
                            setCallForCooling(true);
                        }, 5000);
                    }
                }

                if (currentTemp > setTemp && status === SystemStatus.AtTemp) {
                    if (fanSetting === FanSetting.On) {
                        changeStatus(SystemStatus.Wait);
                        setTimeout(() => {
                            changeStatus(SystemStatus.Cool);
                            setCallForCooling(true);
                        }, 5000);
                    } else {
                        changeStatus(SystemStatus.Wait);
                        setFanStatus(FanStatus.Wait);
                        setTimeout(() => {
                            setFanStatus(FanStatus.On);
                            changeStatus(SystemStatus.Cool);
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
            <div id={"main-container"}>
                <div className={"thermostat-body"}>
                    <div className={"thermostat-content"}>
                        <Navigation menu={menu} status={status} setMenu={setMenu}
                                    isNavigationActive={isNavigationActive}/>
                        {menu === 0 && (
                            <Home/>
                        )}
                        {menu === 1 && (
                            <Fan
                                setMenu={setMenu}
                            />
                        )}
                        {menu === 2 && (
                            <System setMenu={setMenu}/>
                        )}
                        {menu === 3 && (
                            <Menu
                                setIsNavigationActive={setIsNavigationActive}
                            />
                        )}
                    </div>
                </div>
                <div className={"led-displays"}>
                    <div className={"led-display-container"}>
                        <h3 className={"digital-text heading"}>Led Status Indicators</h3>
                        <LEDDisplay label="Condenser Status" isCooling={callForCooling}/>
                        <LEDDisplay label="Fan Status"/>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Virtual_Thermostat;