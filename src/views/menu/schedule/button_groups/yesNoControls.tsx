import ThermostatButton from "../../../../components/buttons/thermostat_button.tsx";
import React from "react";

interface ControlsParams{
    handlePromptClick: (view:number) => void;
}

const YesNoControls = ({handlePromptClick}: ControlsParams) => {

    return (
        <div className={"schedule-controls"}>
            <div className={"control-left"}>
                <ThermostatButton
                    className={"thermostat-button"}
                    clickEvent={() => handlePromptClick(0)}
                    isNavigationActive={true}
                    text={"No"}
                />
            </div>
            <div className={"control-right"}>
                <ThermostatButton
                    className={"thermostat-button"}
                    clickEvent={() => handlePromptClick(1)}
                    isNavigationActive={true}
                    text={"Cancel"}
                />
                <ThermostatButton
                    className={"thermostat-button"}
                    clickEvent={() => handlePromptClick(2)}
                    isNavigationActive={true}
                    text={"Yes"}
                />
            </div>
        </div>
    )
}

export default YesNoControls;