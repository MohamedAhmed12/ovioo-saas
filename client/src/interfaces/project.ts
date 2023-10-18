import { TaskInterface } from "./store/board";

export interface Project {
    id: string;
    title?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
    tasks?: TaskInterface[];
}
