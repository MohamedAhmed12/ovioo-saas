"use client";

import "@/styles/app/auth/login.scss";
import { Button } from "@mui/joy";
import { Divider, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SSOWrapper() {
    const [googleBtnloading, setGoogleBtnloading] = useState(false);
    const [facebookBtnloading, setFacebookBtnloading] = useState(false);
    const [linkedInBtnloading, setLinkedInBtnloading] = useState(false);

    const searchParam = useSearchParams();
    const callbackUrl = searchParam.get("callback") || undefined;

    const SSOLogin = (provider: string) =>
        signIn(provider, { callbackUrl: callbackUrl || "/dashboard/task" });

    return (
        <>
            <div className="flex flex-row spacing-2 social-btn-group">
                <Button
                    fullWidth
                    size="lg"
                    variant="outlined"
                    loading={googleBtnloading}
                    onClick={() => {
                        SSOLogin("google");
                        setGoogleBtnloading(true);
                    }}
                >
                    {!googleBtnloading && (
                        <Image
                            src="/svg/social/google.svg"
                            width={22}
                            height={22}
                            alt="linkedin icon"
                        ></Image>
                    )}
                </Button>
                <Button
                    fullWidth
                    size="lg"
                    variant="outlined"
                    className="!mx-5"
                    loading={facebookBtnloading}
                    onClick={() => {
                        SSOLogin("facebook");
                        setFacebookBtnloading(true);
                    }}
                >
                    {!facebookBtnloading && (
                        <Image
                            src="/svg/social/facebook.svg"
                            width={22}
                            height={22}
                            alt="linkedin icon"
                        ></Image>
                    )}
                </Button>
                <Button
                    fullWidth
                    size="lg"
                    variant="outlined"
                    loading={linkedInBtnloading}
                    onClick={() => {
                        SSOLogin("linkedin");
                        setLinkedInBtnloading(true);
                    }}
                >
                    {!linkedInBtnloading && (
                        <Image
                            src="/svg/social/linkedin.svg"
                            width={22}
                            height={22}
                            alt="linkedin icon"
                        ></Image>
                    )}
                </Button>
            </div>

            <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    OR
                </Typography>
            </Divider>
        </>
    );
}
