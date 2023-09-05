"use client";

import "@/styles/app/globals.scss";
import {ReduxProvider} from "@/store/Provider";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <ReduxProvider>
            <html lang="en">
                <body>{children}</body>
            </html>
        </ReduxProvider>
    );
}
