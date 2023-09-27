"use client";

import { useInput } from "@/hooks/useInput";
import { useRegister } from "@/hooks/useRegister";
import { AuthProviderEnum } from "@/interfaces";
import { Button as JoyButton } from "@mui/joy";
import { Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import SSOWrapper from "./SSOWrapper";

export default function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const { value: firstname, bind: bindFirstname } = useInput("");
    const { value: lastname, bind: bindLastname } = useInput("");
    const { value: email, bind: bindEmail } = useInput("");
    const { value: company, bind: bindCompany } = useInput("");
    const { value: password, bind: bindPassword } = useInput("");
    const { value: password_confirmation, bind: bindPasswordConfirmation } = useInput("");
    const { value: phone, bind: bindPhone } = useInput("");

    const router = useRouter();
    const register = useRegister;

    const handleSubmit = async () => {
        setLoading(true);

        await register({
            firstname,
            lastname,
            company,
            email,
            password,
            password_confirmation,
            phone: +phone,
            provider: AuthProviderEnum.Credentials,
        });

        toast.success("Account created successfully.", {
            position: "top-right",
        });
        router.push("/dashboard/task");
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

            <SSOWrapper />

            <Stack spacing={3}>
                <TextField
                    required
                    name="firstname"
                    label="First name"
                    type="text"
                    {...bindFirstname}
                />
                <TextField
                    required
                    name="lastname"
                    label="Last name"
                    type="text"
                    {...bindLastname}
                />
                <TextField name="company" label="Company" type="text" {...bindCompany} />
                <TextField required name="email" label="Work email" type="email" {...bindEmail} />
                <TextField
                    required
                    name="password"
                    label="Password"
                    type="Password"
                    {...bindPassword}
                />
                <TextField
                    required
                    name="password_confirmation"
                    label="Password Confirmation"
                    type="password"
                    {...bindPasswordConfirmation}
                />
                <TextField
                    name="phone"
                    label="Phone number"
                    type="text"
                    placeholder="+971"
                    {...bindPhone}
                />
            </Stack>

            <JoyButton
                loading={loading}
                onClick={() => {
                    handleSubmit();
                }}
                variant="solid"
                type="submit"
                className="auth-btn !mt-8 !mb-2"
            >
                {!loading && "Create Account"}
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
