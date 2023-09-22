import { useAppDispatch } from "@/hooks/redux";
import { SubTaskInterface } from "@/interfaces";
import { setSubtaskCompleted } from "@/store/features/board";
import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent, useState } from "react";

export default function Subtask({
    subtasks,
    setSubtasks,
    taskId,
    colId,
}: {
    subtasks: SubTaskInterface[];
    setSubtasks: (
        newSubtask: SubTaskInterface[] | [] | undefined
    ) => SubTaskInterface[] | [] | undefined;
    taskId: number;
    colId: number;
}) {
    const [subtaskTitle, setSubtaskTitle] = useState("");

    let completed = 0;
    if (subtasks) {
        subtasks.forEach((subtask) => {
            if (subtask.isCompleted) {
                completed++;
            }
        });
    }

    const dispatch = useAppDispatch();
    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSubtaskCompleted({ index: 1, taskId, colId }));
    };
    const onDelete = (id: number) => {
        setSubtasks(subtasks.filter((el) => el.id !== id));
    };

    return (
        <>
            <p className="text-gray-500 tracking-widest text-sm">
                Subtasks ({completed} of {subtasks.length})
            </p>
            <div className=" mt-3 space-y-2">
                {subtasks.map((subtask) => (
                    <div className="flex flex-row items-center" key={subtask.title}>
                        <div className="flex-grow flex hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c]  p-3 gap-4  bg-[#f4f7fd]">
                            <input
                                className=" w-4 h-4  accent-[#635fc7] cursor-pointer "
                                type="checkbox"
                                checked={subtask.isCompleted}
                                onChange={() => onChange}
                            />
                            <p className={subtask.isCompleted ? " line-through opacity-30 " : ""}>
                                {subtask.title}
                            </p>
                        </div>
                        <CloseIcon className="ml-3 cursor-pointer" onClick={() => onDelete} />
                    </div>
                ))}
                <div className="flex flex-row items-center">
                    <input
                        onBlur={(e) => {
                            setSubtasks([
                                ...subtasks,
                                {
                                    title: e.target.value,
                                    isCompleted: false,
                                    id: 113,
                                },
                            ]);

                            setSubtaskTitle("");
                        }}
                        type="text"
                        onChange={(e) => setSubtaskTitle(e.target.value)}
                        value={subtaskTitle}
                        className="mr-9 py-[10px] bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
                        placeholder="New task"
                    />
                </div>
            </div>
        </>
    );
}
