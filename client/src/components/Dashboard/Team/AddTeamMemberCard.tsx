"use client";

import DashBoardCard from "@/components/DashBoardCard";
import { RoleEnum, User as UserInterface } from "@/interfaces";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { MouseEvent, useEffect, useState } from "react";

export default function AddTeamMemberCard({
    handleSubmit,
    headerTitle,
}: {
    handleSubmit: (event: UserInterface) => void;
    headerTitle: string;
}) {
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [newMember, setNewMember] = useState<UserInterface>({
        email: "",
        fullname: "",
        role: RoleEnum.MEMBER,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewMember({ ...newMember, [name]: value });
    };

    const onSubmit = (e: MouseEvent<HTMLElement>) => {
        handleSubmit(newMember);

        setShowInfo(true);
        setNewMember({
            email: "",
            fullname: "",
            role: RoleEnum.MEMBER,
        });
    };

    useEffect(() => console.log("red"), []);

    return (
        <DashBoardCard headerTitle={headerTitle}>
            <>
                <div className="flex flex-row">
                    <div className="w-full flex flex-col">
                        <Stack sx={{ width: "100%" }} spacing={2} className="mb-7">
                            {showInfo && (
                                <Alert
                                    severity="success"
                                    style={{
                                        fontWeight: 600,
                                        padding: "11px 20px",
                                        lineHeight: "1.5rem",
                                        marginBottom: 3,
                                    }}
                                    className="items-center rounded-md"
                                >
                                    The new teammate was added! The invitation has been sent to
                                    {newMember.email}
                                </Alert>
                            )}
                            <Alert
                                severity="info"
                                style={{
                                    fontWeight: 600,
                                    padding: "11px 20px",
                                    lineHeight: "1.5rem",
                                }}
                                className="items-center rounded-md"
                            >
                                Users will be able to manage tasks and receive notifications. Only
                                you can add and delete your team users.
                            </Alert>
                        </Stack>
                        <TextField
                            className="dashboard-input"
                            margin="normal"
                            required
                            value={newMember.email}
                            onChange={handleInputChange}
                            fullWidth
                            name="email"
                            label="Email Address"
                            type="email"
                            id="email"
                        />

                        <TextField
                            className="dashboard-input"
                            margin="normal"
                            required
                            value={newMember.fullname}
                            onChange={handleInputChange}
                            fullWidth
                            id="full-name"
                            label="full name"
                            name="fullname"
                            autoFocus
                        />
                    </div>
                </div>
                <div className="flex w-full justify-end mt-6">
                    <Button className="bg-[--dashboard-primary] text-white" onClick={onSubmit}>
                        add member
                    </Button>
                </div>
            </>
        </DashBoardCard>
    );
}
