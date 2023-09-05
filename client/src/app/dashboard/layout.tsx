import "@/styles/app/unauth/layout.scss";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: " Ovioo",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between main-layout">
            <NavBar/>
            {children}
            <Footer />
        </main>
    );
}
