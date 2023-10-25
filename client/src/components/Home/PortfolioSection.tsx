"use client";

import { Button } from "@mui/material";
import { FaArrowLeftLong } from "react-icons/fa6";
import Carousel from "../Carousel";

export const PortfolioSection = () => (
    <div className="portfolio-section max-w-full">
        <Carousel
            title={
                <h3 className="carousel-title">
                    Light plan – $35<small> / day</small>
                </h3>
            }
        />
        <Carousel
            title={
                <h3 className="carousel-title">
                    Pro plan – $99<small> / day</small>
                </h3>
            }
        />
        <a
            href="/portfolio"
            className="portfolio-wrap w-inline-block flex justify-center mt-20"
        >
            <div className="portfolio-button w-64 h-14">
                <Button
                    variant="outlined"
                    fullWidth
                    className="h-full"
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        border: "2px solid white",
                        textTransform: "capitalize",
                        fontSize: "1.25rem",
                        lineHeight: " 1.75rem",
                    }}
                >
                    view portfolio
                    <div className="ml-2">
                        <FaArrowLeftLong />
                    </div>
                </Button>
            </div>
        </a>
    </div>
);
