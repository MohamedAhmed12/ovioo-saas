import { AdvantageSection } from "@/components/Home/AdvantageSection";
import { FindDesignerSection } from "@/components/Home/FindDesignerSection";
import { IntroContainer } from "@/components/Home/IntroContainer";
import { PortfolioSection } from "@/components/Home/PortfolioSection";
import { PyramidSection } from "@/components/Home/PyramidSection";
import { StatsSection } from "@/components/Home/StatsSection";
import { FAQ as FAQInterface } from "@/interfaces";
import "@/styles/app/unauth/home.scss";
import BottomWrapper from "../../components/BottomWrapper";

export default function Home() {
    const faq: FAQInterface[] = [
        {
            question: "Every day business updates - what’s that?",
            answer: "Every business day, your designer will provide you with an update on your task, or switch to a new one when it's completed.",
        },
        {
            question: "How many designs do I get in a month?",
            answer: "This depends on the complexity and number of iterations for each task. Every task is different, but we guarantee you will receive daily design updates.",
        },
    ];

    return (
        <div className="home-main items-center flex flex-col">
            <IntroContainer />
            <StatsSection />
            <FindDesignerSection />
            <PortfolioSection />
            <AdvantageSection />
            <PyramidSection />
            <BottomWrapper faq={faq} />
        </div>
    );
}
