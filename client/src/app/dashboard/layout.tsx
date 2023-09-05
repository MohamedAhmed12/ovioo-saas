"use client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between dashboard-main-layout">
            {children}
        </main>
    );
}
