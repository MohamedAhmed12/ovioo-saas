import "@/styles/components/get-started-btns.scss";

export const GetStartedBtns = () => (
    <div className="get-started_btn-container">
        <a href="/register" className="ghost-button-wrap new-cta_7for7 hidden w-inline-block">
            <div className="ghost-button new-cta">
                <div className="buttons-l">Get started</div>
            </div>
        </a>
        <a href="/demo" className="button-wrapper book-demo w-inline-block">
            <div className="button-outline">
                <div className="cta book-demo">
                    <p className="buttons-l dark">Book a Demo</p>
                </div>
            </div>
        </a>
    </div>
);

export default GetStartedBtns;
