"use client";

import DashBoardCard from "@/components/DashBoardCard";
import { useAppSelector } from "@/hooks/redux";
import { useForm } from "@/hooks/useForm";
import { useGraphError } from "@/hooks/useGraphError";
import { Team, User as UserInterface } from "@/interfaces";
import { getClient } from "@/utils/getClient";
import { gql, useMutation } from "@apollo/client";
import { Button } from "@mui/joy";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const CREATE_MEMBER = gql`
    mutation createMember($member: CreateMemberDto!) {
        createMember(member: $member) {
            id
            email
            provider
            role
            team {
                id
            }
            profile {
                company_name
            }
        }
    }
`;

export default function AddTeamMemberCard({
    session,
    team,
    headerTitle,
}: {
    session: Session | null;
    team: Team;
    headerTitle: string;
}) {
    const [loading, setLoading] = useState(false);
    const [userAdded, setUserAdded] = useState<boolean>(false);
    const [formData, setFormData] = useState<UserInterface>({
        email: "",
        fullname: "",
    });

    const router = useRouter();
    const { handleOnChange } = useForm(setFormData);
    const currentUser = useAppSelector((state) => state.userReducer.user);
    const { errors, errorHandler } = useGraphError({});
    const client = getClient(session);
    const [createMember] = useMutation(CREATE_MEMBER, {
        client,
    });

    if (currentUser?.id != team?.owner_id) return;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const { data } = await createMember({
                variables: {
                    member: formData,
                },
            });

            router.refresh();
            setUserAdded(true);
            errorHandler({});

            setTimeout(() => {
                setUserAdded(false);
            }, 2000);
        } catch (e: any) {
            errorHandler(e);
        }

        setLoading(false);
    };

    return (
        <div className="new-user basis-[52%] flex flex-raw lg:flex-col px-5">
            <DashBoardCard headerTitle={headerTitle} handleSubmit={handleSubmit}>
                <>
                    <div className="flex flex-row">
                        <div className="w-full flex flex-col">
                            <Stack sx={{ width: "100%" }} spacing={2} className="mb-7">
                                {userAdded && (
                                    <Alert
                                        severity="success"
                                        style={{
                                            fontWeight: 600,
                                            padding: "11px 20px",
                                            lineHeight: "1.5rem",
                                            marginBottom: 3,
                                        }}
                                        className="items-center !rounded-[10px]"
                                    >
                                        New teammate was added! The invitation has been sent to
                                        {formData.email}
                                    </Alert>
                                )}
                                <Alert
                                    severity="info"
                                    style={{
                                        fontWeight: 600,
                                        padding: "11px 20px",
                                        lineHeight: "1.5rem",
                                    }}
                                    className="items-center !rounded-[10px]"
                                >
                                    Users will be able to manage tasks and receive notifications.
                                    Only you can add and delete your team users.
                                </Alert>
                            </Stack>
                            <TextField
                                className="dashboard-input"
                                margin="normal"
                                required
                                value={formData.email}
                                onChange={(e) => {
                                    handleOnChange(e);
                                    setUserAdded(false);
                                }}
                                fullWidth
                                name="email"
                                label="Email Address"
                                type="email"
                                id="email"
                                error={errors.hasOwnProperty("email")}
                                helperText={errors["email"]}
                            />

                            <TextField
                                className="dashboard-input"
                                margin="normal"
                                required
                                value={formData.fullname}
                                onChange={(e) => {
                                    handleOnChange(e);
                                    setUserAdded(false);
                                }}
                                fullWidth
                                id="full-name"
                                label="full name"
                                name="fullname"
                                error={errors.hasOwnProperty("fullname")}
                                helperText={errors["fullname"]}
                            />
                        </div>
                    </div>
                    <div className="flex w-full justify-end mt-6">
                        <Button loading={loading} className="dashboard__btn" type="submit">
                            add member
                        </Button>
                    </div>
                </>
            </DashBoardCard>
        </div>
    );
}
