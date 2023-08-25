"use client";

import "@/styles/components/bottom-wrapper.scss";
import Footer from "./Footer";
import FAQ from "./FAQ";
import GetStarted from "./GetStarted";

export default function BottomWrapper() {
    return (
        <div className="bottom-wrapper w-full">
            <FAQ />
            <GetStarted />
            <Footer />
        </div>
    );
}
