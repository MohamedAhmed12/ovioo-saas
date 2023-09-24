import RegisterForm from "@/components/Auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register | Ovioo",
};

export default function Register() {
    return <RegisterForm />;
}
