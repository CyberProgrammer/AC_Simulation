import {FanSetting} from "@customTypes/enums.ts";

interface NextClickParams{
    selectedSetting: FanSetting;
    setSelectedSetting: (selectedSetting: FanSetting) => void;
}
export const handleNextClick = ({selectedSetting, setSelectedSetting}:NextClickParams) =>{
    if(selectedSetting != 2)
        setSelectedSetting(selectedSetting+1);
}