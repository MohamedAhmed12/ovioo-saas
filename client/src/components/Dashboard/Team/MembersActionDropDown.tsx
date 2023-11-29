"use client";

import { Member } from "@/interfaces";
import { getClient } from "@/utils/getClient";
import { gql, useMutation } from "@apollo/client";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoMdMore } from "react-icons/io";
import { MdEdit, MdFileCopy } from "react-icons/md";

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

const MembersActionDropDown = ({ member }: { member: Member }) => {
    const router = useRouter();
    const session = useSession();
    const client = getClient(session);
    const [deleteMember] = useMutation(DELETE_MEMBER, { client });
    const [transferOwnership] = useMutation(TRANSFER_OWNERSHIP, { client });

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
                    onClick={() => handleTransferOwnership(member.id)}
                    className={`!text-blue-500 hover:!brightness-125 hover:!bg-transparent`}
                >
                    <MdEdit size="20" className="mr-3" />
                    Transfer Ownership
                </MenuItem>
                <MenuItem
                    onClick={() => handleRemoveMember(member.id)}
                    className={`!text-red-500 hover:!brightness-125 hover:!bg-transparent`}
                >
                    <MdFileCopy size="20" className="mr-3" />
                    Remove member
                </MenuItem>
            </Menu>
        </Dropdown>
    );
};

export default MembersActionDropDown;
