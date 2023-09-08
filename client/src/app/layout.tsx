"use client";

import { ReduxProvider } from "@/store/Provider";
import "@/styles/app/globals.scss";
import { ReactNode } from "react";
import localFont from "next/font/local";

const myFont = localFont({
    display: 'swap',
    fallback:["sans-serif"],
    variable: '--font-ukraine',
    src: [
        {
            path: '../../public/fonts/E-Ukraine-Light.woff',
            weight: "300",
            style: "normal",
        },
        {
            path: '../../public/fonts/E-Ukraine-Medium.woff',
            weight: "500",
            style: "normal",
        },
        {
            path: '../../public/fonts/E-Ukraine-UltraLight.woff',
            weight: "200",
            style: "normal",
        },
        {
            path: '../../public/fonts/E-Ukraine-Regular.otf',
            weight: "400",
            style: "normal",
        },
        {
            path: '../../public/fonts/E-Ukraine-Bold.otf',
            weight: "700",
            style: "normal",
        },
    ],
});

export default function RootLayout({ children }: { children: ReactNode }) {

    return (
        <ReduxProvider>
            <html lang="en" className="dark">
                <body className={myFont.className}>{children}</body>
            </html>
        </ReduxProvider>
    );
}
