import {useState} from 'react';
import TriangleLeft from '../../assets/icons/triangle-left.svg';
import TriangleRight from '../../assets/icons/triangle-right.svg';
import ControlButton from '../../components/buttons/control_button';
import HelpContainer from '../../shared/help_container';

import './system.css';
import {Mode} from '../../types/enums'
import {useFan} from "../../contexts/fan_context.tsx";
import {useGeneralStates} from "../../contexts/general_context.tsx";
import {useCondenser} from "../../contexts/condenser_context.tsx";

import { handleOffMode } from '../../utils/system_handlers/handleOffMode.ts';
import { handleCoolMode } from '../../utils/system_handlers/handleCoolMode';
import { handleHeatMode } from '../../utils/system_handlers/handleHeatMode';
import { handleAutoMode } from '../../utils/system_handlers/handleAutoMode';
import SystemOption from "../../components/option/system_option.tsx";
import {useSchedule} from "../../contexts/schedule_context.tsx";

interface SystemParams{
    setMenu: (menu: number) => void;
}
const System = ({setMenu}:SystemParams) => {

    const {currentTemp, setTemp, mode, setMode, setStatus} = useGeneralStates();
    const {callForCooling, setCallForCooling} = useCondenser();
    const {fanSetting, setFanStatus} = useFan();
    const {isFollowingSchedule} = useSchedule();
    const [selectedSetting, setSelectedSetting] = useState<Mode>(mode);
    const handleNextClick = () =>{
        if(selectedSetting < Mode.Auto && !isFollowingSchedule)
            setSelectedSetting(selectedSetting+1);
    }
    const handlePrevClick = () =>{
        if(selectedSetting != Mode.Heat && !isFollowingSchedule)
            setSelectedSetting(selectedSetting-1);
    }
    const handleDoneClick = () => {
        console.log("Done click mode:", selectedSetting);
        if(isFollowingSchedule){
            return;
        }

        // If the selection is the current set mode, avoid transitioning to the same mode
        if(selectedSetting === mode){
            setMode(selectedSetting);
            setMenu(0);
            return;
        }

        switch (selectedSetting) {
            case Mode.Off:
                handleOffMode({callForCooling, fanSetting, setStatus, setCallForCooling, setFanStatus,});
                break;
            case Mode.Cool:
                handleCoolMode({setTemp, currentTemp, fanSetting, callForCooling, setStatus, setCallForCooling, setFanStatus,});
                break;
            case Mode.Heat:
                handleHeatMode({setTemp, currentTemp, fanSetting, callForCooling, setStatus, setCallForCooling, setFanStatus,});
                break;
            case Mode.Auto:
                handleAutoMode({currentTemp, setTemp, fanSetting, setStatus, setCallForCooling, setFanStatus,});
                break;
        }

        setMode(selectedSetting);
        setMenu(0);
    };

    return(
        <>
            <div id={"system-body"}>
                <HelpContainer />
                <div className={"system-settings"}>
                    <div className={"system-options"}>
                        <SystemOption className={"system-option dotted-text"} selectedSetting={selectedSetting} selectedVal={0} text={"Heat"} />
                        <SystemOption className={"system-option dotted-text"} selectedSetting={selectedSetting} selectedVal={1} text={"Cool"} />
                        <SystemOption className={"system-option dotted-text"} selectedSetting={selectedSetting} selectedVal={2} text={"Off"} />
                        <SystemOption className={"system-option dotted-text"} selectedSetting={selectedSetting} selectedVal={3} text={"Auto"} />
                    </div>
                    <div className={"menu-controls"}>
                        <ControlButton
                            buttonClass={"left-control"}
                            imageClass={"control-img"}
                            imageSource={TriangleLeft}
                            clickEvent={handlePrevClick}
                        />
                        <ControlButton
                            buttonClass={"done-control"}
                            textClass={"fan-control"}
                            text={"Done"}
                            clickEvent={handleDoneClick}
                        />
                        <ControlButton
                            buttonClass={"right-control"}
                            imageClass={"control-img"}
                            imageSource={TriangleRight}
                            clickEvent={handleNextClick}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default System;