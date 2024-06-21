import '../styles/control_button.css';

interface ControlButtonParams{
    buttonClass: string;
    imageClass?: string;
    imageSource?: string;
    clickEvent: () => void;
    textClass?: string;
    text?: string;
}

const ControlButton = ({buttonClass, imageClass, imageSource, textClass, text, clickEvent}:ControlButtonParams) => {
    return (
        <button className={buttonClass} onClick={clickEvent}>
            {imageSource ?
                <img className={imageClass} src={imageSource} alt={"Button"}/>
                :
                <p className={textClass}>{text}</p>
            }
        </button>
    )
}

export default ControlButton;