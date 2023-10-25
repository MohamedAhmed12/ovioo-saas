import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function BookDemoBtn() {
    return (
        <Link href="/demo" className="button-with-animation-2 w-inline-block">
            <div style={{ position: "absolute" }}>
                <Image
                    src="/gif/button-colorful-button.gif"
                    width={202}
                    height={59}
                    alt="button"
                />
            </div>
            Book a Demo
            <div className="ml-2">
                <FaArrowRight />
            </div>
        </Link>
    );
}
