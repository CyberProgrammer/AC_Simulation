import {Mode} from "@customTypes/enums.ts";

export const handleNextClick =
    (selectedSetting:Mode,
     isFollowingSchedule:boolean,
     setSelectedSetting:(newMode:Mode) => void
    ) =>{

    if(selectedSetting < Mode.Auto && !isFollowingSchedule)
        setSelectedSetting(selectedSetting+1);
}