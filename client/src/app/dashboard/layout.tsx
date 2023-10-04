import DashboardContainer from "@/components/Dashboard/Layout/DashboardContainer";
import { authOptions } from "@/constants/authOptions";
import "@/styles/app/dashboard/layout.scss";
import { getServerSession } from "next-auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    return session && <DashboardContainer session={session}>{children}</DashboardContainer>;
}
