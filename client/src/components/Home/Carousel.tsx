"use client";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";

const steps = [
    "https://picsum.photos/id/1/200/300",
    "https://picsum.photos/id/2/200/300",
    "https://picsum.photos/id/3/200/300",
];

export default function Carousel() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState<number>(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
            <Box className="w-full flex justify-between">
                <h3 className="carousel-title" >
                    PRO plan – $99 <span>/ day</span>
                </h3>
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    Back
                </Button>
                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                    Next
                    {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
            </Box>
            <Box sx={{ height: 255, maxWidth: 400, width: "100%", p: 2 }}>
                <img src={steps[activeStep]} />
            </Box>
        </Box>
    );
}
