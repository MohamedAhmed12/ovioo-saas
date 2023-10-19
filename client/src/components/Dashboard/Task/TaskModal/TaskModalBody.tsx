import { SubTaskInterface, TaskInterface } from "@/interfaces";
import { getClient } from "@/utils/getClient";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import OviooDropDown from "../../OviooDropDown";
import Attachement from "./Attachement";
import { useDispatch } from "react-redux";
import { setSelectedTask, setTaskAssets } from "@/store/features/task";

const LIST_PROJECTS = gql`
    query {
        listProjects {
            id
            title
        }
    }
`;
const DELETE_ASSET = gql`
    mutation Mutation($asset: DeleteAssetDto!) {
        deleteAsset(asset: $asset)
    }
`;

export default function TaskModalBody({
    task,
    subtasks,
    colId,
    title,
    setTitle,
}: {
    task: TaskInterface;
    subtasks: SubTaskInterface[] | undefined;
    colId: number;
    title: string;
    setTitle: (e: string) => void;
}) {
    const [description, setDescription] = useState("");
    // const [isFirstLoad, setIsFirstLoad] = useState(true);
    //

    const dispatch = useDispatch();
    const { data: session } = useSession({ required: true });
    const client = getClient(session);
    const [deleteAsset] = useMutation(DELETE_ASSET, { client });
    const { error, data } = useQuery(LIST_PROJECTS, {
        client,
        fetchPolicy: "no-cache",
    });

    if (error) throw new Error(JSON.stringify(error));

    const handletypeSelected = (project: string) => {};

    const handleDeleteAsset = async ({
        id,
        alt,
    }: {
        id: string;
        alt: string;
    }) => {
        try {
            const { data } = await deleteAsset({
                variables: {
                    asset: {
                        id,
                        alt,
                    },
                },
            });

            if (data.deleteAsset) {
                dispatch(setTaskAssets(task.assets.filter((asset) => asset.id != id)));
                toast.success("Deleted successfully");
            }
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
    };
    return (
        data?.listProjects && (
            <div className="task-modal__body basis-1/2 p-[25px]">
                <input
                    value={task.title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="task-name-input"
                    type="text"
                    className="bg-transparent w-full px-4 py-2 outline-none focus:border-0 rounded-md text-3xl  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
                    placeholder=" e.g Take coffee break"
                />
                <textarea
                    value={task.description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="task-description-input"
                    className="mt-8 w-full  bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
                    placeholder="Description e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
                />

                <p className="mt-8 mb-3 text-gray-500 tracking-widest text-sm">
                    Project
                </p>
                <OviooDropDown
                    initialVal={task.project.id}
                    options={data?.listProjects}
                    onSelected={handletypeSelected}
                    className="project-dropdown"
                />
                {/* 
                <div className="mt-8 flex flex-col space-y-3">
                    {subtasks && (
                        <Subtask
                            subtasks={subtasks}
                            setSubtasks={(
                                newSubtasks: SubTaskInterface[] | undefined
                            ) => (subtasks = newSubtasks)}
                            taskId={task.id}
                            colId={colId}
                        />
                    )}
                </div> */}

                <Attachement
                    task={task}
                    handleDeleteAsset={handleDeleteAsset}
                />
            </div>
        )
    );
}
