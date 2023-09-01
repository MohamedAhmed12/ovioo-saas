import "@/styles/components/about/about-stepper.scss";
import Image from "next/image";
import ReactHtmlParser from "react-html-parser";

export default function AboutStepper() {
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
        <div className="about-steppers-wrapper flex flex-col lg:flex-row w-full mt-40 mb-40 justify-center lg:justify-between items-center">
            {steps.map(({ year, text }, index) => (
                <>
                    <div className="stepper-wrapper" key={index}>
                        <div className="about-us-stepper-figure">{year}</div>
                        <div className="about-us-steppers-eclipse">
                            <Image
                                height={61}
                                width={61}
                                src="/icons/stepper-icon.png"
                                loading="lazy"
                                alt="timeline"
                                className="hidden lg:block"
                            />
                            {steps.length !== index + 1 && (
                                <div className="about-us-steppers-line hidden lg:block"></div>
                            )}
                        </div>
                        <div className=" mt-4 lg:m-0">{ReactHtmlParser(text)}</div>
                    </div>
                    {steps.length !== index + 1 && (
                        <div className="about-us-steppers-vertical-line block lg:hidden"></div>
                    )}
                </>
            ))}
        </div>
    );
}
