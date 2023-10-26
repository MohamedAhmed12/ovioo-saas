"use client";

import DashBoardCard from "@/components/DashBoardCard";
import { useForm } from "@/hooks/useForm";
import { useGraphError } from "@/hooks/useGraphError";
import { AuthProviderEnum } from "@/interfaces";
import { getClient } from "@/utils/getClient";
import { gql, useMutation } from "@apollo/client";
import { Button } from "@mui/joy";
import { IconButton, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Session } from "next-auth";
import { FormEvent, ReactNode, useState } from "react";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const CHANGE_PASSWORD = gql`
    mutation ($data: ChangePasswordDto!) {
        changePassword(data: $data)
    }
`;

export default function PasswordSetting({
    session,
    user,
}: {
    session: Session | null;
    user: any;
}): ReactNode {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const client = getClient(session);
    const { errors, errorHandler } = useGraphError({});
    const { handleOnChange } = useForm(setFormData);

    const [changePassword] = useMutation(CHANGE_PASSWORD, { client });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);

        try {
            const { data } = await changePassword({
                variables: { data: formData },
            });

            toast.success("Password changed successfully");
            errorHandler({});
        } catch (e) {
            errorHandler(e);
        }

        setLoading(false);
    };

    return (
        user?.provider === AuthProviderEnum.Credentials && (
            <DashBoardCard
                handleSubmit={handleSubmit}
                headerTitle="Security Settings"
            >
                <>
                    <div className="flex flex-col px-[35px] py-[24px]">
                        <div className="flex flex-col">
                            <TextField
                                className="!m-0 dashboard-input"
                                margin="normal"
                                required
                                fullWidth
                                name="current_password"
                                label="Current Password"
                                id="password"
                                type="password"
                                error={errors.hasOwnProperty(
                                    "current_password"
                                )}
                                helperText={errors["current_password"]}
                                value={formData.current_password}
                                onChange={handleOnChange}
                            />
                            <TextField
                                required
                                name="password"
                                className="!mt-6 dashboard-input"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <AiFillEye />
                                                ) : (
                                                    <AiFillEyeInvisible />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={errors.hasOwnProperty("password")}
                                helperText={errors["password"]}
                                value={formData.password}
                                onChange={handleOnChange}
                            />
                            <TextField
                                required
                                name="password_confirmation"
                                className="!mt-6 dashboard-input"
                                label="Password Confirmation"
                                type={
                                    showPasswordConfirmation
                                        ? "text"
                                        : "password"
                                }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPasswordConfirmation(
                                                        !showPasswordConfirmation
                                                    )
                                                }
                                                edge="end"
                                            >
                                                {showPasswordConfirmation ? (
                                                    <AiFillEye />
                                                ) : (
                                                    <AiFillEyeInvisible />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={errors.hasOwnProperty(
                                    "password_confirmation"
                                )}
                                helperText={errors["password_confirmation"]}
                                value={formData.password_confirmation}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="flex w-full justify-end mt-5 px-[35px]">
                        <Button
                            loading={loading}
                            type="submit"
                            className="dashboard__btn"
                        >
                            change password
                        </Button>
                    </div>
                </>
            </DashBoardCard>
        )
    );
}
