import {Mode} from "@customTypes/enums.ts";

export const handlePrevClick =
    (
        selectedSetting:Mode,
        isFollowingSchedule:boolean,
        setSelectedSetting:(newMode:Mode) => void
    ) =>{

    if(selectedSetting != Mode.Heat && !isFollowingSchedule)
        setSelectedSetting(selectedSetting-1);
}