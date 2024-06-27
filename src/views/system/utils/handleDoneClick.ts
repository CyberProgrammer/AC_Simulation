import React from "react";

import {FanSetting, FanStatus, Mode, SystemStatus} from "@customTypes/enums.ts";
import {handleOffMode} from "@utils/system_handlers/handleOffMode.ts";
import {handleCoolMode} from "@utils/system_handlers/handleCoolMode.ts";
import {handleHeatMode} from "@utils/system_handlers/handleHeatMode.ts";
import {handleAutoMode} from "@utils/system_handlers/handleAutoMode.ts";

export const handleDoneClick =
    (
        selectedSetting:Mode,
        isFollowingSchedule:boolean,
        currentMode: Mode,
        setMode:(newMode:Mode) => void,
        setMenu: (menu: number) => void,
        callForCooling: boolean,
        fanSetting: FanSetting,
        setStatus: (status:SystemStatus) => void,
        setCallForCooling: React.Dispatch<React.SetStateAction<boolean>>,
        setFanStatus: (fanStatus: FanStatus) => void,
        setTemp: number,
        currentTemp: number
    ) => {

    console.log("Done click mode:", selectedSetting);
    if(isFollowingSchedule){
        return;
    }

    // If the selection is the current set mode, avoid transitioning to the same mode
    if(selectedSetting === currentMode){
        setMode(selectedSetting);
        setMenu(0);
        return;
    }

    switch (selectedSetting) {
        case Mode.Off:
            handleOffMode({callForCooling, fanSetting, setStatus, setCallForCooling, setFanStatus});
            break;
        case Mode.Cool:
            handleCoolMode({callForCooling, setTemp, currentTemp, fanSetting, setStatus, setCallForCooling, setFanStatus});
            break;
        case Mode.Heat:
            handleHeatMode({callForCooling, setTemp, currentTemp, fanSetting, setStatus, setCallForCooling, setFanStatus});
            break;
        case Mode.Auto:
            handleAutoMode({currentTemp, setTemp, fanSetting, setStatus, setCallForCooling, setFanStatus});
            break;
    }

    setMode(selectedSetting);
    setMenu(0);
};