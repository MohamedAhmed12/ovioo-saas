"use client";

import "@/styles/components/home/pyramid-section.scss";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import { Box, Breadcrumbs, Button, MobileStepper, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { MouseEvent, useState } from "react";

export const PyramidSection = () => {
    const titles = ["Quality", "Speed", "Cost"];
    const steps = [
        {
            label: "Vetted Designers Only",
            description: `Access our global community of top talent.`,
        },
        {
            label: "24 Hour Turnaround",
            description: "Get daily updates to your tasks.",
        },
        {
            label: "Save up to $5k per month",
            description: `Save on a full-time designer salary plus the hiring expenses. Just a flat monthly subscription.`,
        },
    ];

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) =>
            prevActiveStep != maxSteps - 1 ? prevActiveStep + 1 : (prevActiveStep = 0)
        );
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) =>
            prevActiveStep != 0 ? prevActiveStep - 1 : (prevActiveStep = 2)
        );
    };
    const handleTitleClick = (index: number) => setActiveStep(index);

    return (
        <div className="pyramid-section__stars-bg flex w-full justify-center">
            <div className="container pyramid-section flex flex-col lg:flex-row mt-10 mb-5 lg:mb-10 pr-20 pl-20">
                <div className="text-3xl basis-2/3 mb-14 lg:mb-0">
                    <Image src="/svg/smile.jpg" alt="smile" width={610} height={700} />
                </div>
                <div className="text-4xl basis-1/3 font-bold">
                    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                        <Breadcrumbs aria-label="breadcrumb" className="mb-12">
                            {titles.map((title, index) => (
                                <Typography
                                    variant="h5"
                                    className={
                                        activeStep == index
                                            ? "selected text-secondary underline underline-offset-[20px]"
                                            : ""
                                    }
                                    onClick={() => handleTitleClick(index)}
                                >
                                    {title}
                                </Typography>
                            ))}
                        </Breadcrumbs>
                        <Box className="mb-4 text-secondary">
                            <Typography variant="h5">{steps[activeStep].label}</Typography>
                        </Box>
                        <Box className="description-box">
                            <Typography>{steps[activeStep].description}</Typography>
                        </Box>
                        <MobileStepper
                            variant="text"
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                <Button size="small" onClick={handleNext} variant="outlined">
                                    <EastIcon />
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack} variant="outlined">
                                    <WestIcon fontSize="small" />
                                </Button>
                            }
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
};
