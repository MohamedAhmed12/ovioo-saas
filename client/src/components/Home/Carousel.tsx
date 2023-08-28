"use client";

import "@/styles/components/home/carousel.scss";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import Box from "@mui/material/Box";
import { ReactElement } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const steps = [
    "https://picsum.photos/id/1/400/400",
    "https://picsum.photos/id/12/400/400",
    "https://picsum.photos/id/33/400/400",
    "https://picsum.photos/id/45/400/400",
    "https://picsum.photos/id/51/400/400",
    "https://picsum.photos/id/66/400/400",
];

export default function Carousel({ title }: { title: ReactElement | string }) {
    return (
        <Box className="carousel w-full flex flex-col items-center mt-20">
            <Box className="w-full flex justify-between mb-10 title">{title}</Box>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                grabCursor={true}
                modules={[FreeMode]}
            >
                {steps.map((step) => (
                    <SwiperSlide>
                        <img src={step} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}
