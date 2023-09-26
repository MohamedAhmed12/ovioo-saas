"use client";

import { getClient } from "@/app/api/auth/[...nextauth]/apollo-client";
import { useInput } from "@/hooks/useInput";
import { gql, useMutation } from "@apollo/client";
import { Button as JoyButton } from "@mui/joy";
import { Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import SSOWrapper from "./SSOWrapper";

const Register = gql`
    mutation ($user: RegisterDto!) {
        register(user: $user) {
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

export default function RegisterForm() {
    const { value: firstname, bind: bindFirstname } = useInput("");
    const { value: lastname, bind: bindLastname } = useInput("");
    const { value: email, bind: bindEmail } = useInput("");
    const { value: company, bind: bindCompany } = useInput("");
    const { value: password, bind: bindPassword } = useInput("");
    const { value: password_confirmation, bind: bindPasswordConfirmation } = useInput("");
    const { value: phone, bind: bindPhone } = useInput("");

    const client = getClient();
    const [register, { data, loading, error }] = useMutation(Register, { client });

    const handleSubmit = async () => {
        await register({
            variables: {
                user: {
                    firstname,
                    lastname,
                    company,
                    email,
                    password,
                    password_confirmation,
                    phone: +phone,
                },
            },
        });
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
