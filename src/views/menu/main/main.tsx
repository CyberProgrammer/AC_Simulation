import ArrowButton from "../../../components/buttons/arrow_button.tsx";
import TriangleUp from "../../../assets/icons/triangle-up.svg";
import TriangleDown from "../../../assets/icons/triangle-down.svg";
import ThermostatButton from "../../../components/buttons/thermostat_button.tsx";
import React, {useRef, useState} from "react";
import {handleDown, handleSelect, handleUp} from "../../../utils/settingsUtils/settingsUtils.ts";
import {useSchedule} from "../../../contexts/schedule_context.tsx";

interface MainParams{
    setView: React.Dispatch<React.SetStateAction<number>>;
    setIsNavigationActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const Main = ({setView, setIsNavigationActive}: MainParams) => {
    const {isScheduleSet} = useSchedule();

    let options;
    // If schedule is set include the option to remove schedule
    if(isScheduleSet)
        options = ["Edit Schedule", "Remove Schedule", "Equipment Status", "Date/Time", "Clean Screen", "Security Settings"];
    else
        options = ["Edit Schedule", "Equipment Status", "Date/Time", "Clean Screen", "Security Settings"];

    const [selected, setSelected] = useState<number>(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Button click logic
    const handleClick = (id:number) => {
        switch (id){
            case 0:
                handleUp(selected, setSelected, scrollContainerRef);
                break;
            case 1:
                handleDown(selected, options.length, setSelected, scrollContainerRef);
                break;
            case 2:
                // If the schedule is set and not 0 (Edit schedule), skip to the next index
                handleSelect(isScheduleSet || selected === 0 ? selected : selected + 1, setView, setIsNavigationActive);
                console.log("Switching to option:", options[selected]);
                break;
        }
    }

    return (
        <div className={"menu-container"}>
            <div className={"menu-body"}>
                <div className={"menu-content"}>
                    <div className={"menu-options"} ref={scrollContainerRef}>
                        {options.length > 0 && options.map((option, index) => (
                            <div key={index} className={`menu-option ${selected === index ? 'selected' : null}`}>
                                <div className={"menu-option-row"}>
                                    <p className={"dotted-text"}>{option}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={"setting-controls"}>
                        <ArrowButton className={"temp-button"} isDisabled={selected === 0}
                                     clickEvent={() => handleClick(0)} icon={TriangleUp}/>
                        <ArrowButton className={"temp-button"} isDisabled={selected === options.length - 1}
                                     clickEvent={() => handleClick(1)} icon={TriangleDown}/>
                    </div>
                </div>
                <div className={"menu-controls"}>
                    <ThermostatButton
                        className={"thermostat-button"}
                        clickEvent={() => handleClick(2)}
                        isNavigationActive={true}
                        text={"Select"}
                    />
                </div>
            </div>
        </div>
    )
}

export default Main;