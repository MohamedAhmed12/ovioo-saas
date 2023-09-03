"use client";

import "@/styles/components/bottom-wrapper.scss";
import FAQ from "./FAQ";
import GetStarted from "./GetStarted";
import { FAQ as FAQInterface } from "@/interfaces";

export default function BottomWrapper({
    faq,
    getStartedContent,
}: {
    faq: FAQInterface[];
    getStartedContent: string;
}) {
    return (
        <div className="bottom-wrapper w-full">
            <FAQ faq={faq} />
            <GetStarted content={getStartedContent} />
        </div>
    );
}
