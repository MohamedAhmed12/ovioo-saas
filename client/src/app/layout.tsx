import SessionProvider from "@/components/Providers/SessionProvider";
import { ReduxProvider } from "@/components/Providers/ReduxProvider";
import "@/styles/app/globals.scss";
import localFont from "next/font/local";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";

const myFont = localFont({
    display: "swap",
    fallback: ["sans-serif"],
    variable: "--font-ukraine",
    src: [
        {
            path: "../../public/fonts/E-Ukraine-Light.woff",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/fonts/E-Ukraine-Medium.woff",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/E-Ukraine-UltraLight.woff",
            weight: "200",
            style: "normal",
        },
        {
            path: "../../public/fonts/E-Ukraine-Regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/E-Ukraine-Bold.otf",
            weight: "700",
            style: "normal",
        },
    ],
});

export default async function RootLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession();
    return (
        <ReduxProvider>
            <SessionProvider session={session}>
                <html lang="en">
                    <body className={myFont.className}>{children}</body>
                </html>
            </SessionProvider>
        </ReduxProvider>
    );
}
