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
        setMode: (state, action) => {            
            state.mode = action.payload;
            typeof window !== 'undefined' && localStorage.setItem('mode', action.payload);
        }
    }
});

export const { setMode } = mainSlice.actions;

export default mainSlice.reducer;