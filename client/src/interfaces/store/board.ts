export enum TaskStatus {
    ALL = "All",
    IN_QUEUE = "In queue",
    IN_PROGRESS = "In progress",
    REVIEW = "review",
    ON_HOLD = "On hold",
    DONE = "Done"
}

export interface SubTaskInterface {
    id?: number,
    title: string,
    isCompleted: boolean
}

export interface TaskInterface {
    id?: number,
    title?: string,
    description?: string,
    status?: TaskStatus,
    subtasks?: SubTaskInterface[] | []
};

export interface ColumnInterface {
    id: number,
    name: string,
    tasks: TaskInterface[] | [],
};

export interface BoardState {
    columns: ColumnInterface[]
}