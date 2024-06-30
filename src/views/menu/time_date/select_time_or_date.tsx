import ArrowsLeftRight from "@components/prompts/controls/arrows_left_right.tsx";
import SelectPrompt from "@components/prompts/select_prompt.tsx";
import React, {useState} from "react";
import SetTimePrompt from "@components/prompts/set_time_prompt.tsx";
import SetDatePrompt from "@components/prompts/set_date_prompt.tsx";
import {useGeneralStates} from "@contexts/general_context.tsx";
import {formatTime} from "@utils/set_current_time.ts";
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
    const {manuallySetTime, manuallySetDate} = useDatetimeStates();
    const [timeSelect, setTimeSelect] = useState<number>(0);

    const [tempHour, setTempHour] = useState(0);
    const [tempMinute, setTempMinute] = useState(0);

    const handleDoneClickTime = () => {
        console.log("Done Click Time");
        manuallySetTime(tempHour, tempMinute);
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
    const [dateSelect, setDateSelect] = useState<number>(0);
    const [tempMonth, setTempMonth] = useState(Months.Jan);
    const [tempDay, setTempDay] = useState(1);
    const handleLeftClickDate = () => {
        console.log("Left Click");
        if(dateSelect != 0) setDateSelect(dateSelect-1);
    }

    const handleRightClickDate = () => {
        console.log("Right Click");
        if(dateSelect != 1) setDateSelect(dateSelect+1);
    }

    const handleDoneClickDate = () => {
        console.log("Done Click Date");
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