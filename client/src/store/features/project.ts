import { Project as ProjectInterface } from "@/interfaces/project";
import { gql } from "@apollo/client";
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
        pushNewProject: (state, action) => {
            state.projects.push(action.payload);
        },
        replaceProject: (state, action) => {            
           state.projects= state.projects.map(project => action.payload.id == project.id ? { ...project, ...action.payload } : project);
        },
    },
});

export const { setProjects, deleteProject, pushNewProject, replaceProject } = projectSlice.actions;

export default projectSlice.reducer;
