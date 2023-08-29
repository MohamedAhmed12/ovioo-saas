"use client";

import "@/styles/components/home/find-designer.scss";
import Image from "next/image";

export const FindDesigner = () => (
    <div className="container find-designer flex flex-col lg:flex-row mt-10 mb-10 pr-20 pl-20">
        <h2 className="text-4xl basis-1/2 font-bold">
            Finding a <span className="text-secondary">designer</span> can be quite challenging. Doing it over and over again <br />
            for every new task? <span className="text-red-600">Ugh, no thanks!</span>
            <br />
            <br />
            Sit back and relax with <span className="text-secondary">Ovioo</span>. We got you.
        </h2>
        <div className="text-3xl basis-1/2">
            <Image src="/svg/smile.jpg" alt="smile" width={610} height={700}/>
        </div>
    </div>
);
