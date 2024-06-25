import '../styles/thermostat_button.css'

interface ThermostatButtonParams{
    className: string;
    clickEvent: () => void;
    text: string;
    isNavigationActive?: boolean;
}
const ThermostatButton = ({className, clickEvent, text, isNavigationActive}: ThermostatButtonParams) => {
    let isDisabled = false;

    if(isNavigationActive === false){
        isDisabled = true;
    }

    return (
        <button
            className={className}
            disabled={isDisabled}
            onClick={clickEvent}>
            {isNavigationActive ? text : ""}
        </button>
    )
}

export default ThermostatButton;