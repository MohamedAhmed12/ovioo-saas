import LoginForm from "@/components/Auth/Login/LoginForm";
import "@/styles/app/auth/login.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Ovioo",
};

export default function LoginPage() {
    return <LoginForm />;
}
