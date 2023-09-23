import LeftSideCover from "@/components/Auth/LeftSideCover";
import "@/styles/app/auth/layout.scss";

export default function PublicLayout({ children }: { children: React.ReactNode }) {  
    return (
        <main className="flex min-h-screen flex-col items-center justify-between auth-layout">
            <div className="login flex w-full">
                <LeftSideCover />
                <div className="form__wrapper basis-[55%] bg-white text-black">
                    {children}
                </div>
            </div>
        </main>
    );
}
