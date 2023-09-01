"use client";

import "@/styles/components/home/intro-container.scss";

export const StatsSection = () => (
    <div
        className="xl:container stats-container flex flex-col lg:flex-row mt-10 mb-10 pr-20 pl-20"
        style={{ color: "#fee4a5" }}
    >
        <div className="flex flex-col basis-1/3">
            <div className="flex flex-row m-5">
                <h1 className="basis-1/2 text-5xl lg:text-6xl mr-6">10000+</h1>
                <p className="basis-1/2 text-lg lg:text-xl text-white w-56">successfully completed tasks</p>
            </div>
            <div className="flex flex-row m-5">
                <h1 className="basis-1/2 text-5xl lg:text-6xl mr-6">1500+</h1>
                <p className="basis-1/2 text-lg lg:text-xl text-white w-56">businesses uses Ovioo designs</p>
            </div>
        </div>
        <div className="flex flex-col basis-2/3">
            <div className="flex flex-row m-5 lg:pl-20">
                <h1 className="basis-1/2 text-5xl lg:text-6xl mr-6 lg:mr-0">5000+</h1>
                <p className="basis-1/2 text-lg lg:text-xl text-white w-56">Satisfied Customers Worldwide</p>
            </div>
        </div>
    </div>
);
