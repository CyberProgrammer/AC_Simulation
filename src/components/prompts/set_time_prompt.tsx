import React, {ReactNode} from "react";
import '../styles/select-prompt.css'
import ArrowButton from "@components/buttons/arrow_button.tsx";
import TriangleUp from "@assets/icons/triangle-up.svg";
import TriangleDown from "@assets/icons/triangle-down.svg";

interface SetTimePromptParams {
    prompt: string;
    selected: number;
    hour: number;
    setHour: (hour: number) => void;
    minute: number;
    setMinute: (minute: number) => void;
    children?: ReactNode;
}

const SetTimePrompt:React.FC<SetTimePromptParams> = ({prompt, selected, hour, setHour, minute, setMinute, children}) => {

    const handleTimeUp = () => {
        selected === 0 ?
            hour === 23 ? setHour(0) : setHour(hour+1)
            :
            minute === 59 ? setMinute(0) : setMinute(minute+1);
    }

    const handleTimeDown = () => {
        selected === 0 ?
            hour === 0 ? setHour(23) : setHour(hour-1)
            :
            minute === 0 ? setMinute(59) : setMinute(minute-1);
    }

    return (
        <div className={"menu-container"}>
            <div className={"menu-body"}>
                <div className={"menu-content"}>
                    <div className={"select-menu-options"}>
                        <div className={"menu-option"}>
                            <p className={"dotted-text prompt"}>
                                {prompt}
                            </p>
                            <div id={"prompt-selectable"}>
                                <h3 className={selected === 0 ? "selected":""}>
                                    {hour <= 12 ?
                                        hour < 10 ? `0${hour}` : `${hour}`
                                            :  hour-12 < 10 ? `0${hour-12}` : `${hour-12}`}
                                </h3>
                                <h3>:</h3>
                                <h3 className={selected === 1 ? "selected":""}>
                                    {minute < 10 ? `0${minute}` : `${minute}`}
                                </h3>
                                <h3>{hour < 12 ? "AM" : "PM"}</h3>
                            </div>
                        </div>
                        <div className={"time-control"}>
                            <ArrowButton className={"arrow-button"} isDisabled={false}
                                         clickEvent={handleTimeUp} icon={TriangleUp}/>
                            <ArrowButton className={"arrow-button"} isDisabled={false}
                                         clickEvent={handleTimeDown} icon={TriangleDown}/>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default SetTimePrompt;