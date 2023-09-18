import "@/styles/components/get-started-btns.scss";
import AnimatedBtn from "./AnimatedBtn";

export const GetStartedBtns = () => (
    <div className="get-started_btn-container">
        <a href="/register" className="ghost-button-wrap new-cta_7for7 w-inline-block">
            <div className="ghost-button new-cta">
                <div className="buttons-l">Get started</div>
            </div>
        </a>
        <AnimatedBtn title="Book a Demo" />
    </div>
);

export default GetStartedBtns;
