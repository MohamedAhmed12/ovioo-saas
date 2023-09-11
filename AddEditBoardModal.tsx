import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { ColumnInterface } from "@/interfaces";
import { editBoard } from "@/store/features/board.ts";
import Image from "next/image";
import { useState } from "react";
import crossIcon from "../../../../public/test/icon-cross.svg";

export default function AddEditBoardModal({
    setIsBoardModalOpen,
}: {
    setIsBoardModalOpen: (value: boolean) => void;
}) {
    const dispatch = useAppDispatch();
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [name, setName] = useState("");
    const [newColumns, setNewColumns] = useState<ColumnInterface[]>([
        { name: "Todo", tasks: [], id: 1 },
        { name: "Doing", tasks: [], id: 2 },
    ]);
    const [isValid, setIsValid] = useState(true);
    const columns = useAppSelector((state) => state.boardReducer.columns);

    if (isFirstLoad) {
        setNewColumns(
            columns.map((col, i) => {
                return { ...col, id: i + 1 };
            })
        );
        setIsFirstLoad(false);
    }

    const validate = () => {
        setIsValid(false);
        if (!name.trim()) {
            return false;
        }
        for (let i = 0; i < newColumns.length; i++) {
            if (!newColumns[i].name.trim()) {
                return false;
            }
        }
        setIsValid(true);
        return true;
    };

    const handleonChange = (id: number, newValue: string) => {
        setNewColumns((prevState) => {
            const newState = [...prevState];
            const column = newState.find((col) => col.id === id);
            if (column) {
                column.name = newValue;
            }
            return newState;
        });
    };

    const onDelete = (id: number) => {
        setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
    };

    const onSubmit = () => {
        setIsBoardModalOpen(false);
        dispatch(editBoard({ name, newColumns }));
    };

    return (
        <div
            className="  fixed right-0 top-0 px-2 py-4  z-50 left-0 bottom-0 justify-center items-center flex "
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                setIsBoardModalOpen(false);
            }}
        >
            <div className="max-h-[95vh]  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8  py-8 rounded-xl">
                <h3 className=" text-lg ">Edit Board</h3>

                <div className="mt-8 flex flex-col space-y-1">
                    <label className="  text-sm dark:text-white text-gray-500">Board Name</label>
                    <input
                        className=" bg-transparent  px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
                        placeholder=" e.g Web Design"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="board-name-input"
                    />
                </div>

                <div className="mt-8 flex flex-col space-y-3">
                    <label className=" text-sm dark:text-white text-gray-500">Board Columns</label>

                    {newColumns.map((column, index) => (
                        <div key={index} className=" flex items-center w-full ">
                            <input
                                className=" bg-transparent flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]  "
                                onChange={(e) => {
                                    handleonChange(column.id, e.target.value);
                                }}
                                type="text"
                                value={column.name}
                            />
                            <Image
                                src={crossIcon}
                                onClick={() => {
                                    onDelete(column.id);
                                }}
                                className=" m-4 cursor-pointer "
                                width={100}
                                height={100}
                                alt="alt"
                            />
                        </div>
                    ))}
                    <div>
                        <button
                            className=" w-full items-center hover:opacity-70 dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full "
                            onClick={() => {
                                setNewColumns((state) => [
                                    ...state,
                                    { name: "", tasks: [], id: 4 },
                                ]);
                            }}
                        >
                            + Add New Column
                        </button>
                        <button
                            onClick={() => {
                                const isValid = validate();
                                if (isValid === true) onSubmit();
                            }}
                            className=" w-full items-center hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 relative  text-white bg-[#635fc7] py-2 rounded-full"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
