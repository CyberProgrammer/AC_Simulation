import ThermostatButton from "@components/buttons/thermostat_button.tsx";

interface PromptControlsParams{
    handlePromptClick: (view:number) => void;
}

const PromptControlYN = ({handlePromptClick}: PromptControlsParams) => {

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
export default PromptControlYN;