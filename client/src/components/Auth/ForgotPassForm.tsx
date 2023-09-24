"use client";

import "@/styles/app/auth/login.scss";
import { Button as JoyButton } from "@mui/joy";
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPassForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        router.push("/dashboard");
    };

    return (
        <div className="px-10">
            <Typography variant="h4" gutterBottom>
                Reset Password
            </Typography>

            <Stack spacing={3}>
                <TextField name="email" label="Email address" />
            </Stack>

            <JoyButton
                loading={loading}
                onClick={handleClick}
                variant="solid"
                type="submit"
                className="auth-btn !mt-4 w-full"
            >
                Send Password Reset Link
            </JoyButton>
        </div>
    );
}
