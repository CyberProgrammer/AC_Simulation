import {FanSetting, FanStatus, Mode} from "@customTypes/enums.ts";


interface DoneClickParams{
    selectedSetting: FanSetting;
    setMenu: (value:Mode) => void;
    callForCooling: boolean;
    fanSetting: FanSetting;
    setFanSetting: (fanSetting: FanSetting) => void;
    setFanStatus: (fanStatus:FanStatus) => void;
}
export const handleDoneClick = ({selectedSetting, setMenu, callForCooling, fanSetting, setFanSetting, setFanStatus}: DoneClickParams) => {
    const handleStatusChange = (newStatus: FanStatus, delay:number) => {
        if(!callForCooling) setFanStatus(FanStatus.Wait);

        setTimeout(() => {
            setFanStatus(newStatus);
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

    setFanSetting(selectedSetting);
    setMenu(0);
}