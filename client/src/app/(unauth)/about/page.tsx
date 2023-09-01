"use client";

import Stepper from "@/components/about/Stepper";
import "@/styles/app/unauth/about-us.scss";
import { Typography } from "@mui/material";
import Image from "next/image";
import ReactHtmlParser from "react-html-parser";

export default function Home() {
    const statistics: string[] = [
        "<p>Enthusiastic<br />and <strong className='h6'>devoted</strong></p>",
        "<p><strong className='h6'>Brave</strong>to express<br />ourselves</p>",
        "<p><strong className='h6'>Sincere</strong>&amp;<br />straightforward</p>",
    ];

    return (
        <>
            <div className="about flex flex-col">
                <div className="container title uppercase text-center">
                    <Typography variant="h2">
                        <span className="text-gradient-h1">
                            <strong>awesomic</strong>
                        </span>
                        <span className="title-span ml-4 mr-4">=</span>
                        <strong>awesome</strong> companies
                        <br />+ <strong>cosmic</strong> designers
                    </Typography>
                </div>

                <Stepper />
            </div>
            <div className="info container w-full flex-col lg:flex-row flex items-center justify-between mb-10 pr-2 pl-2 lg:pr-11 lg:pl-11">
                <h2 className="heading-style-h2 basis-1/2 text-center lg:text-left pr-20">
                    We’ve created an algorithm to help others, matching businesses with the best-fit
                    designers.
                </h2>
                <div className="basis-1/2 mt-8 lg:mt-0">
                    <Image src="/svg/smile.jpg" alt="smile" width={610} height={500} />
                </div>
            </div>
            <div className="section mt-25 mb-20">
                <div className="title-wrapper">
                    <h3 className="heading-style-h2 center mt-20">Our Values</h3>
                </div>
                <div className="values container w-full flex-col  flex items-center justify-between">
                    <div className="basis-1/2 mt-8">
                        <Image src="/svg/smile.jpg" alt="smile" width={800} height={720} />
                    </div>
                    <div className="statistics-container flex flex-col lg:flex-row mt-10">
                        {statistics.map((stat, index) => (
                            <div className="statistics-figures flex mt-8 lg:mt0">
                                <div className="statistics-number mr-7 lg:mr-4">
                                    <div className="about-figure">{index + 1}</div>
                                </div>
                                <div className="text-statistic">
                                    <div className="down-text text-xl">{ReactHtmlParser(stat)}</div>
                                </div>
                                {statistics.length !== index + 1 && (
                                    <div className="divider-about hidden lg:block mr-12 ml-12"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
