import ThermostatButton from "@components/buttons/thermostat_button.tsx";
import ScheduleDaysControl from "@components/prompts/controls/schedule_days.tsx";
import React from "react";

interface SetScheduleDaysParams{
    setView: React.Dispatch<React.SetStateAction<number>>;
    setIsNavigationActive: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentView: React.Dispatch<React.SetStateAction<number>>;
}
const SetScheduleDays = ({setView, setIsNavigationActive, setCurrentView}: SetScheduleDaysParams) => {
    const handleButtonClick = (id:number) => {
        console.log("ID:", id);
        switch (id){
            case 1:
                setIsNavigationActive(true);
                setView(-1);
                break;
            case 2:
                setCurrentView(1);
                break;
        }
    }

    return (
        <div className={"menu-container"}>
            <div className={"menu-body"}>
                <div className={"menu-content"}>
                    <div className={"menu-options"}>
                        <div className={"menu-option"}>
                            <p className={"dotted-text prompt"}>Select the days to schedule</p>
                        </div>
                    </div>
                </div>
                <div className={"schedule-controls"}>
                    <div className={"control-left"}></div>
                    <div className={"control-right"}>
                        <ThermostatButton
                            className={"thermostat-button"}
                            clickEvent={() => handleButtonClick(1)}
                            isNavigationActive={true}
                            text={"Cancel"}
                        />
                        <ThermostatButton
                            className={"thermostat-button"}
                            clickEvent={() => handleButtonClick(2)}
                            isNavigationActive={true}
                            text={"Next"}
                        />
                    </div>
                </div>
            </div>
            <div className={"schedule-time-controls"}></div>
            <ScheduleDaysControl/>
        </div>
    )
}

export default SetScheduleDays;