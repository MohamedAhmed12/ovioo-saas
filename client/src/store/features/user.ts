import { RoleEnum } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    user: any;
    isUser: boolean;
    isDesigner: boolean;
    isManager: boolean;
} = {
    user: null,
    isUser: false,
    isDesigner: false,
    isManager: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            userSlice.caseReducers.setUserRoleGroup(state, action);
        },
        clearUser: (state, action) => {
            state.user = null;
        },
        setUserRoleGroup: (state, action) => {
            if (
                [RoleEnum.User, RoleEnum.Member].includes(action.payload.role)
            ) {
                state.isUser = true;
            }
            if (
                [RoleEnum.Designer, RoleEnum.Agency].includes(
                    action.payload.role
                )
            ) {
                state.isDesigner = true;
            }
            if (
                [RoleEnum.AccountManager, RoleEnum.Admin].includes(
                    action.payload.role
                )
            ) {
                state.isManager = true;
            }
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
