"use client";

import { Button as JoyButton } from "@mui/joy";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        router.push("/dashboard");
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Create your account
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
                Already have an account?
                <Link href="/auth/login" className="text-sm text-blue-600 ml-2">
                    Log in
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
                <Button fullWidth size="large" color="inherit" variant="outlined" className="!mx-5">
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
                <TextField required name="firstname" label="First name" type="text" />
                <TextField required name="lastname" label="Last name" type="text" />
                <TextField name="company" label="Company" type="text" />
                <TextField required name="email" label="Work email" type="email" />
                <TextField required name="password" label="Password" type="Password" />
                <TextField name="phone" label="Phone number" type="text" placeholder="+971" />
            </Stack>

            <JoyButton
                loading={loading}
                onClick={handleClick}
                variant="solid"
                type="submit"
                className="auth-btn mt-8 mb-2"
            >
                Create Account
            </JoyButton>

            <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
                <p>By creating account, you agree to Ovioo's</p>
                <Link href="/terms" className="ml-1 text-sm text-blue-600 font-normal">
                    Terms and Policies
                </Link>
            </Stack>
        </>
    );
}
