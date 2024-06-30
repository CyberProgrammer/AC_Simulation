import ArrowsLeftRight from "@components/prompts/controls/arrows_left_right.tsx";
import SelectPrompt from "@components/prompts/select_prompt.tsx";
import React, {useState} from "react";
import SetTimePrompt from "@components/prompts/set_time_prompt.tsx";
import SetDatePrompt from "@components/prompts/set_date_prompt.tsx";
import {useDatetimeStates} from "@contexts/datetime_context.tsx";
import {Months} from "@customTypes/enums.ts";

interface SelectTimeOrDate {
    setView: React.Dispatch<React.SetStateAction<number>>;
}
const SelectTimeOrDate:React.FC<SelectTimeOrDate> = ({setView}) => {
    const [prompted, setPrompted] = useState<boolean>(false);
    const [selected, setSelected] = useState<number>(0);

    const options = ["Time", "Date"];

    /* Navigating */
    const handleLeftClick = () => {
        if(selected != 0) setSelected(selected-1);
    }

    const handleRightClick = () => {
        if(selected != options.length-1) setSelected(selected+1);
    }

    const handleSelectClick = () => {
        setPrompted(true);
    }

    const handleCancelClick = () => {
        console.log(selected);
        setView(-1);
    }

    /* Setting time */
    const {manuallySetTime, manuallySetDate} = useDatetimeStates();
    const [timeSelect, setTimeSelect] = useState<number>(0);

    const [tempHour, setTempHour] = useState(0);
    const [tempMinute, setTempMinute] = useState(0);

    const handleDoneClickTime = () => {
        manuallySetTime(tempHour, tempMinute);
        setView(-1);
    }
    const handleLeftClickTime = () => {
        if(timeSelect != 0) setTimeSelect(timeSelect-1);
    }

    const handleRightClickTime = () => {
        if(timeSelect != 1) setTimeSelect(timeSelect+1);
    }

    /* Setting date */
    const [dateSelect, setDateSelect] = useState<number>(0);
    const [tempMonth, setTempMonth] = useState(Months.Jan);
    const [tempDay, setTempDay] = useState(1);
    const handleLeftClickDate = () => {
        if(dateSelect != 0) setDateSelect(dateSelect-1);
    }

    const handleRightClickDate = () => {
        if(dateSelect != 1) setDateSelect(dateSelect+1);
    }

    const handleDoneClickDate = () => {
        manuallySetDate(tempMonth, tempDay);
        setView(-1);
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
                    hour={tempHour}
                    setHour={setTempHour}
                    minute={tempMinute}
                    setMinute={setTempMinute}
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
                    month={tempMonth}
                    setMonth={setTempMonth}
                    day={tempDay}
                    setDay={setTempDay}
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