import { createSlice } from '@reduxjs/toolkit';
import { BoardState, ColumnInterface, TaskInterface } from '@/interfaces';

const initialState: BoardState = {
    columns: [
        {
            id: 1,
            name: "Todo",
            tasks: [
                {
                    title: "Build UI for onboarding flow",
                    description: "",
                    status: "Todo",
                    subtasks: [
                        {
                            title: "Sign up page",
                            isCompleted: true
                        },
                        {
                            title: "Sign in page",
                            isCompleted: false
                        },
                        {
                            title: "Welcome page",
                            isCompleted: false
                        }
                    ]
                },
                {
                    title: "Build UI for search",
                    description: "",
                    status: "Todo",
                    subtasks: [
                        {
                            title: "Search page",
                            isCompleted: false
                        }
                    ]
                },
                {
                    title: "Build settings UI",
                    description: "",
                    status: "Todo",
                    subtasks: [
                        {
                            title: "Account page",
                            isCompleted: false
                        },
                        {
                            title: "Billing page",
                            isCompleted: false
                        }
                    ]
                },
                {
                    title: "QA and test all major user journeys",
                    description: "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
                    status: "Todo",
                    subtasks: [
                        {
                            title: "Internal testing",
                            isCompleted: false
                        },
                        {
                            title: "External testing",
                            isCompleted: false
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "Doing",
            tasks: [
                {
                    title: "Design settings and search pages",
                    description: "",
                    status: "Doing",
                    subtasks: [
                        {
                            title: "Settings - Account page",
                            isCompleted: true
                        },
                        {
                            title: "Settings - Billing page",
                            isCompleted: true
                        },
                        {
                            title: "Search page",
                            isCompleted: false
                        }
                    ]
                },
                {
                    title: "Add account management endpoints",
                    description: "",
                    status: "Doing",
                    subtasks: [
                        {
                            title: "Upgrade plan",
                            isCompleted: true
                        },
                        {
                            title: "Cancel plan",
                            isCompleted: true
                        },
                        {
                            title: "Update payment method",
                            isCompleted: false
                        }
                    ]
                },
                {
                    title: "Design onboarding flow",
                    description: "",
                    status: "Doing",
                    subtasks: [
                        {
                            title: "Sign up page",
                            isCompleted: true
                        },
                        {
                            title: "Sign in page",
                            isCompleted: false
                        },
                        {
                            title: "Welcome page",
                            isCompleted: false
                        }
                    ]
                },
                {
                    title: "Add search enpoints",
                    description: "",
                    status: "Doing",
                    subtasks: [
                        {
                            title: "Add search endpoint",
                            isCompleted: true
                        },
                        {
                            title: "Define search filters",
                            isCompleted: false
                        }
                    ]
                },
                {
                    title: "Add authentication endpoints",
                    description: "",
                    status: "Doing",
                    subtasks: [
                        {
                            title: "Define user model",
                            isCompleted: true
                        },
                        {
                            title: "Add auth endpoints",
                            isCompleted: false
                        }
                    ]
                },
                {
                    title: "Research pricing points of various competitors and trial different business models",
                    description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                    status: "Doing",
                    subtasks: [
                        {
                            title: "Research competitor pricing and business models",
                            isCompleted: true
                        },
                        {
                            title: "Outline a business model that works for our solution",
                            isCompleted: false
                        },
                        {
                            title: "Talk to potential customers about our proposed solution and ask for fair price expectancy",
                            isCompleted: false
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            name: "Done",
            tasks: [
                {
                    title: "Conduct 5 wireframe tests",
                    description: "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
                    status: "Done",
                    subtasks: [
                        {
                            title: "Complete 5 wireframe prototype tests",
                            isCompleted: true
                        }
                    ]
                },
                {
                    title: "Create wireframe prototype",
                    description: "Create a greyscale clickable wireframe prototype to test our asssumptions so far.",
                    status: "Done",
                    subtasks: [
                        {
                            title: "Create clickable wireframe prototype in Balsamiq",
                            isCompleted: true
                        }
                    ]
                },
                {
                    title: "Review results of usability tests and iterate",
                    description: "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
                    status: "Done",
                    subtasks: [
                        {
                            title: "Meet to review notes from previous tests and plan changes",
                            isCompleted: true
                        },
                        {
                            title: "Make changes to paper prototypes",
                            isCompleted: true
                        },
                        {
                            title: "Conduct 5 usability tests",
                            isCompleted: true
                        }
                    ]
                },
                {
                    title: "Create paper prototypes and conduct 10 usability tests with potential customers",
                    description: "",
                    status: "Done",
                    subtasks: [
                        {
                            title: "Create paper prototypes for version one",
                            isCompleted: true
                        },
                        {
                            title: "Complete 10 usability tests",
                            isCompleted: true
                        }
                    ]
                },
                {
                    title: "Market discovery",
                    description: "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",
                    status: "Done",
                    subtasks: [
                        {
                            title: "Interview 10 prospective customers",
                            isCompleted: true
                        }
                    ]
                },
                {
                    title: "Competitor analysis",
                    description: "",
                    status: "Done",
                    subtasks: [
                        {
                            title: "Find direct and indirect competitors",
                            isCompleted: true
                        },
                        {
                            title: "SWOT analysis for each competitor",
                            isCompleted: true
                        }
                    ]
                },
                {
                    title: "Research the market",
                    description: "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
                    status: "Done",
                    subtasks: [
                        {
                            title: "Write up research analysis",
                            isCompleted: true
                        },
                        {
                            title: "Calculate TAM",
                            isCompleted: true
                        }
                    ]
                }
            ]
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
        addTask: (state, action) => {

            const { title = "", status = "", description = "", subtasks = "", colIndex = 0 } =
                action.payload;
            const task: TaskInterface = { title, description, subtasks, status };
            const column = state.columns.find((col: ColumnInterface, index: number) => index === colIndex);
            console.log(column);
            if (column && task) (column.tasks as WritableDraft<TaskInterface>[]).push(task);
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

            const task = column && column.tasks.find((task: TaskInterface, index) => index === taskIndex);

            if (task == undefined) return;

            task.title = title;
            task.status = status;
            task.description = description;
            task.subtasks = subtasks;

            if (prevColIndex === newColIndex) return;

            column.tasks = column.tasks.filter((task: TaskInterface, index) => index !== taskIndex);
            const newCol = state.columns.find((col: ColumnInterface, index: number) => index === newColIndex);
            newCol && newCol.tasks.push(task);
        },
        dragTask: (state, action) => {
            const { colIndex, prevColIndex, taskIndex } = action.payload;
            const prevCol: ColumnInterface | undefined = state.columns.find((col: ColumnInterface, i) => i === prevColIndex);

            if (!prevCol) return;

            const [task]: TaskInterface[] | never = prevCol.tasks.splice(taskIndex, 1);
            const newCol: ColumnInterface | undefined = state.columns.find((col: ColumnInterface, i) => i === colIndex);
            if (newCol && task !== undefined) {
                newCol.tasks.push(task);
            }
        },
        setSubtaskCompleted: (state, action) => {
            const payload = action.payload;
            const col = state.columns.find((col: ColumnInterface, i) => i === payload.colIndex);
            const task = col && col.tasks.find((task: TaskInterface, i) => i === payload.taskIndex);
            const subtask = task && task.subtasks.find((subtask, i) => i === payload.index);

            if (subtask) subtask.isCompleted = !subtask.isCompleted;
        },
        setTaskStatus: (state, action) => {
            const payload = action.payload;
            const columns = state.columns;
            const col = columns.find((col: ColumnInterface, i) => i === payload.colIndex);

            if (col == undefined) return;
            if (payload.colIndex === payload.newColIndex) return;

            const task = col.tasks.find((task: TaskInterface, i) => i === payload.taskIndex);

            if (task == undefined) return;

            task.status = payload.status;
            col.tasks = col.tasks.filter((task: TaskInterface, i) => i !== payload.taskIndex);
            const newCol = columns.find((col: ColumnInterface, i) => i === payload.newColIndex);
            newCol && newCol.tasks.push(task);
        },
        deleteTask: (state, action) => {
            const payload = action.payload;
            const col = state.columns.find((col: ColumnInterface, i) => i === payload.colIndex);

            if (col == undefined) return;

            col.tasks = col.tasks.filter((task: TaskInterface, i) => i !== payload.taskIndex);
        },
    }
});

export const { editBoard, addTask, editTask, dragTask, setSubtaskCompleted, setTaskStatus, deleteTask } = boardSlice.actions;
export default boardSlice.reducer;