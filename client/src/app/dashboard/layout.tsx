"use client";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/redux";
import { ModeEnum } from "@/interfaces/store/main";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const mode = useAppSelector((state) => state.mainReducer.mode);

    useEffect(() => {
        const htmlElement: HTMLElement = document.documentElement;

        if (htmlElement.classList.contains(ModeEnum.Dark))
            htmlElement.classList.remove(ModeEnum.Dark);

        if (htmlElement.classList.contains(ModeEnum.Light))
            htmlElement.classList.remove(ModeEnum.Light);

        htmlElement.classList.add(mode);
    }, [mode]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between dashboard-main-layout">
            {children}
        </main>
    );
}
