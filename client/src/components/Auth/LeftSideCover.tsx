"use client";

import "@/styles/app/auth/left-side-cover.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ReactHtmlParser from "react-html-parser";

export default function LeftSideCover() {
    const pathname = usePathname();

    const leftSideTitle = () => {
        if (pathname == "/auth/login") {
            return "Hi, Welcome again";
        }

        if (pathname == "/auth/register") {
            return "Excited To Start <br /> Your Journey?";
        }

        return "Lost Your Password? <br /> No Worries, <br/> We've Got You Covered!";
    };

    return (
        <div className="basis-[45%] flex flex-col">
            <Link href="/" className="flex items-start w-full h-auto py-5 px-6 shadow-none">
                <Image src="/svg/logo.svg" width={100} height={40} alt="logo" className="h-auto" />
            </Link>

            <div className="styled-scetion__title hidden lg:flex flex-col flex-wrap items-center mt-16 text-center">
                <h3 className={`mb-10 ${!pathname.includes("/auth/password") ? 'text-5xl leading-[3.6rem]': 'text-[2rem] leading-[3.3rem]'}`}>
                    {ReactHtmlParser(leftSideTitle())}
                </h3>
                <Image
                    src="/images/planeta.png"
                    alt="login"
                    width={200}
                    height={200}
                    className="w-[80%] h-auto"
                />
            </div>
        </div>
    );
}
