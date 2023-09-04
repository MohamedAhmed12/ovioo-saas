"use client";

import "@/styles/app/unauth/demo.scss";
import Script from "next/script";
import { Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "../../loading";

export default function Demo() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isCalendlyEvent = (e) => {
            return e.data.event && e.data.event.indexOf("calendly") === 0;
        };

        const handleCalendlyEvent = (e) => {
            if ((isCalendlyEvent(e), e.data.event == "calendly.event_type_viewed")) {
                setLoading(false);
            }
        };

        window.addEventListener("message", handleCalendlyEvent);

        return () => {
            window.removeEventListener("message", handleCalendlyEvent);
        };
    }, []);

    return (
        <>
            <Loading className={loading ? "" : "hidden"} />

            <div
                className={`demo container flex items-center flex-col mt-28 mb-28 ${loading ? "hidden" : ""}`}
            >
                <Typography
                    variant="h3"
                    className="title max-w-5xl font-medium capitalize text-center"
                >
                    book your demo with one
                    <br /> of our team <span className="text-gradient">heroes</span>
                </Typography>

                <div className="flex flex-row justify-center lg:justify-between w-full">
                    <div
                        id="calendly-container"
                        className="calendly-inline-widget basis-1/2"
                        data-url="https://calendly.com/mohamed-gad3633/demo-call?hide_gdpr_banner=1"
                    ></div>
                    <div className="basis-1/2 hidden lg:flex">
                        <Image src="/images/smile.jpg" alt="smile" width={800} height={720} />
                    </div>

                    <Script
                        type="text/javascript"
                        src="/js/calendly-inline-widget.js"
                        async
                    ></Script>
                </div>
            </div>
        </>
    );
}
