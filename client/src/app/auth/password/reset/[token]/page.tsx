import ResetPassForm from "@/components/Auth/ResetPassForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password | Ovioo",
};

export default function ResetPasswordPage({
    params: { token },
}: {
    params: { token: string };
}) {
    return <ResetPassForm token={token} />;
}
