import Image from "next/image";

export default function BookDemoBtn() {
    return (<a href="/demo" className="button-with-animation-2 w-inline-block">
<div style={{ position: "absolute" }}>
    <Image
        src="/svg/colorful-button.svg"
        width={202}
        height={59}
        alt="button"
    />
</div>

<div>Book a Demo</div>
<div className="ml-3"><svg
    width="21"
    height="15"
    viewBox="0 0 21 15"
    fill="CurrentColor"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M1 7.63184L18.6842 7.63184"
        stroke="CurrentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    ></path>
    <path
        d="M13.4219 13.9476L19.7377 7.63184"
        stroke="CurrentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    ></path>
    <path
        d="M13.4219 1.31543L19.7377 7.63122"
        stroke="CurrentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    ></path>
</svg></div>
</a>);}