import {FanSetting, FanStatus, SystemStatus} from "@customTypes/enums.ts";
import {Dispatch} from "redux";
import {setStatus} from "../../../state/slices/generalSlice.ts";
import {setFanStatus} from "../../../state/slices/fanSlice.ts";

/*
    Change status is responsible for keeping the condenser and fan status
    updated when the set temperature controls are adjusted.
*/
export const changeStatus = (
    updateStatus: SystemStatus,
    fanSetting: FanSetting,
    dispatch: Dispatch,
    ) => {

    dispatch(setStatus(SystemStatus.Wait));
    // If the fan is on auto, the fan follows the condenser status.
    // When the compressor is on, the fan is on. When the compressor is off, the fan is off.
    // Each time a change in status occurs and the fan is on auto, the fan status is yellow.
    if ((updateStatus === SystemStatus.Cool || updateStatus === SystemStatus.AtTemp || updateStatus === SystemStatus.Heat) && fanSetting === FanSetting.Auto) {
        dispatch(setFanStatus(FanStatus.Wait));
    }

    setTimeout(() => {
        if (updateStatus === SystemStatus.Cool || updateStatus === SystemStatus.Heat) {
            dispatch(setFanStatus(FanStatus.On));
        } else if (updateStatus === SystemStatus.AtTemp && fanSetting === FanSetting.Auto) {
            dispatch(setFanStatus(FanStatus.Off));
        }

        dispatch(setStatus(updateStatus));
    }, 5000);
};