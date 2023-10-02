import CompanyForm from "@/components/Dashboard/Company/CompanyForm";
import { authOptions } from "@/constants/authOptions";
import { getServerSession } from "next-auth";

export default async function Company() {
    const session = await getServerSession(authOptions);

    return session && <CompanyForm session={session} />;
}
