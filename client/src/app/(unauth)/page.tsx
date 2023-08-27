import Carousel from "@/components/Home/Carousel";
import { IntroContainer } from "@/components/Home/IntroContainer";
import "@/styles/app/unauth/home.scss";

export default function Home() {
    return (
        <div style={{ minHeight: "750px" }} className="home-main">
            <IntroContainer />
            <Carousel />
        </div>
    );
}
