import { configureStore } from '@reduxjs/toolkit';
import mainReducer from "./features/main";

export const store = configureStore({
    reducer: {
        mainReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;