import { useState } from 'react';
import TriangleLeft from '../../assets/icons/triangle-left.svg';
import TriangleRight from '../../assets/icons/triangle-right.svg';
import ControlButton from '../../components/buttons/control_button';
import HelpContainer from '../../shared/help_container';

import './system.css';
import {Mode, FanSetting, FanStatus, SystemStatus} from '../../types/enums'

interface SystemParams{
    currentTemp: number;
    setTemp: number;
    fanSetting: FanSetting;
    setFanStatus: (fanStatus: FanStatus) => void;
    mode: Mode;
    setMode: (mode: Mode) => void;
    setMenu: (menu: number) => void;
    callForCooling: boolean;
    setCallForCooling: (call:boolean) => void;
    setStatus: (status:SystemStatus) => void;
}
const System = ({setTemp, currentTemp, fanSetting, setFanStatus, mode, setMode, setMenu, callForCooling, setCallForCooling, setStatus}:SystemParams) => {

    const [selectedSetting, setSelectedSetting] = useState<Mode>(mode);
    console.log("Initial setting: ", mode);
    const handleNextClick = () =>{
        if(selectedSetting < Mode.Auto)
            setSelectedSetting(selectedSetting+1);
    }
    const handlePrevClick = () =>{
        if(selectedSetting != Mode.Heat)
            setSelectedSetting(selectedSetting-1);
    }

    const handleDoneClick = () => {
        // If setting to off
        if(selectedSetting as Mode === Mode.Off){
            // If cooling and fan is anything but auto, only turn off consender, set system status off
            if(callForCooling && fanSetting != FanSetting.Auto){
                setStatus(SystemStatus.Wait);
                setTimeout(() => {
                    setStatus(SystemStatus.Off);
                    setCallForCooling(false);
                }, 5000)
            } // If cooling and fan is auto, turn off consender and fan, set system status off
            else if(callForCooling && fanSetting === FanSetting.Auto){
                setStatus(SystemStatus.Wait);
                setFanStatus(FanStatus.Wait);
                setTimeout(() => {
                    setStatus(SystemStatus.Off);
                    setCallForCooling(false);
                    setFanStatus(FanStatus.Off);
                }, 5000)
            } // Else just turn system status to off
            else {
                setTimeout(() => {
                    setStatus(SystemStatus.Off);
                }, 1000)
            }
        }

        // If setting to cool
        if(selectedSetting as Mode === Mode.Cool){
            // If the fan is already on and set temp < current temp, turn the condenser on
            if(fanSetting === FanSetting.On && setTemp < currentTemp){
                setStatus(SystemStatus.Wait);
                setTimeout(() => {
                    setCallForCooling(true);
                    setStatus(SystemStatus.Cool);
                }, 5000)
            }
            // If the fan is on auto and set temp < current temp, turn the condenser and fan on
            if(fanSetting === FanSetting.Auto && setTemp < currentTemp){
                setStatus(SystemStatus.Wait);
                setFanStatus(FanStatus.Wait);
                setTimeout(() => {
                    setCallForCooling(true);
                    setFanStatus(FanStatus.On);
                    setStatus(SystemStatus.Cool);
                }, 5000)
            }
            // If set temp > current temp, only set status to at temp
            if(setTemp > currentTemp){
                setTimeout(() => {
                    setStatus(SystemStatus.AtTemp);
                }, 1000)
            }
        }

        setMode(selectedSetting as Mode);
        setMenu(0);
    }

    return(
        <>
            <div id={"system-body"}>
                <HelpContainer />
                <div className={"system-settings"}>
                    <div className={"system-options"}>
                        <p className={`system-option ${selectedSetting === 0 ? 'selected' : ''}`}>Heat</p>
                        <p className={`system-option ${selectedSetting === 1 ? 'selected' : ''}`}>Cool</p>
                        <p className={`system-option ${selectedSetting === 2 ? 'selected' : ''}`}>Off</p>
                        <p className={`system-option ${selectedSetting === 3 ? 'selected' : ''}`}>Auto</p>
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