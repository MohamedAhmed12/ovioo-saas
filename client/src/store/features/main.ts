import { createSlice } from '@reduxjs/toolkit'
import { MainState, ModeEnum } from "@/interfaces/store/main";

const initialState: MainState = {
    mode: ModeEnum.Dark
};

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        toggleMode: (state) => {            
            state.mode = state.mode == ModeEnum.Dark ? ModeEnum.Light : ModeEnum.Dark;
        }
    }
});

export const { toggleMode } = mainSlice.actions;

export default mainSlice.reducer;