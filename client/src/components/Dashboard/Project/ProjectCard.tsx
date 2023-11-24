"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Project as ProjectInterface } from "@/interfaces";
import { deleteProject as storeDeleteProject } from "@/store/features/project";
import "@/styles/components/dashboard/project/project-card.scss";
import { ApolloClient, gql, useMutation } from "@apollo/client";
import { Avatar, CardHeader } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

const DELETE_PROJECT = gql`
    mutation ($id: String!) {
        deleteProject(id: $id)
    }
`;

export default function ProjectCard({
    project,
    readOnly = false,
    actionURL,
    client,
    onEditProject,
}: {
    project: ProjectInterface;
    readOnly?: boolean;
    actionURL: string;
    client?: ApolloClient<any> | undefined;
    onEditProject?: (project: ProjectInterface) => void;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const dispatch = useAppDispatch();
    const [deleteProject] = useMutation(DELETE_PROJECT, { client });
    const isManager = useAppSelector((state) => state.userReducer.isManager);

    const handleToggle = (event: MouseEvent<HTMLElement> | null) => {
        setAnchorEl(event?.currentTarget ? event.currentTarget : null);
    };
    const handleDeleteProject = async (id: string) => {
        try {
            const { data } = await deleteProject({
                variables: {
                    id: project.id,
                },
            });

            dispatch(storeDeleteProject(project.id));
            toast.success("Project deleted successfully");
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
        handleToggle(null);
    };

    const handleEditProject = () => {
        onEditProject && onEditProject(project);
        handleToggle(null);
    };

    return (
        <Card className="project-card ovioo-card p-6 my-5 flex flex-col justify-start truncate">
            {
                <>
                    <CardHeader
                        avatar={
                            <div className="flex flex-col">
                                {/* TO DO: prototype either remove this owner prototype or enhance it's UI */}
                                {isManager && (
                                    <p className="text-base dashboard-primary block">
                                        owner: test team
                                    </p>
                                )}
                                <p className="text-base dashboard-primary block mb-1">
                                    {project?.tasks?.length || 0} tasks
                                </p>
                            </div>
                        }
                        action={
                            !readOnly && (
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={
                                        open ? "long-menu" : undefined
                                    }
                                    aria-expanded={open ? "true" : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                    sx={{ color: "rgb(148 163 184)" }}
                                >
                                    <IoMdMore />
                                </IconButton>
                            )
                        }
                    />
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            "aria-labelledby": "long-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => handleToggle(null)}
                        PaperProps={{
                            style: {
                                maxHeight: 48 * 4.5,
                                width: "20ch",
                            },
                        }}
                    >
                        <MenuItem onClick={handleEditProject}>
                            <MdEdit size="20" className="mr-3" />
                            edit project
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleDeleteProject(project.id)}
                        >
                            <MdDeleteOutline size="20" className="mr-3" />
                            delete project
                        </MenuItem>
                    </Menu>
                </>
            }

            <CardContent className="flex flex-col items-center">
                <Link href={actionURL}>
                    <Avatar
                        src="https://picsum.photos/id/1/1000/1000"
                        className="mb-5"
                    />
                </Link>
                <Link href={actionURL} className="truncate max-w-full">
                    <h3 className="text-lg truncate mb-5">{project.title}</h3>
                </Link>

                {!readOnly && (
                    <CardActions>
                        <Button color="primary" variant="outlined">
                            <FaPlus className="mr-1" size="15" />
                            new task
                        </Button>
                    </CardActions>
                )}
            </CardContent>
        </Card>
    );
}
