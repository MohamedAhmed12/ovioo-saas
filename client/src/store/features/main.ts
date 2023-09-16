import { MainState, ModeEnum } from "@/interfaces/store/main";
import { createSlice } from '@reduxjs/toolkit';

const storedMode = (typeof window !== 'undefined' && localStorage?.getItem('mode')) || ModeEnum.Dark;

const initialState: MainState = {
    mode: storedMode === ModeEnum.Light ? ModeEnum.Light : ModeEnum.Dark
};

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        toggleMode: (state) => {
            state.mode = state.mode === ModeEnum.Dark ? ModeEnum.Light : ModeEnum.Dark;
            typeof window !== 'undefined' && localStorage.setItem('mode', state.mode);
        }
    }
});

export const { toggleMode } = mainSlice.actions;

export default mainSlice.reducer;