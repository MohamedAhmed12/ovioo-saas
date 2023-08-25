import "@/styles/components/get-started.scss";

export default function GetStarted() {
    return (
        <div className="section get-started">
            <div className="cta_banner-wrap">
                <div className="dog_wrapper">
                    <img
                        src="svg/dog.svg"
                        loading="lazy"
                        width="295"
                        height="228"
                        alt="ovioo dog"
                        className="ovioo-dog"
                    />
                </div>
            </div>
            <div className="cta_outline">
                <div className="gradient-c-stroke">
                    <div className="cta_container">
                        <div className="cta__heading-wrapper">
                            <h2 className="cta_heading">
                                Add a <strong className="font-medium">Pro Designer</strong> to
                                Your Team <strong className="font-medium">in Minutes</strong>,
                                <strong className="font-medium"> Not Weeks</strong>.
                            </h2>
                        </div>
                        <div className="cta_btn-container">
                            <a
                                href="/register"
                                className="ghost-button-wrap new-cta_7for7 hidden w-inline-block"
                            >
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
                    </div>
                </div>
            </div>
        </div>
    );
}
