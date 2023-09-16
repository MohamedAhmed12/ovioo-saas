import ProjectCard from "@/components/Dashboard/Project/ProjectCard";

const projects = [
    {
        name: "first project",
        tasks: [
            {
                title: "First task",
                description: "",
                status: "Todo",
            },
            {
                title: "Second task",
                description: "",
                status: "Todo",
            },
        ],
    },
    {
        name: "second project",
        tasks: [
            {
                title: "First task",
                description: "",
                status: "Todo",
            },
            {
                title: "Second task",
                description: "",
                status: "Todo",
            },
        ],
    },
];

export default function Projects() {
    return (
        <div className="flex justify-start">
            {projects.map((project, i) => (
                <ProjectCard project={project} key={i} />
            ))}
        </div>
    );
}
