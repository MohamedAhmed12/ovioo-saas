"use client";

import { Project as ProjectInterface } from "@/interfaces";
import "@/styles/components/dashboard/project/project-card.scss";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

export default function ProjectCard({
    project,
    readOnly = false,
    actionURL,
}: {
    project: ProjectInterface;
    readOnly?: boolean;
    actionURL: string;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleToggle = (event: MouseEvent<HTMLElement> | null) => {
        setAnchorEl(event?.currentTarget ? event.currentTarget : null);
    };

    return (
        <Card className="project-card ovioo-card px-6 my-5 flex flex-col justify-center">
            {!readOnly && (
                <>
                    <CardHeader
                        avatar={
                            <p className="text-base dashboard-primary">
                                {project?.tasks?.length || 0} tasks
                            </p>
                        }
                        action={
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? "long-menu" : undefined}
                                aria-expanded={open ? "true" : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                                sx={{ color: "rgb(148 163 184)" }}
                            >
                                <MoreVertIcon />
                            </IconButton>
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
                        <MenuItem onClick={() => handleToggle(null)}>
                            <EditIcon fontSize="small" className="mr-3" />
                            edit project
                        </MenuItem>
                        <MenuItem onClick={() => handleToggle(null)}>
                            <DeleteOutlineIcon fontSize="small" className="mr-3" />
                            delete project
                        </MenuItem>
                    </Menu>
                </>
            )}

            <CardContent className="flex flex-col items-center">
                <Link href={actionURL}>
                    <Avatar src="https://picsum.photos/id/1/1000/1000" className="mb-5" />
                </Link>
                <Link href={actionURL}>
                    <h3 className="text-lg">{project.title}</h3>
                </Link>

                {!readOnly && (
                    <CardActions>
                        <Button color="primary" variant="outlined">
                            <AddIcon className="mr-1 font-bold" fontSize="small" /> new task
                        </Button>
                    </CardActions>
                )}
            </CardContent>
        </Card>
    );
}
