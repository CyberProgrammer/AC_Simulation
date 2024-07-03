import { useState } from 'react';
import './fan.css'

import {Mode, FanSetting} from '@customTypes/enums';

import TriangleLeft from '@assets/icons/triangle-left.svg';
import TriangleRight from '@assets/icons/triangle-right.svg';
import HelpContainer from '@shared/help_container';
import ControlButton from '@components/buttons/control_button';

/* Contexts */
import {handleDoneClick} from "./utils/handleDoneClick.ts";
import {useCondenser} from "@contexts/condenser_context.tsx";
import {handleNextClick} from "./utils/handleNextClick.ts";
import {handlePrevClick} from "./utils/handlePrevClick.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../state/store.ts";

interface FanProps{
    setMenu: (value:Mode) => void;
}
const Fan = ({setMenu}:FanProps) => {
    const {callForCooling} = useCondenser();

    const dispatch = useDispatch();
    const fanSetting = useSelector((state: RootState) => state.fan.fanSetting);

    const [selectedSetting, setSelectedSetting] = useState<FanSetting>(fanSetting);

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
                            clickEvent={() => handlePrevClick({selectedSetting, setSelectedSetting})}
                        />
                        <ControlButton
                            buttonClass={"done-control"}
                            textClass={"fan-control"}
                            text={"Done"}
                            clickEvent={() =>
                                handleDoneClick({ dispatch, selectedSetting, setMenu, callForCooling, fanSetting})}
                        />
                        <ControlButton
                            buttonClass={"right-control"}
                            imageClass={"control-img"}
                            imageSource={TriangleRight}
                            clickEvent={() => handleNextClick({selectedSetting, setSelectedSetting})}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Fan;