"use client";

import BottomWrapper from "@/components/BottomWrapper";
import { StatsSection } from "@/components/Home/StatsSection";
import PlansCard from "@/components/Pricing/PlansCard";
import PlansHelpCard from "@/components/Pricing/PlansHelpCard";
import { FAQ as FAQInterface } from "@/interfaces";
import "@/styles/app/unauth/pricing.scss";
import Box from "@mui/joy/Box";
import { Typography } from "@mui/material";

export default function Pricing() {
    const plans: {
        bgColor?: string;
        title: string;
        tag: string;
        dailyFees: number;
        monthlyFees: number;
        fullTime: boolean;
        includes: string[];
    }[] = [
        {
            tag: "basic",
            title: "standard",
            dailyFees: 35,
            monthlyFees: 668,
            fullTime: false,
            includes: [
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "Soluta omnis ea obcaecati nihil.",
                "Blanditiis assumenda nemo laborum quisquam sed",
                "iure tenetur accusantium quidem totam quas incidunt tempore esse consequuntur numquam",
            ],
        },
        {
            bgColor: "neutral.700",
            tag: "basic",
            title: "pro",
            dailyFees: 35,
            monthlyFees: 668,
            fullTime: false,
            includes: [
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "Soluta omnis ea obcaecati nihil.",
                "Blanditiis assumenda nemo laborum quisquam sed",
                "iure tenetur accusantium quidem totam quas incidunt tempore esse consequuntur numquam",
            ],
        },
        {
            bgColor: "neutral.900",
            tag: "basic",
            title: "1 to 1",
            dailyFees: 35,
            monthlyFees: 668,
            fullTime: false,
            includes: [
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "Soluta omnis ea obcaecati nihil.",
                "Blanditiis assumenda nemo laborum quisquam sed",
                "iure tenetur accusantium quidem totam quas incidunt tempore esse consequuntur numquam",
            ],
        },
    ];

    const faq: FAQInterface[] = [
        {
            question: "Every day business updates - what’s that?",
            answer: "Every business day, your designer will provide you with an update on your task, or switch to a new one when it's completed.",
        },
        {
            question: "How many designs do I get in a month?",
            answer: "This depends on the complexity and number of iterations for each task. Every task is different, but we guarantee you will receive daily design updates.",
        },
    ];

    return (
        <div className="pricing w-full">
            <div className="intro flex flex-col mt-36 mb-20">
                <div className="container title text-center">
                    <Typography variant="h3" className="uppercase font-bold">
                        Memberships levels
                    </Typography>
                    <Typography variant="h5" className="mt-4">
                        Choose a plan <span className="text-gradient">that's right for you.</span>
                    </Typography>
                </div>
            </div>

            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
                    gap: 5,
                }}
            >
                {plans.map((plan) => (
                    <PlansCard {...plan} key={plan.title} />
                ))}
            </Box>

            <PlansHelpCard />
            <StatsSection title="Replace your entire design department with a single subscription" />
            <BottomWrapper faq={faq} />
        </div>
    );
}
