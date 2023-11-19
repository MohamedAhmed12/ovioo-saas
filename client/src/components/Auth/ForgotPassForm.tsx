"use client";

import { useGraphError } from "@/hooks/useGraphError";
import "@/styles/app/auth/login.scss";
import { getClient } from "@/utils/getClient";
import { gql, useMutation } from "@apollo/client";
import { Button as JoyButton } from "@mui/joy";
import { Stack, TextField, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const FORGET_PASSWORD = gql`
    mutation ForgetPassword($email: String!) {
        forgetPassword(email: $email)
    }
`;

export default function ForgotPassForm() {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const { errors, errorHandler } = useGraphError({});

    const { data: session } = useSession({ required: true });
    const client = getClient(session);
    const [forgetPassword] = useMutation(FORGET_PASSWORD, { client });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const { data } = await forgetPassword({
                variables: { email },
            });

            data && toast.success("Reset password email sent successfully");
        } catch (e: any) {
            errorHandler(e);
        }
        setEmail("");
        setLoading(false);
    };

    return (
        <form className="px-10" onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom>
                Forgot Password
            </Typography>

            <Stack spacing={3}>
                <TextField
                    name="email"
                    label="Email address"
                    type="email"
                    error={errors.hasOwnProperty("email")}
                    helperText={errors["email"]}
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Stack>

            <JoyButton
                loading={loading}
                variant="solid"
                type="submit"
                className="auth-btn !mt-4 w-full"
            >
                {!loading && "Send Password Reset Link"}
            </JoyButton>
        </form>
    );
}
