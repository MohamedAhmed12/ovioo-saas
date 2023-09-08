"use client";

import DashboardHeader from "@/components/Dashboard/Layout/Header/index";
import { useAppSelector } from "@/hooks/redux";
import { ModeEnum } from "@/interfaces/store/main";
import { useEffect, useState } from "react";
import Navbar from "@/components/Dashboard/Layout/Navbar/index";

const drawerWidth = 240;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
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
        <main className="flex min-h-screen flex-col dashboard-main-layout pt-32 pb-32 pl-80 pr-8 bg-slate-50 dark:bg-slate-800">         
           <DashboardHeader openNav={open} onOpenNav={() => setOpen(true)} />
            <Navbar openNav={open} onCloseNav={() => setOpen(false)} />
            {children}
        </main>
    );
}
