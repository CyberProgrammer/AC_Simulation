import { useState } from 'react';
import './fan.css'

import {Mode, FanStatus, FanSetting} from '../../types/enums';

import TriangleLeft from '../../assets/icons/triangle-left.svg';
import TriangleRight from '../../assets/icons/triangle-right.svg';
import HelpContainer from '../../shared/help_container';
import ControlButton from '../../components/buttons/control_button';

interface FanProps{
    callForCooling: boolean;
    fanSetting: FanSetting;
    setFanSetting: (value:number) => void;
    setFanStatus: (value:FanStatus) => void;
    setMenu: (value:Mode) => void;
}
const Fan = ({callForCooling, fanSetting, setFanSetting, setMenu, setFanStatus}:FanProps) => {

    const [selectedSetting, setSelectedSetting] = useState<FanSetting>(fanSetting);
    const handleNextClick = () =>{
        if(selectedSetting != 2)
            setSelectedSetting(selectedSetting+1);
    }
    const handlePrevClick = () =>{
        if(selectedSetting != 0)
            setSelectedSetting(selectedSetting-1);
    }

    const handleDoneClick = () => {
        console.log("Selected Setting: ", selectedSetting);
        console.log("Fan Setting: ", fanSetting);

        // Auto -> On || Auto -> Circ
        if(fanSetting === 1 && selectedSetting === 0 || fanSetting === 1 && selectedSetting === 2){
            if(!callForCooling)
                setFanStatus(FanStatus.Wait);

            setTimeout(() => {
                setFanStatus(FanStatus.On);
            }, 5000);
        }

        // On -> Auto || Circ -> Auto
        else if(fanSetting === 0 && selectedSetting === 1 || fanSetting === 2 && selectedSetting === 1){
            if(!callForCooling)
                setFanStatus(FanStatus.Wait);

            setTimeout(() => {
                if(!callForCooling)
                    setFanStatus(FanStatus.Off);
            }, 5000)
        }

        setFanSetting(selectedSetting);
        setMenu(0);
    }

    return(
        <>
            <div id={"fan-body"}>
                <HelpContainer />
                <div className={"fan-settings"}>
                    <div className={"fan-options"}>
                        <p className={`fan-option dotted-text ${selectedSetting === 0 ? 'selected' : ''}`}>On</p>
                        <p className={`fan-option dotted-text ${selectedSetting === 1 ? 'selected' : ''}`}>Auto</p>
                        <p className={`fan-option dotted-text ${selectedSetting === 2 ? 'selected' : ''}`}>Circ</p>
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

export default Fan;