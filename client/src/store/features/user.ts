import { RoleEnum } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { user: any; isDesigner: boolean } = {
    user: null,
    isDesigner: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isDesigner = action.payload.role == RoleEnum.Designer;
        },
        clearUser: (state, action) => {
            state.user = null;
        },
        setIsDesigner: (state, action) => {
            state.isDesigner = action.payload;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
