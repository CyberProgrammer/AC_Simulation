import {FanSetting} from "@customTypes/enums.ts";

interface PrevClickParams{
    selectedSetting: FanSetting;
    setSelectedSetting: (selectedSetting: FanSetting) => void;
}
export const handlePrevClick = ({selectedSetting, setSelectedSetting}:PrevClickParams) =>{
    if(selectedSetting != 0)
        setSelectedSetting(selectedSetting-1);
}