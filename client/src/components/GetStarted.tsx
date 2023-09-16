"use client";

import "@/styles/components/get-started.scss";
import GetStartedBtns from "./GetStartedBtns";
import Image from "next/image";

export default function GetStarted() {
    return (
        <div className="section get-started">
            <div className="cta_banner-wrap">
                <div className="cat_wrapper">
                    <Image
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
                            <h2 className="cta_heading">
                                Add a <strong className="font-medium">Pro Designer</strong> to Your
                                Team <strong className="font-medium">in Minutes</strong>,
                                <strong className="font-medium"> Not Weeks</strong>.
                            </h2>
                        </div>
                        <GetStartedBtns />
                    </div>
                </div>
            </div>
        </div>
    );
}
