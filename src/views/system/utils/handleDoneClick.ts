import React from "react";

import {FanSetting, Mode} from "@customTypes/enums.ts";
import {handleOffMode} from "@utils/system_handlers/handleOffMode.ts";
import {handleCoolMode} from "@utils/system_handlers/handleCoolMode.ts";
import {handleHeatMode} from "@utils/system_handlers/handleHeatMode.ts";
import {handleAutoMode} from "@utils/system_handlers/handleAutoMode.ts";
import {Dispatch} from "redux";
import {setMode} from "../../../state/slices/generalSlice.ts";

export const handleDoneClick =
    (
        dispatch: Dispatch,
        selectedSetting:Mode,
        isFollowingSchedule:boolean,
        currentMode: Mode,
        setMenu: (menu: number) => void,
        callForCooling: boolean,
        fanSetting: FanSetting,
        setCallForCooling: React.Dispatch<React.SetStateAction<boolean>>,
        setTemp: number,
        currentTemp: number
    ) => {

    console.log("Done click mode:", selectedSetting);
    if(isFollowingSchedule){
        return;
    }

    // If the selection is the current set mode, avoid transitioning to the same mode
    if(selectedSetting === currentMode){
        dispatch(setMode(selectedSetting));
        setMenu(0);
        return;
    }

    switch (selectedSetting) {
        case Mode.Off:
            handleOffMode({dispatch, callForCooling, fanSetting, setCallForCooling});
            break;
        case Mode.Cool:
            handleCoolMode({dispatch, callForCooling, setTemp, currentTemp, fanSetting, setCallForCooling});
            break;
        case Mode.Heat:
            handleHeatMode({dispatch, callForCooling, setTemp, currentTemp, fanSetting, setCallForCooling});
            break;
        case Mode.Auto:
            handleAutoMode({dispatch, currentTemp, setTemp, fanSetting, setCallForCooling});
            break;
    }

    setMode(selectedSetting);
    setMenu(0);
};