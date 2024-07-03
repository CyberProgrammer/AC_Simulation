import './navigation.css'

import ThermostatButton from "@components/buttons/thermostat_button.tsx";
import React from "react";

interface NavigationProps{
    menu: number;
    setMenu: (val:number) => void;
    isNavigationActive: boolean;
}
const Navigation:React.FC<NavigationProps> = ({menu, setMenu, isNavigationActive}) => {

    const handleMenuClick = (val:number) => {
        setMenu(val);
    }

    return(
        <div className={"thermostat-header"}>
            <div className={"thermostat-button-container"}>
                <ThermostatButton
                    className={`thermostat-button ${menu === 0 ? 'selected' : ''}`}
                    clickEvent={() => handleMenuClick(0)}
                    isNavigationActive={isNavigationActive}
                    text={"Home"}
                />
                <ThermostatButton
                    className={`thermostat-button ${menu === 1 ? 'selected' : ''}`}
                    clickEvent={() => handleMenuClick(1)}
                    isNavigationActive={isNavigationActive}
                    text={"Fan"}
                />
                <ThermostatButton
                    className={`thermostat-button ${menu === 2 ? 'selected' : ''}`}
                    clickEvent={() => handleMenuClick(2)}
                    isNavigationActive={isNavigationActive}
                    text={"System"}
                />
                <ThermostatButton
                    className={`thermostat-button ${menu === 3 ? 'selected' : ''}`}
                    clickEvent={() => handleMenuClick(3)}
                    isNavigationActive={isNavigationActive}
                    text={"Menu"}
                />
            </div>
        </div>
    )
}

export default Navigation;