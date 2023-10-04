import userReducer from "./features/user";
import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./features/main";
import boardReducer from "./features/board";

export const store = configureStore({
    reducer: {
        mainReducer,
        boardReducer,
        userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
