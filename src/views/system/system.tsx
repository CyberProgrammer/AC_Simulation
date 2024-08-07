import {useState} from 'react';
import './system.css';
import {Mode} from '@customTypes/enums'
/* Assets */
import TriangleLeft from '@assets/icons/triangle-left.svg';
import TriangleRight from '@assets/icons/triangle-right.svg';
/* Components */
import ControlButton from '@components/buttons/control_button';
import SystemOption from "@components/option/system_option.tsx";
import HelpContainer from '@shared/help_container';

/* Utils */
import {handleNextClick} from "./utils/handleNextClick.ts";
import {handlePrevClick} from "./utils/handlePrevClick.ts";
import {handleDoneClick} from "./utils/handleDoneClick.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../state/store.ts";

interface SystemParams{
    setMenu: (menu: number) => void;
}
const System = ({setMenu}:SystemParams) => {
    const dispatch = useDispatch();
    const {currentTemp, setTemp, mode} = useSelector((state: RootState) => state.general);
    const fanSetting = useSelector((state: RootState) => state.fan.fanSetting);
    const callForCooling = useSelector((state: RootState) => state.condenser.callForCooling);

    const isFollowingSchedule = useSelector((state: RootState) => state.schedule.isFollowingSchedule);
    const [selectedSetting, setSelectedSetting] = useState<Mode>(mode);

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
                            clickEvent={() => handlePrevClick(selectedSetting, isFollowingSchedule, setSelectedSetting)}
                        />
                        <ControlButton
                            buttonClass={"done-control"}
                            textClass={"fan-control"}
                            text={"Done"}
                            clickEvent={() => handleDoneClick(
                                dispatch,
                                selectedSetting,
                                isFollowingSchedule,
                                mode,
                                setMenu,
                                callForCooling,
                                fanSetting,
                                setTemp,
                                currentTemp
                            )}
                        />
                        <ControlButton
                            buttonClass={"right-control"}
                            imageClass={"control-img"}
                            imageSource={TriangleRight}
                            clickEvent={() => handleNextClick(selectedSetting, isFollowingSchedule, setSelectedSetting)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default System;