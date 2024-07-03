import {FanSetting, FanStatus, Mode} from "@customTypes/enums.ts";
import {Dispatch} from "redux";
import {setFanSetting, setFanStatus} from "../../../state/slices/fanSlice.ts";


interface DoneClickParams{
    dispatch: Dispatch;
    selectedSetting: FanSetting;
    setMenu: (value:Mode) => void;
    callForCooling: boolean;
    fanSetting: FanSetting;
}
export const handleDoneClick = ({dispatch, selectedSetting, setMenu, callForCooling, fanSetting}: DoneClickParams) => {
    const handleStatusChange = (newStatus: FanStatus, delay:number) => {
        if(!callForCooling) dispatch(setFanStatus(FanStatus.Wait));

        setTimeout(() => {
            dispatch(setFanStatus(newStatus));
        }, delay);
    }

    if (
        (fanSetting === FanSetting.Auto && (selectedSetting === FanSetting.On || selectedSetting === FanSetting.Circ)) ||
        ((fanSetting === FanSetting.On || fanSetting === FanSetting.Circ) && selectedSetting === FanSetting.Auto)
    ) {
        handleStatusChange(
            selectedSetting === FanSetting.Auto ? FanStatus.Off : FanStatus.On,
            5000
        );
    }

    dispatch(setFanSetting(selectedSetting));
    setMenu(0);
}