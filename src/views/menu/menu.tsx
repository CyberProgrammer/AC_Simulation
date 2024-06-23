import {useRef, useState } from 'react';

import TriangleUp from '../../assets/icons/triangle-up.svg';
import TriangleDown from '../../assets/icons/triangle-down.svg';

import './menu.css';

const Menu = () => {
    const options = ["Edit Schedule", "View Schedule", "Equipment Status", "Date/Time", "Clean Screen", "Security Settings"];

    const [selected, setSelected] = useState<number>(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const handleUp = () => {
        const nextSelected = selected - 1;
        if (nextSelected >= 0) {
            setSelected(nextSelected);
            if ((nextSelected + 1) % 3 === 0) {
                scrollContainerRef.current?.scrollBy({ top: -75, behavior: 'smooth' });
            }
        }
    }

    const handleDown = () => {
        const nextSelected = selected + 1;
        if (nextSelected < options.length) {
            setSelected(nextSelected);
            if ((nextSelected) % 3 === 0) {
                scrollContainerRef.current?.scrollBy({ top: 75, behavior: 'smooth' });
            }
        }
    }

    const handleSelect = () => {
        console.log("Handle select...");
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
                                <button
                                    className={"temp-button"}
                                    disabled={selected === 0}
                                    onClick={handleUp}
                                >
                                    <img src={TriangleUp} alt={"Icon"}/>
                                </button>
                                <button
                                    className="temp-button"
                                    disabled={selected === options.length - 1}
                                    onClick={handleDown}
                                >
                                    <img src={TriangleDown} alt={"Icon"}/>
                                </button>
                            </div>
                        </div>
                        <div className={"menu-home-controls"}>
                            <button className={"thermostat-button"} onClick={handleSelect}>
                                Select
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu;