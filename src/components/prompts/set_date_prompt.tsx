import React, {ReactNode} from "react";
import '../styles/select-prompt.css'
import ArrowButton from "@components/buttons/arrow_button.tsx";
import TriangleUp from "@assets/icons/triangle-up.svg";
import TriangleDown from "@assets/icons/triangle-down.svg";

interface SetDatePromptParams {
    prompt: string;
    selected: number;
    month: number;
    setMonth: (month: number) => void;
    day: number;
    setDay: (day: number) => void;
    children?: ReactNode;
}

const SetDatePrompt:React.FC<SetDatePromptParams> = ({prompt, selected, month, setMonth, day, setDay, children}) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function leapYear(year:number)
    {
        return (year & 3) == 0 && ((year % 25) != 0 || (year & 15) == 0);
    }

    const maxDays = [31, leapYear(new Date().getFullYear()) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30,31];

    const handleDateUp = () => {
        console.log("Date up");
        if(selected === 0)
            month === months.length-1 ? setMonth(0) : setMonth(month+1);
        else
            day === maxDays[month] ? setDay(1) : setDay(day+1);
    }

    const handleDateDown = () => {
        console.log("Date down");
        if(selected === 0)
            month === 0 ? setMonth(months.length - 1) : setMonth(month-1);
        else
            day === 1 ? setDay(maxDays[month]) : setDay(day-1);
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
                                    {months[month]}
                                </h3>
                                <h3 className={selected === 1 ? "selected":""}>
                                    {day < 10 ? `0${day}` : `${day}`}
                                </h3>
                            </div>
                        </div>
                        <div className={"time-control"}>
                            <ArrowButton className={"arrow-button"} isDisabled={false}
                                         clickEvent={handleDateUp} icon={TriangleUp}/>
                            <ArrowButton className={"arrow-button"} isDisabled={false}
                                         clickEvent={handleDateDown} icon={TriangleDown}/>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default SetDatePrompt;