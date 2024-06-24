import {useRef, useState } from 'react';

import TriangleUp from '../../assets/icons/triangle-up.svg';
import TriangleDown from '../../assets/icons/triangle-down.svg';

import './menu.css';
import ThermostatButton from "../../components/buttons/thermostat_button.tsx";
import ArrowButton from "../../components/buttons/arrow_button.tsx";
import {handleDown, handleSelect, handleUp} from "../../utils/settingsUtils/settingsUtils.ts";

const Menu = () => {
    const options = ["Edit Schedule", "View Schedule", "Equipment Status", "Date/Time", "Clean Screen", "Security Settings"];

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
                handleSelect();
        }
    }

    return(
        <>
            <div id={"menu-body"}>
                <div className={"menu-container"}>
                    <div className={"menu-home-body"}>
                        <div className={"menu-home-content"}>
                            <div className={"menu-options"} ref={scrollContainerRef}>
                                { options.length > 0 && options.map((option, index) => (
                                    <div key={index} className={`menu-option ${selected === index ? 'selected' : null}`}>
                                        <div className={"menu-option-row"}>
                                            <p className={"dotted-text"}>{option}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={"setting-controls"}>
                                <ArrowButton className={"temp-button"} isDisabled={selected === 0} clickEvent={() => handleClick(0)} icon={TriangleUp} />
                                <ArrowButton className={"temp-button"} isDisabled={selected === options.length - 1} clickEvent={() => handleClick(1)} icon={TriangleDown} />
                            </div>
                        </div>
                        <div className={"menu-home-controls"}>
                            <ThermostatButton className={"thermostat-button"} clickEvent={() => handleClick(2)} text={"Select"} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu;