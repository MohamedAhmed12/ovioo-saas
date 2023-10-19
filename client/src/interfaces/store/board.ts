import { Asset } from "../asset";
import { Project } from "../project";
import { UserInterface } from "../user";

export enum TaskStatus {
    IN_QUEUE = "In queue",
    IN_PROGRESS = "In progress",
    REVIEW = "Review",
    ON_HOLD = "On hold",
    DONE = "Done",
}

export interface TaskTypeInterface {
    id: number;
    title: string;
    info: string[];
    extraInfo: string;
    plan: string;
}

export interface SubTaskInterface {
    id: number;
    title: string;
    isCompleted: boolean;
}

export interface TaskInterface {
    id: string;
    title?: string;
    description?: string;
    status: string;
    subtasks?: SubTaskInterface[] | undefined;
    project: Project;
    type: TaskType;
    designer?: UserInterface;
    assets: Asset[];
    children?: TaskInterface[];
}

export interface ColumnInterface {
    title: string;
    tasks: TaskInterface[] | [];
}

export interface BoardState {
    columns: ColumnInterface[];
}

export interface TaskType {
    id: string;
    title?: string;
    info?: string[];
    extraInfo?: string;
    plan?: string;
}
