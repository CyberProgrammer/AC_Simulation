import Thermostat from './assets/Thermostat.png'

import './App.css'
import {useState} from "react";

function App() {
    const [currentTemp, setCurrentTemp] = useState<number>(75);
    const [setTemp, setSetTemp] = useState<number>(73);
    const [menu, setMenu] = useState<number>(1);
    const [mode, setMode] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState(0);

    return (
        <>
            <div id={"app"}>
                <h1>Digital Thermostat</h1>
                <div className={"thermostat-body"}>
                    <div className={"thermostat-content"}>
                        <div className={"thermostat-header"}>
                            <div className={"thermostat-button-container"}>
                                <button className={"thermostat-button"}>Home</button>
                                <button className={"thermostat-button"}>Fan</button>
                                <button className={"thermostat-button"}>System</button>
                                <button className={"thermostat-button"}>Menu</button>
                            </div>
                        </div>
                        <div className={"thermostat-textbox"}>
                            <h2>System: Cool</h2>
                            <h2>Outdoor: 80&#176;/55%</h2>
                        </div>
                        <div className={"thermostat-info"}>
                            <h1>{currentTemp}&#176;</h1>
                        </div>
                    </div>
                    {/*<img className={"thermostat"} src={Thermostat} alt={"Image"}/>*/}
                </div>
            </div>
        </>
    )
}

export default App
