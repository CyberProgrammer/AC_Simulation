import { useState } from 'react';
import './fan.css'

import TriangleLeft from '../../assets/icons/triangle-left.svg';
import TriangleRight from '../../assets/icons/triangle-right.svg';

interface FanProps{
    callForCooling: boolean;
    status: string;
    fanSetting: number;
    setFanSetting: (value:number) => void;
    setMenu: (value:number) => void;
}
const Fan = ({callForCooling, status, fanSetting, setFanSetting, setMenu}:FanProps) => {

    const [selectedSetting, setSelectedSetting] = useState(fanSetting);
    const handleNextClick = () =>{
        if(selectedSetting != 2)
            setSelectedSetting(selectedSetting+1);
    }
    const handlePrevClick = () =>{
        if(selectedSetting != 0)
            setSelectedSetting(selectedSetting-1);
    }

    const handleDoneClick = () => {
        setFanSetting(-1);
        setTimeout(() => {
            setFanSetting(selectedSetting);
        }, 5000);
        setMenu(0);
    }

    return(
        <>
            <div id={"fan-body"}>
                <div className={"help-col"}>
                    <button className={"help-button"}>
                        <p>Help</p>
                    </button>
                </div>
                <div className={"fan-settings"}>
                    <div className={"fan-options"}>
                        <p className={`fan-option ${selectedSetting === 0 ? 'selected' : ''}`}>On</p>
                        <p className={`fan-option ${selectedSetting === 1 ? 'selected' : ''}`}>Auto</p>
                        <p className={`fan-option ${selectedSetting === 2 ? 'selected' : ''}`}>Circ</p>
                    </div>
                    <div className={"menu-controls"}>
                        <button className={"left-control"} onClick={handlePrevClick}>
                            <img className={"control-img"} src={TriangleLeft} alt={"Prev"}/>
                        </button>
                        <button className={"done-control"} onClick={handleDoneClick}>
                            <p className={`fan-control`}>Done</p>
                        </button>
                        <button className={"right-control"} onClick={handleNextClick}>
                            <img className={"control-img"} src={TriangleRight} alt={"Next"}/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Fan;