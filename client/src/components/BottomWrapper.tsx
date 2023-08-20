"use client";
import "@/styles/components/bottom-wrapper.scss";
import Footer from "./Footer";
import FAQ from "./FAQ";

export default function BottomWrapper() {
    return (
        <div className="bottom-wrapper w-full">
            <FAQ />
            <Footer />
        </div>
    );
}
