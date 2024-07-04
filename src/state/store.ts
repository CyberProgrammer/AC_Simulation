import {configureStore} from "@reduxjs/toolkit";

import generalReducer from './slices/generalSlice.ts'
import fanReducer from './slices/fanSlice.ts'
import condenserReducer from './slices/condenserSlice.ts'
import datetimeSlice from "./slices/datetimeSlice.ts";
import scheduleSlice from "./slices/scheduleSlice.ts";

export const store = configureStore({
    reducer: {
        general: generalReducer,
        fan: fanReducer,
        condenser: condenserReducer,
        datetime: datetimeSlice,
        schedule: scheduleSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;