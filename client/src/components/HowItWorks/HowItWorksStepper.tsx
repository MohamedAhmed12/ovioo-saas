import "@/styles/components/how-it-works/how-it-works-stepper.scss";
import Image from "next/image";
import ReactHtmlParser from "react-html-parser";

export default function HowItWorksStepper() {
    const steps: { iconSrc: string; text: string }[] = [
        {
            iconSrc: "/icons/sign-up.png",
            text: "Sign up and <br /><strong>create your first task</strong>",
        },
        {
            iconSrc: "/icons/match.png",
            text: "<strong>Get matched</strong> <br /> with a pro designer",
        },
        {
            iconSrc: "/icons/time.png",
            text: "Get updates<br /> <strong>every 24 business hours</strong>",
        },
    ];

    return (
        <div className="how-it-works__steppers-wrapper flex flex-col lg:flex-row w-full mt-40 mb-40 justify-center lg:justify-between items-center">
            {steps.map(({ iconSrc, text }, index) => (
                <span key={index}>
                    <div className="stepper-wrapper flex flex-col items-center text-center">
                        <div className="how-it-works__steppers-item flex relative items-center flex-row">
                            <div className="flex flex-col items-center">
                                <Image
                                    height={77}
                                    width={77}
                                    src={iconSrc}
                                    loading="lazy"
                                    alt="timeline"
                                />

                                <div className="text-xl mt-4 lg:m-0">{ReactHtmlParser(text)}</div>
                            </div>
                            {steps.length !== index + 1 && (
                                <div className="about-us-steppers-line hidden lg:block mr-9 ml-9"></div>
                            )}
                        </div>
                    </div>
                    {steps.length !== index + 1 && (
                        <div className="about-us-steppers-vertical-line block lg:hidden"></div>
                    )}
                </span>
            ))}
        </div>
    );
}
