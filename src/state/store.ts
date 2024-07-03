import {configureStore} from "@reduxjs/toolkit";

import generalReducer from './slices/generalSlice.ts'
import fanReducer from './slices/fanSlice.ts'

export const store = configureStore({
    reducer: {
        general: generalReducer,
        fan: fanReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;