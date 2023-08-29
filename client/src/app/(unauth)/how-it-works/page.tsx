"use client";

import "@/styles/app/unauth/how-it-works.scss";

import { Divider } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from "next/image";

export default function HowItWorks() {
    const srcset = (image: string, size: number, rows: number = 1, cols: number = 1) => {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows
                }&fit=crop&auto=format&dpr=2 2x `,
        };
    }

    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            title: 'Hats',
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
            title: 'Honey',
            author: '@arwinneil',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
            title: 'Basketball',
        },
        {
            img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
            title: 'Fern',
        },
    ];

    return (
        <><div className="hero-how-to">
            <div className="hero-container">
                <div className="h1-wrapper m-show__xs-hidden">
                    <div className="h1 test-hero">
                        <strong>GET DAILY,</strong>
                        <strong className="text-gradient__pink-yellow">HIGH-END</strong>
                        <strong className="text-gradient__green-blue">DESIGN</strong>
                        <strong>DONE WITH AWESOMIC</strong>
                    </div>
                </div>
                <div className="h1-wrapper m-hidden">
                    <h1 className="h1 hero">
                        <strong>GET DAILY,</strong>
                        <strong className="text-gradient-h1">HIGH-END DESIGN</strong>
                        <strong>DONE WITH AWESOMIC</strong>
                    </h1>
                </div>
                <div className="h1-wrapper xs-show">
                    <div className="h1 test-hero">
                        <strong>GET DAILY,</strong>
                        <strong className="gradient_pink">HIGH-</strong>
                        <br />
                        <strong className="text-gradient__yellow">END</strong>
                        <strong className="text-gradient__green-blue">DESIGN</strong>
                        <strong>DONE WITH AWESOMIC</strong>
                    </div>
                </div>
            </div>
            <div className="hero-facts-wrapper">
                <div className="step-wrapper">
                    <div>
                        <Image src="/assets/images/sign-up.png" loading="lazy" height="75" width="75" alt="add icon" className="steps-ico" />
                    </div>
                    <div className="steps-text">
                        <div className="body-text-l">Sign up and</div>
                        <div className="h6">start creating tasks</div>
                    </div>
                </div>
                <div className="steps-divider">
                </div>
                <div className="step-wrapper">
                    <div>
                        <Divider
                            variant="fullWidth"
                            component="li"
                            light={false}
                            className="list-none list-divider mb-6 mt-6"
                        />
                        <Image src="/assets/images/get-matched.png" loading="lazy" width="75" height="75" alt="user icon" className="steps-ico" />
                    </div>
                    <div className="steps-text">
                        <div className="h6">Get matched</div>
                        <div className="body-text-l">with a pro designer</div>
                    </div>
                </div>
                <div className="steps-divider">
                </div>
                <div className="step-wrapper">
                    <div>
                        <Divider
                            variant="fullWidth"
                            component="li"
                            light={false}
                            className="list-none list-divider mb-6 mt-6"
                        />
                        <Image src="/assets/images/design-updates.png" loading="lazy" width="75" height="75" alt="user icon" className="steps-ico" />
                    </div>
                    <div className="steps-text">
                        <div className="body-text-l">Get design updates</div>
                        <div className="h6">every 24 business hours</div>
                    </div>
                </div>
            </div>
        </div>
            <div className="section">
                <iframe width="853" height="480" src="https://www.youtube.com/embed/IEuHpriOVzE" title="Positive Vibes Music 🌻 Top 100 Chill Out Songs Playlist | Romantic English Songs With Lyrics" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            <div className="new-title_wrapper center">
                <h2 className="h-40 m-34 s-28">What You Get With Awesomic</h2>
            </div>
            <div className="section">
                <ImageList
                    sx={{ width: 1000, height: 1200, gridAutoColumns: 1, borderRadius: 8 }}
                    variant="quilted"
                    cols={4}
                    grid-column-gap='60px'
                    grid-row-gap='60px'
                    gap={60}
                >
                    {itemData.map((item) => (
                        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                            <Image
                                {...srcset(item.img, 121, item.rows, item.cols)}
                                alt={item.title}
                                loading="lazy"
                                className="img"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </>
    )
}
