import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CondenserState{
    callForCooling: boolean;
}

const initialState: CondenserState = {
    callForCooling: false,
}

const condenserSlice = createSlice({
    name: "condenser",
    initialState,
    reducers: {
        setCallForCooling: (state, action: PayloadAction<boolean>) => {
            state.callForCooling = action.payload;
        }
    }
})

export const {
    setCallForCooling,
} = condenserSlice.actions;

export default condenserSlice.reducer;

