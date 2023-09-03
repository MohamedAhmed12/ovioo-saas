"use client";

import { FAQ as FAQInterface } from "@/interfaces";
import "@/styles/components/bottom-wrapper.scss";
import FAQ from "./FAQ";
import GetStarted from "./GetStarted";

export default function BottomWrapper({ faq }: { faq: FAQInterface[] }) {
    return (
        <div className="bottom-wrapper w-full">
            <FAQ faq={faq} />
            <GetStarted />
        </div>
    );
}
