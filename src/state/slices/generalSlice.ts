import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Mode, SystemStatus} from "@customTypes/enums.ts";

interface GeneralState {
    mode: Mode;
    status: SystemStatus;
    currentTemp: number;
    setTemp: number;
}

const initialState: GeneralState = {
    mode: Mode.Off,
    status: SystemStatus.AtTemp,
    currentTemp: 75,
    setTemp: 76,
};

const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<Mode>) => {
            state.mode = action.payload;
        },
        setStatus: (state, action: PayloadAction<SystemStatus>) => {
            state.status = action.payload;
        },
        setCurrentTemp: (state, action: PayloadAction<number>) => {
            state.currentTemp = action.payload;
        },
        setSetTemp: (state, action: PayloadAction<number>) => {
            state.setTemp = action.payload;
        },
    },
})

export const {
    setMode,
    setStatus,
    setCurrentTemp,
    setSetTemp,
} = generalSlice.actions;

export default generalSlice.reducer;
