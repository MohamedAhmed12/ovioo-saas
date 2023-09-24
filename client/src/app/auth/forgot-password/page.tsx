import ForgotPassForm from "@/components/Auth/ForgotPassForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password | Ovioo",
};

export default function ForgotPasswordPage() {
    return <ForgotPassForm />;
}
