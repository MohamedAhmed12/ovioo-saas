"use client";

import LeftSideCover from "@/components/Auth/LeftSideCover";
import "@/styles/app/auth/layout.scss";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("error");

    useEffect(() => {
        if (callbackUrl) {
            toast.error("Something went wrong!");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between auth-layout">
            <div className="login flex w-full">
                <LeftSideCover />
                <div className="form__wrapper basis-[55%] bg-white text-black">
                    {children}
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            style: {
                                maxWidth: 600,
                            },
                        }}
                    />
                </div>
            </div>
        </main>
    );
}
