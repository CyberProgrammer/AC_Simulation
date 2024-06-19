import { useState } from 'react';
import Navigation from '../../views/navigation/navigation';
import Home from '../../views/home/home';
import RedLed from '../../assets/icons/red_led.svg';
import GreenLed from '../../assets/icons/green_led.svg';
import YellowLed from "../../assets/icons/yellow_led.svg";

const Virtual_Thermostat = () => {
    const [menu, setMenu] = useState<number>(0);
    const [currentTemp, setCurrentTemp] = useState<number>(72);
    const [setTemp, setSetTemp] = useState<number>(73);
    const [callForCooling, setCallForCooling] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(callForCooling ? "Cool" : currentTemp <= setTemp ? "At Temp" : "Wait");

    return (
        <>
            <div className={"thermostat-body"}>
                <div className={"thermostat-content"}>
                    <Navigation setMenu={setMenu}/>
                    {menu === 0 ?
                        <Home
                            callForCooling={callForCooling}
                            currentTemp={currentTemp}
                            setCurrentTemp={setCurrentTemp}
                            setTemp={setTemp}
                            setSetTemp={setSetTemp}
                            setCallForCooling={setCallForCooling}
                            status={status}
                            setStatus={setStatus}
                        /> : null}
                    {menu === 1 ? <h1>Fan</h1> : null}
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
                    <img src={GreenLed} alt={"led"}/>
                </div>
            </div>
        </>

    )
}
export default Virtual_Thermostat;