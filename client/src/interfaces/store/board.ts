import { Project } from "../project";

export enum TaskStatus {
    IN_QUEUE = "In queue",
    IN_PROGRESS = "In progress",
    REVIEW = "Review",
    ON_HOLD = "On hold",
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
    status: TaskStatus;
    subtasks?: SubTaskInterface[] | undefined;
    project: Project;
}

export interface ColumnInterface {
    title: string;
    tasks: TaskInterface[] | [];
}

export interface BoardState {
    columns: ColumnInterface[];
}
