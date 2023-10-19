import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./features/board";
import mainReducer from "./features/main";
import projectReducer from "./features/project";
import userReducer from "./features/user";
import taskReducer from "./features/task";

export const store = configureStore({
    reducer: {
        mainReducer,
        boardReducer,
        userReducer,
        projectReducer,
        taskReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
