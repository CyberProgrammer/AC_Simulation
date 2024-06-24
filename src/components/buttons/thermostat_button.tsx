
interface ThermostatButtonParams{
    className: string;
    clickEvent: () => void;
    text: string;
}
const ThermostatButton = ({className, clickEvent, text}: ThermostatButtonParams) => {

    return (
        <button
            className={className}
            onClick={clickEvent}>
            {text}
        </button>
    )
}

export default ThermostatButton;