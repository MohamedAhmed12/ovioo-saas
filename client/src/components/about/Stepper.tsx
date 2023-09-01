import Image from "next/image";
import ReactHtmlParser from "react-html-parser";

export default function Stepper() {
    const steps: { year: number; text: string }[] = [
        {
            year: 2021,
            text: "Beta launch on<br /><strong>Product Hunt</strong>",
        },
        {
            year: 2022,
            text: "Secured Essential <br /> <strong>Fund</strong>the pandemic",
        },
        {
            year: 2023,
            text: "Beta launch on<br /><strong>Product Hunt</strong>",
        },
    ];

    return (
        <div className="facts-wrapper flex flex-row w-full mt-40 mb-40 justify-between">
            {steps.map(({ year, text }, index) => (
                <div className="fact-wrapper" key={index}>
                    <div>
                        <div className="about-us-fact-figure">{year}</div>
                    </div>
                    <div className="about-us-facts-eclipse">
                        <Image
                            height={61}
                            width={61}
                            src="/images/stepper-icon.png"
                            loading="lazy"
                            alt="timeline"
                        />
                        {steps.length !== index + 1 && <div className="about-us-facts-line"></div>}
                    </div>
                    <div>
                        <div className="body-text-l">{ReactHtmlParser(text)}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
