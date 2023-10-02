"use client"; // Error components must be Client Components

import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();
    const user = useAppSelector((state) => state.userReducer.user);
    const [customError, setCustomError] = useState("");

    useEffect(() => {
        if (!user) {
            setCustomError("You have to login in order to view this page.");
            const timer = setTimeout(() => router.push("/auth/login"), 1000);
            return () => clearTimeout(timer);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, user]);

    return (
        <div className="bg-black">
            <h2>{customError || "Something went wrong!"}</h2>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    );
}
