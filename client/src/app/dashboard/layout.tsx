import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ovioo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <main className="flex min-h-screen flex-col items-center justify-between dashboard-main-layout">
                    {children}
                </main>
            </body>
        </html>
    );
}
