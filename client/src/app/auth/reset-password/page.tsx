'use client';

import AuthCard from "@/components/AuthCard";
import { FormEvent } from "react";


export default function Register() {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      };
    return(
        <div className="register flex flex-col items-center py-24">
            <AuthCard handleSubmit={handleSubmit}>
                <>
                </>
            </AuthCard>
        </div>
        )
}
