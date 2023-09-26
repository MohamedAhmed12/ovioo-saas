"use client";

import { getClient } from "@/app/api/auth/[...nextauth]/apollo-client";
import { useInput } from "@/hooks/useInput";
import "@/styles/app/auth/login.scss";
import { gql, useMutation } from "@apollo/client";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/joy";
import {
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SSOWrapper from "./SSOWrapper";

const Login = gql`
    mutation ($user: LoginDto!) {
        login(user: $user) {
            id
            firstname
            lastname
            email
            avatar
            created_at
            updated_at
        }
    }
`;

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { value: email, bind: bindEmail } = useInput("");
    const { value: password, bind: bindPassword } = useInput("");

    const searchParam = useSearchParams();
    const callbackUrl = searchParam.get("callback") || "/dashboard/task";

    const client = getClient();
    const [login] = useMutation(Login, { client });

    const handleSubmit = async () => {
        setLoading(true);

        const { data } = await login({
            variables: {
                user: {
                    email,
                    password,
                },
            },
        });

        if (data && data?.login) await signIn("credentials", { callbackUrl, data: data?.login });
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Sign in to Ovioo
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
                Don’t have an account?
                <Link href="/auth/register" className="text-sm text-blue-600 ml-2">
                    Get started
                </Link>
            </Typography>

            <SSOWrapper />

            <Stack spacing={3}>
                <TextField name="email" label="Email address" {...bindEmail} />

                <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    {...bindPassword}
                />
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ my: 2 }}
            >
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Link href="/auth/forgot-password" className="text-sm text-blue-600 font-normal">
                    Forgot password?
                </Link>
            </Stack>

            <Button
                loading={loading}
                onClick={handleSubmit}
                variant="solid"
                type="submit"
                className="auth-btn !mt-4"
            >
                {!loading && "Login"}
            </Button>
        </>
    );
}
