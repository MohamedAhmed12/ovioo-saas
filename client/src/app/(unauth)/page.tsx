import Carousel from "@/components/Home/Carousel";
import { FindDesignerSection } from "@/components/Home/FindDesignerSection";
import { IntroContainer } from "@/components/Home/IntroContainer";
import { PortfolioSection } from "@/components/Home/PortfolioSection";
import { StatsSection } from "@/components/Home/StatsSection";
import "@/styles/app/unauth/home.scss";

export default function Home() {
    return (
        <div className="home-main items-center flex flex-col">
            <IntroContainer />
            <StatsSection />
            <FindDesignerSection />
            <PortfolioSection />
        </div>
    );
}
