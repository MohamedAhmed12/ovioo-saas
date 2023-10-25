"use client";

import "@/styles/components/home/adv-section.scss";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { Box, Paper } from "@mui/material";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";

export const AdvantageSection = () => {
    const disAdvantages: string[] = [
        "Searching for a freelancer",
        "Unvetted designers",
        "Slow turnaround times",
        "Scrolling through 100s of portfolios",
        "Conducting dozens of interviews",
        "And still having no one to hire",
    ];

    return (
        <div className="adv-section__stars-bg flex w-full justify-center">
            <div
                className="container adv-section flex flex-col lg:flex-row mt-40 mb-10 pr-5 pl-5"
                style={{ color: "#fee4a5" }}
            >
                <div className="flex flex-col basis-1/2">
                    <Card className="w-full h-full p-0">
                        <CardContent className="card-content pr-10 pl-10 lg:p-0">
                            <h1 className="text-white text-3xl lg:text-5xl font-bold mb-5">
                                Your design work should be simple
                            </h1>
                            <p className="text-lg lg:text-2xl text-white">
                                Say goodbye to...
                            </p>
                            <Image
                                src="/svg/astronuat-sleeping.svg"
                                loading="lazy"
                                width="546"
                                height="580"
                                alt=""
                            />
                        </CardContent>
                    </Card>
                </div>
                <Box className="flex flex-col basis-1/2 paper-box justify-center lg:justify-end content-start">
                    {disAdvantages.map((disAdv, index) => (
                        <Paper
                            key={index}
                            elevation={5}
                            className="flex items-center rounded-md"
                        >
                            <FaXmark className="mr-2 text-red-800" />
                            {disAdv}
                        </Paper>
                    ))}
                </Box>
            </div>
        </div>
    );
};
