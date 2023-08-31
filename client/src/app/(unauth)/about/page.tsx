"use client";

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
            <div className="about">
                <div className="container title uppercase text-center">
                    <Typography variant="h2">
                        <span className="text-gradient-h1">
                            <strong>awesomic</strong>
                        </span>
                        <span className="title-span about-us ml-4 mr-4">=</span>
                        <strong>awesome</strong> companies
                        <br />+ <strong>cosmic</strong> designers
                    </Typography>
                </div>
                <div className="hero-facts-wrapper about desktop-ver">
                    <div className="fact-wrapper">
                        <div>
                            <div className="about-us-fact-figure">2019</div>
                        </div>
                        <div className="about-us-facts-eclipse">
                            <Image
                                height={61}
                                src="/svg/smile.svg"
                                loading="lazy"
                                width="61"
                                alt="timeline"
                            />
                            <div className="about-us-facts-line"></div>
                        </div>
                        <div>
                            <div className="body-text-l">
                                Beta launch on
                                <br />
                                <strong className="h6">Product Hunt</strong>
                            </div>
                        </div>
                    </div>
                    <div className="fact-wrapper">
                        <div>
                            <div className="about-us-fact-figure">2020</div>
                        </div>
                        <div className="about-us-facts-eclipse">
                            <Image
                                height={61}
                                width={61}
                                src="/svg/smile.svg"
                                loading="lazy"
                                alt="timeline"
                            />
                            <div className="about-us-facts-line"></div>
                        </div>
                        <div>
                            <div className="body-text-l">
                                <strong className="h6">Funded</strong> during
                                <br />
                                the pandemic
                            </div>
                        </div>
                    </div>
                    <div className="fact-wrapper">
                        <div>
                            <div className="about-us-fact-figure">2021</div>
                        </div>
                        <div className="about-us-facts-eclipse">
                            <Image
                                height={61}
                                width={61}
                                src="/svg/smile.svg"
                                loading="lazy"
                                width="61"
                                alt="timeline"
                            />
                        </div>
                        <div>
                            <div className="body-text-l">
                                Worked with
                                <br />
                                <strong className="h6">1000+</strong> customers
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-facts-wrapper about mobile-adapted">
                    <div className="step-wrapper">
                        <div>
                            <div className="about-us-fact-figure">2019</div>
                        </div>
                        <div className="steps-text">
                            <div className="body-text-l">
                                Beta launch on
                                <br />
                                <strong className="h6">Product Hunt</strong>
                            </div>
                        </div>
                    </div>
                    <div className="steps-divider about"></div>
                    <div className="step-wrapper">
                        <div>
                            <div className="about-us-fact-figure">2020</div>
                        </div>
                        <div className="steps-text">
                            <div className="body-text-l">
                                <strong className="h6">Funded</strong> during
                                <br />
                                the pandemic
                            </div>
                        </div>
                    </div>
                    <div className="steps-divider about"></div>
                    <div className="step-wrapper">
                        <div>
                            <div className="about-us-fact-figure">2021</div>
                        </div>
                        <div className="steps-text">
                            <div className="body-text-l">
                                Worked with
                                <br />
                                <strong className="h6">1000+</strong> customers
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section astronauts">
                <div className="astronaut-container">
                    <Image
                        height={61}
                        width={61}
                        src="/svg/smile.svg"
                        loading="lazy"
                        alt="Awesomic astronaut founder Roman"
                        className="roman"
                    />
                    <Image
                        height={61}
                        width={61}
                        src="/svg/smile.svg"
                        loading="lazy"
                        alt="Awesomic astronaut founder Stacy"
                        className="nastya"
                    />
                    <Image
                        height={61}
                        width={61}
                        src="/svg/stars-circle-about.svg"
                        loading="lazy"
                        alt="Awesomic constellation"
                        className="stars-circle-about"
                    />
                    <div className="astronaut-text-1">
                        <div className="astronaut-text">Once, a young</div>
                        <div className="astronaut-text second-line">Software engineer</div>
                        <Image
                            height={61}
                            width={61}
                            src="/svg/arrow-up.svg"
                            loading="lazy"
                            alt="arrow pointing left"
                            className="arrow-up"
                        />
                    </div>
                    <div className="astronaut-text-2">
                        <div className="astronaut-text">Digital marketer</div>
                        <div className="astronaut-text second-line down">on Tinder</div>
                        <Image
                            height={61}
                            width={61}
                            src="/svg/arrow-down.svg"
                            loading="lazy"
                            alt="arrow pointing right"
                            className="arrow-down"
                        />
                    </div>
                    <div className="astronaut-text-3">
                        <div className="astronaut-text">Met</div>
                    </div>
                </div>
            </div>
            <div className="info container w-full flex-col lg:flex-row  flex items-center justify-between">
                <h2 className="heading-style-h2 basis-1/2 text-center lg:text-left">
                    Algorithms matched us — now, we’ve created an algorithm to help others, matching
                    businesses with the best-fit designers.
                </h2>
                <div className="basis-1/2 mt-8 lg:mt-0">
                    <Image src="/svg/smile.jpg" alt="smile" width={610} height={500} />
                </div>
            </div>
            <div className="section">
                <div className="title-wrapper">
                    <h3 className="heading-style-h2 center mt-20">Our Values</h3>
                </div>
                <div>
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
                                        <div className="down-text text-xl">
                                            {ReactHtmlParser(stat)}
                                        </div>
                                    </div>
                                    {statistics.length !== index + 1 && (
                                        <div className="divider-about hidden lg:block mr-12 ml-12"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="dog_wrapper">
                <Image
                    height={61}
                    width={61}
                    src="svg/dog.svg"
                    loading="lazy"
                    width="295"
                    height="228"
                    alt="ovioo dog"
                    className="ovioo-dog"
                />
            </div>
        </>
    );
}
