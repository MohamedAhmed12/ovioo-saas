import ForgotPassForm from "@/components/Auth/Login/ForgotPassForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password | Ovioo",
};

export default function ForgotPasswordPage() {
    return <ForgotPassForm />;
}
