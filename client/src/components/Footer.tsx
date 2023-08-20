import "@/styles/components/footer.scss";

export default function Footer() {
    return (
        <footer className="footer w-full">
            <div className="wrapper-footer">
                <div className="footer-menu">
                    <div className="adress">
                        <a
                            href="/"
                            aria-current="page"
                            className="footer-logo w-full inline-block w--current"
                        >
                            <img
                                src="https://uploads-ssl.webflow.com/602d59da29b66668b8758391/603817f177ff9a977b86ba02_%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%BD%D1%82.svg"
                                loading="lazy"
                                alt="ovioo logo"
                                className="footer__logo"
                            />
                        </a>
                        <div className="footer__contacts">
                            <div className="menu-adress-left">
                                <div className="text-adress">
                                    <p className="text-style-m">ovioo Inc.</p>
                                </div>
                                <div className="contact-text street">
                                    <p className="text-style-m">
                                        535 Mission St, 14th Floor
                                        <br />
                                        San Francisco, CA 94105
                                    </p>
                                </div>
                            </div>
                            <div className="menu-adress-right">
                                <div className="contact-text phone">
                                    <p className="text-style-m">(415) 707-2976</p>
                                </div>
                                <a
                                    href="mailto:hi@ovioo.io"
                                    className="contact-text email w-full inline-block"
                                >
                                    <p className="text-style-m">help@ovioo.io</p>
                                </a>
                                <a
                                    href="/"
                                    target="_blank"
                                    className="contact-text help-center w-full inline-block"
                                >
                                    <p className="text-style-m">ovioo Help Center</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="menu-wrapper_footer">
                        <div className="col_footer">
                            <div className="link_footer">
                                <a href="/portfolio" className="footer_nav-text">
                                    Portfolio
                                </a>
                            </div>
                            <div className="link_footer top-margin">
                                <a href="/pricing" className="footer_nav-text">
                                    Pricing
                                </a>
                            </div>
                            <div className="link_footer top-margin mob">
                                <a href="/about-us" className="footer_nav-text">
                                    About Us
                                </a>
                            </div>
                        </div>
                        <div className="col_footer">
                            <div className="link_footer">
                                <a href="/case-study" className="footer_nav-text">
                                    Case Study
                                </a>
                            </div>
                            <div className="link_footer top-margin">
                                <a href="/affiliate-program" className="footer_nav-text">
                                    Affiliates
                                </a>
                            </div>
                            <div className="link_footer top-margin mob">
                                <a
                                    href="/"
                                    className="footer_nav-text"
                                >
                                    Hiring 🔥
                                </a>
                            </div>
                        </div>
                        <div className="col_footer">
                            <div className="link_footer">
                                <a href="/how-it-works" className="footer_nav-text">
                                    How it Works
                                </a>
                            </div>
                            <div className="link_footer top-margin">
                                <a href="/terms-of-service" className="footer_nav-text">
                                    Terms &amp; Policies
                                </a>
                            </div>
                            <div className="link_footer top-margin mob">
                                <a href="/talents" className="footer_nav-text">
                                    ovioo for Designers
                                </a>
                            </div>
                        </div>
                        <div className="col_footer last">
                            <div className="row-footer">
                                <div className="link_footer">
                                    <a href="/about-us" className="footer_nav-text">
                                        About Us
                                    </a>
                                </div>
                                <div className="link_footer">
                                    <a
                                        href="/"
                                        className="footer_nav-text"
                                    >
                                        Hiring 🔥
                                    </a>
                                </div>
                            </div>
                            <div className="link_footer last">
                                <a href="/talents" className="footer_nav-text">
                                    ovioo for Designers
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="menu-wrapper-mobile">
                        <div className="_1-footer-menu">
                            <div className="col_footer">
                                <a href="/portfolio" className="link_footer w-full inline-block">
                                    <p className="footer_nav-text">Portfolio</p>
                                </a>
                                <a
                                    href="/pricing"
                                    className="link_footer top-margin w-full inline-block"
                                >
                                    <p className="footer_nav-text">Pricing</p>
                                </a>
                                <a
                                    href="/about-us"
                                    className="link_footer top-margin w-full inline-block"
                                >
                                    <p className="footer_nav-text">About Us</p>
                                </a>
                                <div className="link_footer top-margin">
                                    <a
                                        href="/affiliate-terms-conditions"
                                        className="footer_nav-text"
                                    >
                                        Affiliates
                                    </a>
                                </div>
                            </div>
                            <div className="_2-menu">
                                <a href="/case-study" className="link_footer w-full inline-block">
                                    <p className="footer_nav-text">Case Study</p>
                                </a>
                                <a
                                    href="/how-it-works"
                                    className="link_footer top-margin w-full inline-block"
                                >
                                    <p className="footer_nav-text">What You Get</p>
                                </a>
                                <a
                                    href="/terms-of-service"
                                    className="link_footer top-margin w-full inline-block"
                                >
                                    <p className="footer_nav-text">Terms &amp; Policies</p>
                                </a>
                                <div className="link_footer top-margin mob">
                                    <a
                                        href="/"
                                        className="footer_nav-text"
                                    >
                                        Hiring 🔥
                                    </a>
                                </div>
                            </div>
                            <a
                                href="/talents"
                                className="link_footer top-margin w-full inline-block"
                            >
                                <p className="footer_nav-text">ovioo for Designers</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="divider-footer"></div>
                <div className="social">
                    <div className="container-social">
                        <a
                            data-w-id="00be8c05-2a40-df03-0938-7a2eda4ad09c"
                            href="/"
                            target="_blank"
                            className="social-logo w-full inline-block"
                        >
                            <img
                                src="https://uploads-ssl.webflow.com/602d59da29b66668b8758391/6448f594bc8d5c926e95cc7e_dribble_icon_footer.svg"
                                loading="lazy"
                                alt=""
                                className="ico-img"
                            />
                        </a>
                        <a
                            data-w-id="05257713-93c8-4f1a-cca5-fada0299f3f2"
                            href="/"
                            target="_blank"
                            className="social-logo w-full inline-block"
                        >
                            <img
                                src="https://uploads-ssl.webflow.com/602d59da29b66668b8758391/6448f59551838414ca33a4f8_behance_footer_icon.svg"
                                loading="lazy"
                                alt=""
                                className="ico-img"
                            />
                        </a>
                        <a
                            data-w-id="1ccbbd5b-0043-722d-e5b7-cf334eeaa30a"
                            href="/"
                            target="_blank"
                            className="social-logo w-full inline-block"
                        >
                            <img
                                src="https://uploads-ssl.webflow.com/602d59da29b66668b8758391/6448f59454c5161e8047b306_fb_footer_icon.svg"
                                loading="lazy"
                                alt=""
                                className="ico-img "
                            />
                        </a>
                        <a
                            data-w-id="eaef8f78-daa9-1285-06f1-d6eaee53138a"
                            href="/"
                            target="_blank"
                            className="social-logo w-full inline-block"
                        >
                            <img
                                src="https://uploads-ssl.webflow.com/602d59da29b66668b8758391/6448f595e167344e6fda7bd5_insta_footer_icon.svg"
                                loading="lazy"
                                alt=""
                                className="ico-img"
                            />
                        </a>
                        <a
                            data-w-id="ae77bc4e-f01f-292c-9c9c-e496c8db9764"
                            href="/"
                            target="_blank"
                            className="social-logo w-full inline-block"
                        >
                            <img
                                src="https://uploads-ssl.webflow.com/602d59da29b66668b8758391/63e0fdc5e62bc2048c037d64_twitter-icon-gradient.svg"
                                loading="lazy"
                                alt=""
                                className="ico-img"
                            />
                        </a>
                    </div>
                    <div className="footer-motto">
                        <p className="text-style-m center mob-ver">
                            ovioo - awesome
                            <br />
                            on a cosmic level
                        </p>
                        <p className="text-style-m center desk">
                            ovioo - awesome on a cosmic level
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
