import {configureStore} from "@reduxjs/toolkit";

import generalReducer from './slices/generalSlice.ts'
export const store = configureStore({
    reducer: {
        general: generalReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;