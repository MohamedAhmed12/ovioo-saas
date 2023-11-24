import { useAppSelector } from "@/hooks/redux";
import { Project, RoleEnum, TaskInterface } from "@/interfaces";
import OviooDropDown from "../../OviooDropDown";
import Attachement from "./Attachement";

export default function TaskModalBody({
    task,
    projects,
    handleOnChange,
}: {
    task: TaskInterface;
    projects: Project[];
    handleOnChange: (name: string, value: any) => void;
}) {
    const isDesigner = useAppSelector((state) => state.userReducer.isDesigner);

    return (
        <div
            className={`task-modal__body p-[25px] ${
                !isDesigner ? "basis-1/2" : ""
            }`}
        >
            <input
                value={task.title}
                onChange={(e) => handleOnChange("title", e.target.value)}
                id="task-name-input"
                type="text"
                className="bg-transparent w-full px-4 py-2 outline-none focus:border-0 rounded-md text-3xl border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
                placeholder="Title e.g Create a landing page design"
                disabled={isDesigner}
            />
            <textarea
                value={task.description}
                onChange={(e) => handleOnChange("description", e.target.value)}
                id="task-description-input"
                className="mt-8 w-full  bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
                placeholder="Description e.g. we need to craft a visually engaging and user-friendly landing page design. The goal is to create a compelling online presence that effectively communicates the brand identity."
                disabled={isDesigner}
            />

            <p className="mt-8 mb-3 text-gray-500 tracking-widest text-sm">
                Project
            </p>
            <OviooDropDown
                initialVal={task.project?.id}
                options={projects}
                onSelected={(projectId) =>
                    handleOnChange("project", { id: projectId })
                }
                disabled={isDesigner}
                className="project-dropdown"
            />

            <Attachement task={task} />
        </div>
    );
}
