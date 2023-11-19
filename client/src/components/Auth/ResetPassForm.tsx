"use client";

import { useForm } from "@/hooks/useForm";
import { useGraphError } from "@/hooks/useGraphError";
import "@/styles/app/auth/login.scss";
import { getClient } from "@/utils/getClient";
import { gql, useMutation } from "@apollo/client";
import { Button as JoyButton } from "@mui/joy";
import {
    Alert,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const RESET_PASSWORD = gql`
    mutation ResetPassword($data: ResetPasswordDto!) {
        resetPassword(data: $data)
    }
`;

export default function ResetPassForm({ token }: { token: string }) {
    const [showPass, setShowPass] = useState(false);
    const [showPassConfirmation, setShowPassConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [invalidTokenErr, setInvalidTokenErr] = useState<string | null>("");
    const [formData, setFormData] = useState({
        password: "",
        password_confirmation: "",
        resetToken: token,
    });

    const router = useRouter();
    const { errors, setErrors, errorHandler } = useGraphError({});
    const { handleOnChange } = useForm(setFormData);

    const { data: session } = useSession({ required: true });
    const client = getClient(session);
    const [resetPassword] = useMutation(RESET_PASSWORD, { client });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setInvalidTokenErr(null);

        try {
            const { data } = await resetPassword({
                variables: {
                    data: formData,
                },
            });
            data && toast.success("Reset password email sent successfully");
            router.push("/auth/login");
        } catch (e: any) {
            const error = e?.graphQLErrors?.[0]?.extensions?.originalError;

            setErrors({});
            error && error.message[0].hasOwnProperty("resetToken")
                ? setInvalidTokenErr(error.message[0]["resetToken"])
                : errorHandler(e);

            // reset
            setFormData((form) => ({
                ...form,
                password: "",
                password_confirmation: "",
            }));
            setLoading(false);
        }
    };

    return (
        <form className="px-10" onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom>
                Reset Password
            </Typography>

            {invalidTokenErr && (
                <Alert
                    severity="error"
                    style={{
                        fontWeight: 600,
                        padding: "11px 20px",
                        lineHeight: "1.5rem",
                    }}
                    className="items-center !rounded-[10px]"
                >
                    {invalidTokenErr}
                </Alert>
            )}

            <Stack spacing={3}>
                <TextField
                    required
                    name="password"
                    className="!mt-6"
                    label="Password"
                    type={showPass ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPass(!showPass)}
                                    edge="end"
                                >
                                    {showPass ? (
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
                    className="!mt-6"
                    label="Password Confirmation"
                    type={showPassConfirmation ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() =>
                                        setShowPassConfirmation(
                                            !showPassConfirmation
                                        )
                                    }
                                    edge="end"
                                >
                                    {showPassConfirmation ? (
                                        <AiFillEye />
                                    ) : (
                                        <AiFillEyeInvisible />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    error={errors.hasOwnProperty("password_confirmation")}
                    helperText={errors["password_confirmation"]}
                    value={formData.password_confirmation}
                    onChange={handleOnChange}
                />
            </Stack>

            <JoyButton
                loading={loading}
                variant="solid"
                type="submit"
                className="auth-btn !mt-4 w-full"
            >
                {!loading && "Reset Password"}
            </JoyButton>
        </form>
    );
}
