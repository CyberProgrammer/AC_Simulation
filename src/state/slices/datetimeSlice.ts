import {DayOfWeek, Months} from "@customTypes/enums.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface DatetimeState {
    manualMonth: Months;
    manualDay: number;
    manualHour: number;
    manualMinute: number;
    isManualTime: boolean;
    manualPeriod: string;
    formattedManualTime: string;
    formattedDate: string;
    manualCalendarDay: DayOfWeek;
    isManualDate: boolean;
    fullDateTime: number;
}

const initialState: DatetimeState = {
    manualMonth: Months.Jan,
    manualDay: 1,
    manualHour: 0,
    manualMinute: 0,
    isManualTime: false,
    manualPeriod: "am",
    formattedManualTime: "",
    formattedDate: "",
    manualCalendarDay: DayOfWeek.Sunday,
    isManualDate: false,
    fullDateTime: new Date().getTime(),
}

const datetimeSlice = createSlice({
    name: "date-time",
    initialState,
    reducers:{
        setIsManualTime: (state, action: PayloadAction<boolean>) => {
            state.isManualTime = action.payload;
        },
        setIsManualDate: (state, action: PayloadAction<boolean>) => {
            state.isManualDate = action.payload;
        },
        setManualCalendarDay: (state, action: PayloadAction<DayOfWeek>) => {
            state.manualCalendarDay = action.payload;
        },
        setFullDateTime: (state, action: PayloadAction<number>) => {
            state.fullDateTime = action.payload;
        },
        setManualHour: (state, action: PayloadAction<number>) => {
            state.manualHour = action.payload;
        },
        setManualMinute: (state, action: PayloadAction<number>) => {
            state.manualMinute = action.payload;
        },
        setManualPeriod: (state, action: PayloadAction<string>) => {
            state.manualPeriod = action.payload;
        },
        setFormattedManualTime: (state, action: PayloadAction<string>) => {
            state.formattedManualTime = action.payload;
        },
        setManualMonth: (state, action: PayloadAction<Months>) => {
            state.manualMonth = action.payload;
        },
        setManualDay: (state, action: PayloadAction<number>) => {
            state.manualDay = action.payload;
        },
        setFormattedDate: (state, action: PayloadAction<string>) => {
            state.formattedDate = action.payload;
        }
    }
})

export const {
    setIsManualTime,
    setIsManualDate,
    setManualCalendarDay,
    setFullDateTime,
    setManualHour,
    setManualMinute,
    setManualPeriod,
    setFormattedManualTime,
    setManualMonth,
    setManualDay,
    setFormattedDate
} = datetimeSlice.actions;

export default datetimeSlice.reducer;