import '../styles/arrow_button.css'

interface ArrowButtonParams{
    className: string;
    isDisabled: boolean;
    clickEvent: () => void;
    icon: string;
}

const ArrowButton = ({className, isDisabled, clickEvent, icon}: ArrowButtonParams) => {

    return (
        <button
            className={className}
            disabled={isDisabled}
            onClick={clickEvent}
        >
            <img src={icon} alt={"Icon"}/>
        </button>
    )
}

export default ArrowButton;