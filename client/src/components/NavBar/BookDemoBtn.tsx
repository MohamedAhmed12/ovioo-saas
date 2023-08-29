import EastIcon from "@mui/icons-material/East";
import Image from "next/image";
import Link from "next/link";

export default function BookDemoBtn() {
    return (
        <Link href="/demo" className="button-with-animation-2 w-inline-block">
            <div style={{ position: "absolute" }}>
                <Image src="/gif/button-colorful-button.gif" width={202} height={59} alt="button" />
            </div>
            Book a Demo
            <div className="ml-2">
                <EastIcon />
            </div>
        </Link>
    );
}
