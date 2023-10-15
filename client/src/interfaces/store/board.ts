import { Project } from "../project";

export enum TaskStatus {
    InQueue = "In queue",
    InProgress = "In progress",
    REVIEW = "Review",
    OnHold = "On hold",
    DONE = "Done",
}

export interface SubTaskInterface {
    id: number;
    title: string;
    isCompleted: boolean;
}

export interface TaskInterface {
    id: number;
    title?: string;
    description?: string;
    status?: TaskStatus;
    subtasks?: SubTaskInterface[] | undefined;
    project: Project;
}

export interface ColumnInterface {
    id: number;
    title: string;
    tasks: TaskInterface[] | [];
}

export interface BoardState {
    columns: ColumnInterface[];
}
