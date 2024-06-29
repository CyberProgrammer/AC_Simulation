import ArrowsLeftRight from "@components/prompts/controls/arrows_left_right.tsx";
import SelectPrompt from "@components/prompts/select_prompt.tsx";
import React, {useState} from "react";
import SetTimePrompt from "@components/prompts/set_time_prompt.tsx";
import SetDatePrompt from "@components/prompts/set_date_prompt.tsx";

interface SelectTimeOrDate {
    setView: React.Dispatch<React.SetStateAction<number>>;
}
const SelectTimeOrDate:React.FC<SelectTimeOrDate> = ({setView}) => {
    const [prompted, setPrompted] = useState<boolean>(false);
    const [selected, setSelected] = useState<number>(0);

    const options = ["Time", "Date"];

    /* Navigating */
    const handleLeftClick = () => {
        console.log("Left Click");
        if(selected != 0) setSelected(selected-1);
    }

    const handleRightClick = () => {
        console.log("Right Click");
        if(selected != options.length-1) setSelected(selected+1);
    }

    const handleSelectClick = () => {
        console.log("Select Click");
        console.log(selected);
        setPrompted(true);
    }

    const handleCancelClick = () => {
        console.log("Cancel Click");
        console.log(selected);
        setView(-1);
    }

    /* Setting time */
    const [timeSelect, setTimeSelect] = useState<number>(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const handleDoneClickTime = () => {
        console.log("Done Click");

        const setHour = hour <= 12 ?
            hour < 10 ?`0${hour}` : `${hour}`
            :
            hour-12 < 10 ? `0${hour-12}` : `${hour-12}`;

        const setMinute = minute < 10 ? `0${minute}` : `${minute}`;
        const setPeriod = hour < 12 ? "AM" : "PM";

        console.log(`Set time: ${setHour}:${setMinute} ${setPeriod}`)
        setView(-1);
    }
    const handleLeftClickTime = () => {
        console.log("Left Click");
        if(timeSelect != 0) setTimeSelect(timeSelect-1);
    }

    const handleRightClickTime = () => {
        console.log("Right Click");
        if(timeSelect != 1) setTimeSelect(timeSelect+1);
    }

    /* Setting date */
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [dateSelect, setDateSelect] = useState<number>(0);
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(1);

    const handleLeftClickDate = () => {
        console.log("Left Click");
        if(dateSelect != 0) setDateSelect(dateSelect-1);
    }

    const handleRightClickDate = () => {
        console.log("Right Click");
        if(dateSelect != 1) setDateSelect(dateSelect+1);
    }

    const handleDoneClickDate = () => {
        let dayPostfix;
        if(day === 1) dayPostfix = "st";
        else if(day === 2) dayPostfix = "nd";
        else if(day === 3) dayPostfix = "rd";
        else dayPostfix = "th";

        console.log(`Set date: ${months[month]} ${day}${dayPostfix}`)
    }

    return (
        <>
            { !prompted && (
                <SelectPrompt
                    prompt={"Select option"}
                    options={options}
                    selected={selected}
                    children={
                        <ArrowsLeftRight
                            handleLeftClick={handleLeftClick}
                            handleSelectClick={handleSelectClick}
                            handleCancelClick={handleCancelClick}
                            handleRightClick={handleRightClick}
                        />
                    }/>
            )}

            { prompted && selected == 0 && (
                <SetTimePrompt
                    prompt={"Please Set time"}
                    selected={timeSelect}
                    hour={hour}
                    setHour={setHour}
                    minute={minute}
                    setMinute={setMinute}
                    children={
                        <ArrowsLeftRight
                            handleLeftClick={handleLeftClickTime}
                            handleDoneClick={handleDoneClickTime}
                            handleCancelClick={handleCancelClick}
                            handleRightClick={handleRightClickTime}
                        />
                    }/>
            )}

            { prompted && selected == 1 && (
                <SetDatePrompt
                    prompt={"Please Set Date"}
                    selected={dateSelect}
                    month={month}
                    setMonth={setMonth}
                    day={day}
                    setDay={setDay}
                    children={
                        <ArrowsLeftRight
                            handleLeftClick={handleLeftClickDate}
                            handleDoneClick={handleDoneClickDate}
                            handleCancelClick={handleCancelClick}
                            handleRightClick={handleRightClickDate}
                        />
                    }/>
            )}
        </>
    )
}

export default SelectTimeOrDate;