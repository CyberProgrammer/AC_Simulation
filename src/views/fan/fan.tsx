import { useState } from 'react';
import './fan.css'

import TriangleLeft from '../../assets/icons/triangle-left.svg';
import TriangleRight from '../../assets/icons/triangle-right.svg';

interface FanProps{
    callForCooling: boolean;
    status: string;
    fanSetting: number;
    setFanSetting: (value:number) => void;
    fanStatus: number;
    setFanStatus: (value:number) => void;
    mode: number;
    setMenu: (value:number) => void;
}
const Fan = ({callForCooling, status, fanSetting, setFanSetting, setMenu, fanStatus, setFanStatus, mode}:FanProps) => {

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
        console.log("Selected Setting: ", selectedSetting);
        console.log("Fan Setting: ", fanSetting);

        // Auto -> On
        if(fanSetting === 1 && selectedSetting === 0){
            if(!callForCooling)
                setFanStatus(2);

            setTimeout(() => {
                setFanStatus(1);
            }, 5000);
        }

        // On -> Auto
        else if(fanSetting === 0 && selectedSetting === 1){
            if(!callForCooling)
                setFanStatus(2);

            setTimeout(() => {
                if(!callForCooling)
                    setFanStatus(0);
            }, 5000)
        }

        setFanSetting(selectedSetting);
        setMenu(0);
    }

    // // Fan logic on cooling state change
    // useEffect(() => {
    //     console.log("Call for cooling change");
    //     // Regardless of fan setting, if cooling is called, fan is on
    //     if(callForCooling){
    //         setFanStatus(2);
    //         setTimeout(() => {
    //             setFanStatus(1);
    //         }, 5000)
    //     } // If no call for cooling and the fan is not set to on, turn off
    //     else if(!callForCooling){
    //         setFanStatus(2);
    //         setTimeout(() => {
    //             setFanStatus(0);
    //         }, 5000)
    //     }
    //
    // }, [setCallForCooling]);

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