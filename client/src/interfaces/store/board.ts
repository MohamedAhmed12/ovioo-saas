import { Asset } from "../asset";
import { MessageInterface } from "../message";
import { Project } from "../project";
import { Team } from "../team";
import { UserInterface } from "../user";

export enum DesignerTaskStatus {
    IN_QUEUE = "In queue",
    IN_PROGRESS = "In progress",
    DONE = "Done",
}
export enum TaskStatus {
    IN_QUEUE = "In queue",
    IN_PROGRESS = "In progress",
    REVIEW = "Review",
    DONE = "Done",
}

export const getTaskStatus = () =>
    Object.entries(TaskStatus).map(([key, value]) => ({
        key,
        title: value,
    }));

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
    status: TaskStatus;
    unreadMessagesCount?: number;
    subtasks?: SubTaskInterface[] | undefined;
    project?: Project;
    type?: TaskType;
    designer?: UserInterface;
    team?: Team;
    assets?: Asset[];
    messages: MessageInterface[];
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
