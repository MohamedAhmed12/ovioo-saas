"use client";

import HowItWorksStepper from "@/components/HowItWorks/HowItWorksStepper";
import "@/styles/app/unauth/how-it-works.scss";
import { Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";

export default function HowItWorks() {
    const srcset = (image: string, size: number, rows: number = 1, cols: number = 1) => {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x `,
        };
    };

    const itemData = [
        {
            img: "/images/smile.jpg",
            title: "Breakfast",
            rows: 1,
            cols: 1,
        },
        {
            img: "/images/smile.jpg",
            title: "Burger",
            rows: 1,
            cols: 1,
        },
        {
            img: "/images/smile.jpg",
            title: "Camera",
            rows: 2,
            cols: 2,
        },
        {
            img: "/images/smile.jpg",
            title: "Coffee",
            cols: 2,
        },
        {
            img: "/images/smile.jpg",
            title: "Breakfast",
            rows: 2,
            cols: 2,
        },
        {
            img: "/images/smile.jpg",
            title: "Honey",
            author: "@arwinneil",
            rows: 1,
            cols: 2,
        },
        {
            img: "/images/smile.jpg",
            title: "Breakfast",
            rows: 1,
            cols: 1,
        },
        {
            img: "/images/smile.jpg",
            title: "Burger",
            rows: 1,
            cols: 1,
        },
    ];

    return (
        <div className="how-it-works">
            <div className="intro flex flex-col items-center pr-[10px] pl-[10px] relative">
                <div className="container title uppercase text-center">
                    <Typography variant="h2">
                        <strong>get daily, </strong>
                        <strong className="text-gradient">high-end design</strong>
                        <br />
                        <strong>done with ovioo</strong>
                    </Typography>
                </div>

                <HowItWorksStepper />
            </div>
            <div className="container w-full p-5 flex justify-center">
                <iframe
                    width="1200"
                    height="480"
                    src="https://www.youtube.com/embed/IEuHpriOVzE"
                    title="Positive Vibes Music 🌻 Top 100 Chill Out Songs Playlist | Romantic English Songs With Lyrics"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="what-you-get text-[40px] font-medium text-center mt-36 mb-20 flex  flex-col items-center">
                <h2 className="mb-20">What You Get With Ovioo</h2>
                <ImageList
                    sx={{ gridAutoColumns: 1 }}
                    variant="quilted"
                    cols={4}
                    grid-column-gap="60px"
                    grid-row-gap="60px"
                    gap={60}
                    className="w-full pr-5 pl-5"
                >
                    {itemData.map((item) => (
                        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                            <Image
                                {...srcset(item.img, 121, item.rows, item.cols)}
                                alt={item.title}
                                loading="lazy"
                                className="img"
                                width={100}
                                height={100}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </div>
    );
}
