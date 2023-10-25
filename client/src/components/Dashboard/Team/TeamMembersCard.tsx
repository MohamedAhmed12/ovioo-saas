"use client";

import DashBoardCard from "@/components/DashBoardCard";
import { useAppSelector } from "@/hooks/redux";
import { Member, Team } from "@/interfaces";
import { getClient } from "@/utils/getClient";
import { gql, useMutation } from "@apollo/client";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import { Avatar, Stack } from "@mui/material";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoMdMore } from "react-icons/io";
import { MdEdit, MdFileCopy, MdStar } from "react-icons/md";

const DELETE_MEMBER = gql`
    mutation ($member: DeleteMemberDto!) {
        deleteMember(member: $member)
    }
`;
const TRANSFER_OWNERSHIP = gql`
    mutation ($id: String!) {
        transferOwnership(id: $id)
    }
`;

export default function TeamMembersCard({
    headerTitle,
    team,
    session,
}: {
    headerTitle: string;
    team: Team;
    session: Session | null;
}) {
    const router = useRouter();
    const client = getClient(session);
    const [deleteMember] = useMutation(DELETE_MEMBER, { client });
    const [transferOwnership] = useMutation(TRANSFER_OWNERSHIP, { client });
    const currentUser = useAppSelector((state) => state.userReducer.user);

    if (!currentUser) return;

    const isCurrentUserOwner = team.owner_id == currentUser.id;

    const handleTransferOwnership = async (id: string) => {
        try {
            const { data } = await transferOwnership({
                variables: {
                    id,
                },
            });
            router.refresh();
            toast.success(
                "The selected member has been nominated by the owner."
            );
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
    };

    const handleRemoveMember = async (id: string) => {
        try {
            const { data } = await deleteMember({
                variables: {
                    member: {
                        id,
                    },
                },
            });
            router.refresh();
            toast.success("Member deleted successfully.");
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="Company Team basis-[48%] flex flex-col lg:flex-col px-5">
            <DashBoardCard headerTitle={headerTitle}>
                <div className="flex flex-col">
                    {team.members.map((member: Member, index: number) => (
                        <Stack
                            direction="row"
                            spacing={{ sm: "2", lg: "5" }}
                            justifyContent="space-between"
                            alignItems="center"
                            key={index}
                            className="mt-4"
                        >
                            <span className="flex items-center">
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                />
                                <p className="mx-4 text-xs lg:text-base">
                                    {member.fullname}
                                </p>
                            </span>

                            {member.id == team.owner_id ? (
                                <span className="flex text-slate-400">
                                    <span
                                        className={`sm:mx-1 
                                        ${isCurrentUserOwner && "lg:mr-3"}
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
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <span
                                        className={`
                                        sm:mx-1 text-xs lg:text-base capitalize text-slate-400
                                        ${!isCurrentUserOwner && "lg:mr-5"}`}
                                    >
                                        member
                                    </span>

                                    {isCurrentUserOwner && (
                                        <Dropdown>
                                            <MenuButton
                                                slots={{ root: IconButton }}
                                                slotProps={{
                                                    root: {
                                                        variant: "outlined",
                                                        color: "neutral",
                                                    },
                                                }}
                                                sx={{
                                                    color: "rgb(148 163 184)",
                                                    minWidth: "unset",
                                                }}
                                                className="!border-none hover:!bg-transparent !p-0"
                                            >
                                                <IoMdMore />
                                            </MenuButton>
                                            <Menu
                                                slotProps={{
                                                    root: {
                                                        className: "ovioo-card",
                                                    },
                                                }}
                                                placement="bottom-end"
                                            >
                                                <MenuItem
                                                    onClick={() =>
                                                        handleTransferOwnership(
                                                            member.id
                                                        )
                                                    }
                                                    className={`!text-blue-500 hover:!brightness-125 hover:!bg-transparent`}
                                                >
                                                    <MdEdit
                                                        size="20"
                                                        className="mr-3"
                                                    />
                                                    Transfer Ownership
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() =>
                                                        handleRemoveMember(
                                                            member.id
                                                        )
                                                    }
                                                    className={`!text-red-500 hover:!brightness-125 hover:!bg-transparent`}
                                                >
                                                    <MdFileCopy
                                                        size="20"
                                                        className="mr-3"
                                                    />
                                                    Remove member
                                                </MenuItem>
                                            </Menu>
                                        </Dropdown>
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
