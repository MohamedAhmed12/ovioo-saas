import { ColumnInterface, TaskInterface, TaskStatus } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { tasks: any } = {
    tasks: null,
};

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload.reduce(
                (
                    result: Record<TaskStatus, TaskInterface[]>,
                    task: TaskInterface
                ) => {
                    if (!result[task.status as TaskStatus])
                        result[task.status as TaskStatus] = [];
                    result[task.status as TaskStatus].push(task);

                    return result;
                },
                {}
            );
        },
        pushNewTask: (state, action) => {
            const { status } = action.payload;
            state.tasks = {
                ...state.tasks,
                [status]: [...(state.tasks[status] || []), action.payload],
            };
        },
        editBoard: (state, action) => {
            state.columns = action.payload.newColumns;
        },
        addTask: (
            state,
            { payload }: { payload: TaskInterface & { colId: number } }
        ) => {
            const { title, status, description, subtasks } = payload;
            const task: TaskInterface = {
                id: 55,
                title,
                description,
                subtasks,
                status,
            };
            const column: ColumnInterface | undefined = state.columns.find(
                (col: ColumnInterface | undefined, index: number) =>
                    index === payload.colId || 0
            );

            if (column && column.tasks && task)
                (column.tasks as TaskInterface[]).push(task as TaskInterface);
        },
        editTask: (state, action) => {
            const {
                title,
                status,
                description,
                subtasks,
                prevColIndex,
                newColIndex,
                taskIndex,
            } = action.payload;
            const column = state.columns.find(
                (col: ColumnInterface, index: number) => index === newColIndex
            );

            if (column == undefined) return;

            let task =
                column &&
                column.tasks.find(
                    (task: TaskInterface, index) => index === taskIndex
                );

            if (task == undefined) return;

            task = {
                ...task,
                title,
                status,
                description,
                subtasks,
            };

            if (prevColIndex === newColIndex) return;

            const newCol = state.columns.find(
                (col: ColumnInterface, index: number) => index === newColIndex
            );
            if (newCol && newCol.tasks && task)
                (column.tasks as TaskInterface[]).push(task as TaskInterface);
        },
        dragTask: (state, action) => {
            const {
                task,
                newColStatus,
            }: { task: TaskInterface; newColStatus: TaskStatus } =
                action.payload;

            if (!state.tasks) return;

            const taskCurrentIndex: number = state.tasks[task.status].findIndex(
                (elm) => elm.id == task.id
            );

            if (taskCurrentIndex != -1) {
                console.log(3);
                state.tasks[task.status].splice(taskCurrentIndex, 1);

                if (!state.tasks[newColStatus]) state.tasks[newColStatus] = [];
                console.log(state.tasks[newColStatus].push(task));
            }
        },
        setSubtaskCompleted: (state, action) => {
            const payload = action.payload;
            const col = state.columns.find(
                (col: ColumnInterface, i) => i === payload.colIndex
            );
            const task =
                col &&
                col.tasks.find(
                    (task: TaskInterface, i) => i === payload.taskIndex
                );
            const subtask =
                task &&
                task.subtasks &&
                task.subtasks.find((subtask, i) => i === payload.index);

            if (subtask) subtask.isCompleted = !subtask.isCompleted;
        },
        setTaskStatus: (state, action) => {
            console.log(action.payload);
        },
        deleteTask: (state, action) => {
            const { taskId, colId } = action.payload;
            const col = state.columns.find(
                (col: ColumnInterface, i) => col.id === colId
            );

            if (col != undefined) {
                col.tasks = col.tasks.filter(
                    (task: TaskInterface, i) => task.id !== taskId
                );
            }
        },
    },
});

export const {
    setTasks,
    pushNewTask,
    editBoard,
    addTask,
    editTask,
    dragTask,
    setSubtaskCompleted,
    setTaskStatus,
    deleteTask,
} = boardSlice.actions;
export default boardSlice.reducer;
