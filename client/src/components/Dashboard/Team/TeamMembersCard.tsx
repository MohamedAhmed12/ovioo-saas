"use client";

import DashBoardCard from "@/components/DashBoardCard";
import { useAppSelector } from "@/hooks/redux";
import { Member, Team } from "@/interfaces";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarIcon from "@mui/icons-material/Star";
import { Avatar, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import { useState } from "react";

export default function TeamMembersCard({
    headerTitle,
    team,
}: {
    headerTitle: string;
    team: Team;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const currentUser = useAppSelector((state) => state.userReducer.user);
    if (!currentUser) return;

    const isCurrentUserOwner = team.owner_id == currentUser.id;

    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl((prevState) => (prevState == null ? event.currentTarget : null));
    };

    return (
        <div className="Company Team basis-[48%] flex flex-col lg:flex-col px-5">
            <DashBoardCard headerTitle={headerTitle}>
                <div className="flex flex-col">
                    {team.users.map((member: Member) => (
                        <Stack
                            direction="row"
                            spacing={{ sm: "2", lg: "5" }}
                            justifyContent="space-between"
                            alignItems="center"
                            key={member.id}
                            className="mt-4"
                        >
                            <span className="flex items-center">
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <p className="mx-4 text-xs lg:text-base">{member.fullname}</p>
                            </span>

                            {member.id == team.owner_id ? (
                                <span className="flex text-slate-400">
                                    <span
                                        className={`sm:mx-2 lg:ml-2 
                                        ${isCurrentUserOwner ? "lg:mr-4" : "s"}
                                         tracking-wider text-xs lg:text-base capitalize`}
                                    >
                                        owner
                                    </span>
                                    <StarIcon
                                        sx={{ fontSize: "1.25rem", lineHeight: "1.75rem" }}
                                    ></StarIcon>
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <span className="sm:mx-2 lg:mx-2 !mr-4 text-xs lg:text-base capitalize text-slate-400">
                                        member
                                    </span>

                                    {isCurrentUserOwner && (
                                        <>
                                            <IconButton
                                                aria-label="more"
                                                id="long-button"
                                                aria-controls={open ? "long-menu" : undefined}
                                                aria-expanded={open ? "true" : undefined}
                                                aria-haspopup="true"
                                                onClick={handleToggle}
                                                className="p-0 w-4"
                                                sx={{ color: "rgb(148 163 184)" }}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                id="long-menu"
                                                MenuListProps={{
                                                    "aria-labelledby": "long-button",
                                                    className: "ovioo-card",
                                                }}
                                                slotProps={{
                                                    paper: {
                                                        className: "!bg-transparent",
                                                    },
                                                }}
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleToggle}
                                                anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "right",
                                                }}
                                                transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "right",
                                                }}
                                            >
                                                <MenuItem
                                                    onClick={handleToggle}
                                                    disableRipple
                                                    className="dashboard__link"
                                                >
                                                    <EditIcon fontSize="small" className="mr-3" />
                                                    Transfer Ownership
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={handleToggle}
                                                    disableRipple
                                                    className="text-red-500"
                                                >
                                                    <FileCopyIcon
                                                        fontSize="small"
                                                        className="mr-3"
                                                    />
                                                    Remove member
                                                </MenuItem>
                                            </Menu>
                                        </>
                                    )}
                                </span>
                            )}
                        </Stack>
                    ))}
                </div>
            </DashBoardCard>
        </div>
    );
}
