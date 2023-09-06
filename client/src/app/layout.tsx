"use client";

import { ReduxProvider } from "@/store/Provider";
import "@/styles/app/globals.scss";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <ReduxProvider>
            <html lang="en">
                <body className="dark:bg-slate-800">{children}</body>
            </html>
        </ReduxProvider>
    );
}
