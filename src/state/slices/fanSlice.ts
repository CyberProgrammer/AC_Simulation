import {FanSetting, FanStatus} from "@customTypes/enums.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FanState{
    fanSetting: FanSetting;
    fanStatus: FanStatus;
}

const initialState: FanState = {
    fanSetting: FanSetting.Auto,
    fanStatus: FanStatus.Off
};

const fanSlice = createSlice({
    name: "fan",
    initialState,
    reducers: {
        setFanSetting: (state, action: PayloadAction<FanSetting>) => {
            state.fanSetting = action.payload;
        },
        setFanStatus: (state, action: PayloadAction<FanStatus>) => {
            state.fanStatus = action.payload;
        }
    }
})

export const {
    setFanSetting,
    setFanStatus,
} = fanSlice.actions;

export default fanSlice.reducer;