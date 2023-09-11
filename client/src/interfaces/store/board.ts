export interface SubTaskInterface {
    id?: number,
    title: string,
    isCompleted: boolean
}

export interface TaskInterface {
    id?: number,
    title?: string,
    description?: string,
    status?: string,
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