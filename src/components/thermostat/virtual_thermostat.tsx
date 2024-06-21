import {useEffect, useState } from 'react';
import Navigation from '../../views/navigation/navigation';
import Home from '../../views/home/home';
import Fan from '../../views/fan/fan';

import RedLed from '../../assets/icons/red_led.svg';
import GreenLed from '../../assets/icons/green_led.svg';
import YellowLed from "../../assets/icons/yellow_led.svg";

const Virtual_Thermostat = () => {
    const [menu, setMenu] = useState<number>(0);

    // Home states
    const [currentTemp, setCurrentTemp] = useState<number>(72);
    const [setTemp, setSetTemp] = useState<number>(73);

    // Fan states (0: on, 1:auto, 2:circ)
    const [fanSetting, setFanSetting] = useState<number>(1);

    // Fan status (0: off, 1: on, 2: wait)
    const [fanStatus, setFanStatus] = useState<number>(0);

    // Mode states (0: off, 1:cool, 2:heat)
    const [mode, setMode] = useState<number>(0);

    // General states
    const [callForCooling, setCallForCooling] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(callForCooling ? "Cool" : currentTemp <= setTemp ? "At Temp" : "Wait");

    return (
        <>
            <div className={"thermostat-body"}>
                <div className={"thermostat-content"}>
                    <Navigation menu={menu} setMenu={setMenu}/>
                    {menu === 0 ?
                        <Home
                            callForCooling={callForCooling}
                            setCallForCooling={setCallForCooling}
                            currentTemp={currentTemp}
                            setCurrentTemp={setCurrentTemp}
                            setTemp={setTemp}
                            setSetTemp={setSetTemp}
                            fanSetting={fanSetting}
                            fanStatus={fanStatus}
                            setFanStatus={setFanStatus}
                            status={status}
                            setStatus={setStatus}
                        /> : null}
                    {menu === 1 ?
                        <Fan
                            callForCooling={callForCooling}
                            status={status}
                            fanSetting={fanSetting}
                            setFanSetting={setFanSetting}
                            fanStatus={fanStatus}
                            setFanStatus={setFanStatus}
                            mode={mode}
                            setMenu={setMenu}
                        /> : null}
                    {menu === 2 ? <h1>System</h1> : null}
                    {menu === 3 ? <h1>Menu</h1> : null}
                </div>
            </div>
            <div className={"led-displays"}>
                <div className={"display"}>
                    <p>Condenser Status: </p>
                    <img src={status === "Wait" ? YellowLed : callForCooling ? GreenLed : RedLed} alt={"led"}/>
                </div>
                <div className={"display"}>
                    <p>Fan Status: </p>
                    {fanStatus === 2 ?
                        <img src={YellowLed} alt={"Led"}/> : null
                    }

                    {fanStatus === 0 ?
                        <img src={RedLed} alt={"Led"}/> : null
                    }

                    {fanStatus === 1 ?
                        <img src={GreenLed} alt={"Led"}/> : null
                    }
                </div>
            </div>
        </>

    )
}
export default Virtual_Thermostat;