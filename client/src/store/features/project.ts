import { Project as ProjectInterface } from "@/interfaces/project";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { projects: ProjectInterface[] } = {
    projects: [],
};

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        deleteProject: (state, action) => {
            state.projects = state.projects.filter((project) => project.id != action.payload);
        },
    },
});

export const { setProjects, deleteProject } = projectSlice.actions;

export default projectSlice.reducer;
