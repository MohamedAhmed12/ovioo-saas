"use client";

import DashBoardCard from "@/components/DashBoardCard";
import { useAppSelector } from "@/hooks/redux";
import { Member, Team } from "@/interfaces";
import { Avatar, Grid, Stack } from "@mui/material";
import { MdStar } from "react-icons/md";
import MembersActionDropDown from "./MembersActionDropDown";

export default function TeamMembersCard({
    headerTitle,
    team,
}: {
    headerTitle: string;
    team: Team;
}) {
    const currentUser = useAppSelector((state) => state.userReducer.user);

    if (!currentUser) return;

    const isCurrentUserOwner = team.owner_id == currentUser.id;

    return (
        <div className="Company Team basis-[48%] flex flex-col lg:flex-col px-5">
            <DashBoardCard headerTitle={headerTitle}>
                <Stack direction="column" spacing={2}>
                    {team.members.length > 0 &&
                        team.members.map((member: Member, index: number) => (
                            <Grid
                            key={index}
                                container
                                spacing={{ sm: "2", lg: "5" }}
                                alignItems="center"
                            >
                                <Grid item xs={1}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/1.jpg"
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <p className="mx-4 text-xs lg:text-base truncate">
                                        {member.fullname}
                                    </p>
                                </Grid>
                                <Grid item xs={2}>
                                    <Stack direction="row" alignItems="center">
                                        {member.id == team.owner_id ? (
                                            <>
                                                <span
                                                    className={`sm:mx-1 
                                                ${
                                                    isCurrentUserOwner &&
                                                    "lg:mr-3"
                                                }
                                                tracking-wider text-xs lg:text-base capitalize`}
                                                >
                                                    owner
                                                </span>
                                                <MdStar
                                                    className="!w-7"
                                                    style={{
                                                        fontSize: "1.35rem",
                                                        lineHeight: "1.75rem",
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <span
                                                    className={`sm:mx-1 text-xs lg:text-base capitalize text-slate-400 ${
                                                        !isCurrentUserOwner &&
                                                        "lg:mr-5"
                                                    }`}
                                                >
                                                    member
                                                </span>

                                                {isCurrentUserOwner && (
                                                    <MembersActionDropDown
                                                        member={member}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>
                        ))}
                </Stack>
            </DashBoardCard>
        </div>
    );
}
