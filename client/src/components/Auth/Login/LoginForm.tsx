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

export default function LoginForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        router.push("/dashboard");
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

            <div className="flex flex-row spacing-2 social-btn-group">
                <Button fullWidth size="large" color="inherit" variant="outlined">
                    <Image
                        src="/svg/social/google.svg"
                        width={22}
                        height={22}
                        alt="linkedin icon"
                    ></Image>
                </Button>
                <Button fullWidth size="large" color="inherit" variant="outlined" className="mx-5">
                    <Image
                        src="/svg/social/facebook.svg"
                        width={22}
                        height={22}
                        alt="linkedin icon"
                    ></Image>
                </Button>
                <Button fullWidth size="large" color="inherit" variant="outlined">
                    <Image
                        src="/svg/social/linkedin.svg"
                        width={22}
                        height={22}
                        alt="linkedin icon"
                    ></Image>
                </Button>
            </div>

            <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    OR
                </Typography>
            </Divider>

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

            <JoyButton
                loading={loading}
                onClick={handleClick}
                variant="solid"
                type="submit"
                className="auth-btn !mt-4"
            >
                Login
            </JoyButton>
        </>
    );
}
