import { TaskInterface } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { selectedTask: TaskInterface | null } = {
    selectedTask: null,
};

export const taskSlice = createSlice({
    name: "selectedTask",
    initialState,
    reducers: {
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload;
        },
        setTaskAssets: (state, action) => {
            if (!state?.selectedTask) return;
            state.selectedTask.assets = action.payload;
        },
    },
});

// actions to Add =>  setSelectedTask, editTask,setTaskAssets, clearSelectedTask
export const { setSelectedTask, setTaskAssets } = taskSlice.actions;
export default taskSlice.reducer;
