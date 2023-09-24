"use client";

import "@/styles/app/auth/login.scss";
import { Button } from "@mui/joy";
import {
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { sign } from "crypto";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SSOWrapper from "./SSOWrapper";

export default function LoginForm() {
    const router = useRouter();
    const searchParam = useSearchParams();
    const callbackUrl = searchParam.get("callback") || undefined;

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        console.log("this is callback", callbackUrl);

        signIn("google", { callbackUrl });
        // router.push("/dashboard");
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
                <TextField name="email" label="Email address" />

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
                                    {/* <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} /> */}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
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
                onClick={handleClick}
                variant="solid"
                type="submit"
                className="auth-btn !mt-4"
            >
                Login
            </Button>
        </>
    );
}
