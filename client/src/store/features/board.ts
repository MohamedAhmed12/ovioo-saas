import { BoardState, ColumnInterface, TaskInterface, TaskStatus } from '@/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: BoardState = {
    columns: [
        {
            id: 1,
            title: TaskStatus.InQueue,
            tasks: [
                {
                    id: 1,
                    title: "Build UI for onboarding flow",
                    description: "",
                    status: TaskStatus.InQueue,
                    subtasks: [
                        {
                            id: 1,
                            title: "Sign up page",
                            isCompleted: true
                        },
                        {
                            id: 2,
                            title: "Sign in page",
                            isCompleted: false
                        },
                        {
                            id: 3,
                            title: "Welcome page",
                            isCompleted: false
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Build UI for search",
                    description: "",
                    status: TaskStatus.InQueue,
                    subtasks: [
                        {
                            id: 1,
                            title: "Search page",
                            isCompleted: false
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Build settings UI",
                    description: "",
                    status: TaskStatus.InQueue,
                    subtasks: [
                        {
                            id: 1,
                            title: "Account page",
                            isCompleted: false
                        },
                        {
                            id: 2,
                            title: "Billing page",
                            isCompleted: false
                        }
                    ]
                },
            ]
        },
        {
            id: 2,
            title: TaskStatus.InProgress,
            tasks: [
                {
                    id: 1,
                    title: "Design settings and search pages",
                    description: "",
                    status: TaskStatus.InProgress,
                    subtasks: [
                        {
                            id: 1,
                            title: "Settings - Account page",
                            isCompleted: true
                        },
                        {
                            id: 2,
                            title: "Settings - Billing page",
                            isCompleted: true
                        },
                    ]
                },
                {
                    id: 2,
                    title: "Add account management endpoints",
                    description: "",
                    status: TaskStatus.InProgress,
                    subtasks: [
                        {
                            id: 1,
                            title: "Upgrade plan",
                            isCompleted: true
                        },

                    ]
                },
                {
                    id: 3,
                    title: "Design onboarding flow",
                    description: "",
                    status: TaskStatus.InProgress,
                    subtasks: [
                        {
                            id: 1,
                            title: "Sign up page",
                            isCompleted: true
                        },
                        {
                            id: 2,
                            title: "Sign in page",
                            isCompleted: false
                        },
                        {
                            id: 3,
                            title: "Welcome page",
                            isCompleted: false
                        }
                    ]
                },
                {
                    id: 4,
                    title: "Add search enpoints",
                    description: "",
                    status: TaskStatus.InProgress,
                },
            ]
        },
        {
            id: 3,
            title: TaskStatus.REVIEW,
            tasks: [
                {
                    id: 1,
                    title: "Conduct 5 wireframe tests",
                    description: "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
                    status: TaskStatus.DONE,
                    subtasks: [
                        {
                            id: 1,
                            title: "Complete 5 wireframe prototype tests",
                            isCompleted: true
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Create wireframe prototype",
                    description: "Create a greyscale clickable wireframe prototype to test our asssumptions so far.",
                    status: TaskStatus.DONE,
                },
                {
                    id: 3,
                    title: "Market discovery",
                    description: "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",
                    status: TaskStatus.DONE,
                },
            ]
        },
        {
            id: 4,
            title: TaskStatus.OnHold,
            tasks: []
        },
        {
            id: 5,
            title: TaskStatus.DONE,
            tasks: []
        }
    ]
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        editBoard: (state, action) => {
            state.columns = action.payload.newColumns;
        },
        addTask: (state, { payload }: { payload: TaskInterface & { colId: number } }) => {
            const { title, status, description, subtasks } = payload;
            const task: TaskInterface = { id: 55, title, description, subtasks, status };
            const column: ColumnInterface | undefined = state.columns.find((col: ColumnInterface | undefined, index: number) => index === payload.colId || 0);

            if (column && column.tasks && task) (column.tasks as TaskInterface[]).push(task as TaskInterface);
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
            const column = state.columns.find((col: ColumnInterface, index: number) => index === newColIndex);

            if (column == undefined) return;

            let task = column && column.tasks.find((task: TaskInterface, index) => index === taskIndex);

            if (task == undefined) return;

            task = {
                ...task,
                title,
                status,
                description,
                subtasks,
            };

            if (prevColIndex === newColIndex) return;

            const newCol = state.columns.find((col: ColumnInterface, index: number) => index === newColIndex);
            if (newCol && newCol.tasks && task) (column.tasks as TaskInterface[]).push(task as TaskInterface);
        },
        dragTask: (state, action) => {
            const { colId, prevColId, taskId } = action.payload;
            const prevCol: ColumnInterface | undefined = state.columns.find((col: ColumnInterface, i) => col.id === prevColId);

            if (!prevCol) return;

            const newCol: ColumnInterface | undefined = state.columns.find((col: ColumnInterface, i) => col.id === colId);
            const taskIndex: number = Object.keys(prevCol.tasks).findIndex((key) => prevCol.tasks[+key].id === taskId);
            const task: TaskInterface = prevCol.tasks.splice(taskIndex, 1)[0];

            if (newCol) {
                (newCol.tasks as TaskInterface[]).push(task);
            }
        },
        setSubtaskCompleted: (state, action) => {
            const payload = action.payload;
            const col = state.columns.find((col: ColumnInterface, i) => i === payload.colIndex);
            const task = col && col.tasks.find((task: TaskInterface, i) => i === payload.taskIndex);
            const subtask = (task && task.subtasks) && task.subtasks.find((subtask, i) => i === payload.index);

            if (subtask) subtask.isCompleted = !subtask.isCompleted;
        },
        setTaskStatus: (state, action) => {
            console.log(action.payload);
        },
        deleteTask: (state, action) => {
            const { taskId, colId } = action.payload;
            const col = state.columns.find((col: ColumnInterface, i) => col.id === colId);

            if (col != undefined) {
                col.tasks = col.tasks.filter((task: TaskInterface, i) => task.id !== taskId);
            }
        },
    }
});

export const { editBoard, addTask, editTask, dragTask, setSubtaskCompleted, setTaskStatus, deleteTask } = boardSlice.actions;
export default boardSlice.reducer;