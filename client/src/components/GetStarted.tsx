"use client";

import "@/styles/components/get-started.scss";
import ReactHtmlParser from "react-html-parser";
import GetStartedBtns from "./GetStartedBtns";

export default function GetStarted({ content }: { content: string }) {
    return (
        <div className="section get-started">
            <div className="cta_banner-wrap">
                <div className="cat_wrapper">
                    <img
                        src="svg/cat.svg"
                        loading="lazy"
                        width="295"
                        height="228"
                        alt="ovioo cat"
                        className="ovioo-cat"
                    />
                </div>
            </div>
            <div className="cta_outline">
                <div className="gradient-c-stroke">
                    <div className="cta_container">
                        <div className="cta__heading-wrapper">
                            <h2 className="cta_heading">{ReactHtmlParser(content)}</h2>
                        </div>
                        <GetStartedBtns />
                    </div>
                </div>
            </div>
        </div>
    );
}
