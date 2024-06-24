import './navigation.css'

import {SystemStatus} from "../../types/enums";
import ThermostatButton from "../../components/buttons/thermostat_button.tsx";
import React from "react";

interface NavigationProps{
    menu: number;
    status: SystemStatus;
    setMenu: (val:number) => void;
}
const Navigation:React.FC<NavigationProps> = ({menu, setMenu}) => {

    const handleMenuClick = (val:number) => {
        setMenu(val);
    }

    return(
        <div className={"thermostat-header"}>
            <div className={"thermostat-button-container"}>
                <ThermostatButton className={`thermostat-button ${menu === 0 ? 'selected' : ''}`} clickEvent={() => handleMenuClick(0)} text={"Home"} />
                <ThermostatButton className={`thermostat-button ${menu === 1 ? 'selected' : ''}`} clickEvent={() => handleMenuClick(1)} text={"Fan"} />
                <ThermostatButton className={`thermostat-button ${menu === 2 ? 'selected' : ''}`} clickEvent={() => handleMenuClick(2)} text={"System"} />
                <ThermostatButton className={`thermostat-button ${menu === 3 ? 'selected' : ''}`} clickEvent={() => handleMenuClick(3)} text={"Menu"} />
            </div>
        </div>
    )
}

export default Navigation;