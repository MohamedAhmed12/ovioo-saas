import "@/styles/components/footer.scss";

export default function Footer() {
    return (
        <footer className="footer w-full relative">
                <div className="rocket-wrapper absolute">
                    <img src="/svg/rocket.svg" alt="rocket" loading="lazy" width="360" height="463" />
                </div>
            <div className="wrapper-footer ">
                <div className="footer-menu flex-col lg:flex-row">
                    <div className="adress">
                        <a
                            href="/"
                            aria-current="page"
                            className="footer-logo w-full inline-block w--current"
                        >
                            <img
                                src="/svg/footer-logoa.svg"
                                loading="lazy"
                                alt="ovioo logo"
                                className="footer__logo"
                            />
                        </a>
                        <div className="footer__contacts flex flex-col lg:flex-row">
                            <div className="menu-adress-left ">
                                <div className="text-adress">
                                    <p className="text-style-m">Ovioo Inc.</p>
                                </div>
                                <div className="contact-text street">
                                    <p className="text-style-m">
                                        Ovioo is headquartered
                                        <br />
                                        in Dubai, UAE.
                                    </p>
                                </div>
                            </div>
                            <div className="menu-adress-right justify-end">
                                <div className="contact-text phone">
                                    <p className="text-style-m"></p>
                                </div>
                                <a
                                    href="mailto:hi@ovioo.io"
                                    className="contact-text email w-full inline-block mt-4 lg:mt-6"
                                >
                                    <p className="text-style-m">help@ovioo.io</p>
                                </a>
                                <a
                                    href="/"
                                    target="_blank"
                                    className="contact-text help-center w-full inline-block mt-4 lg:mt-0"
                                >
                                    <p className="text-style-m">ovioo Help Center</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="menu-wrapper_footer hidden lg:flex pt-14">
                        <div className="col_footer">
                            <div className="link_footer">
                                <a href="/portfolio" className="footer_nav-text">
                                    Portfolio
                                </a>
                            </div>
                            <div className="link_footer mt-7">
                                <a href="/pricing" className="footer_nav-text">
                                    Pricing
                                </a>
                            </div>
                        </div>
                        <div className="col_footer">
                            <div className="link_footer">
                                <a href="/how-it-works" className="footer_nav-text">
                                    How it Works
                                </a>
                            </div>
                            <div className="link_footer mt-7">
                                <a href="/about-us" className="footer_nav-text">
                                    About Us
                                </a>
                            </div>
                        </div>
                        <div className="col_footer last">
                            <div className="row-footer">
                                <div className="link_footer">
                                    <a href="/" className="footer_nav-text">
                                        Hiring 🔥
                                    </a>
                                </div>
                            </div>
                            <div className="link_footer last">
                                <a href="/terms-of-service" className="footer_nav-text">
                                    Terms &amp; Policies
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="menu-wrapper-mobile flex lg:hidden mt-20 flex-col w-full">
                        <div className="footer-menu flex flex-wrap">
                            <div className="col_footer">
                                <a href="/portfolio" className="link_footer w-full inline-block">
                                    <p className="footer_nav-text">Portfolio</p>
                                </a>
                                <a href="/pricing" className="link_footer mt-7 w-full inline-block">
                                    <p className="footer_nav-text">Pricing</p>
                                </a>
                                <a
                                    href="/about-us"
                                    className="link_footer mt-7 w-full inline-block"
                                >
                                    <p className="footer_nav-text">About Us</p>
                                </a>
                                <div className="link_footer mt-7">
                                    <a
                                        href="/affiliate-terms-conditions"
                                        className="footer_nav-text"
                                    >
                                        Affiliates
                                    </a>
                                </div>
                            </div>
                            <div className="_2-menu">
                                <a
                                    href="/how-it-works"
                                    className="link_footer w-full inline-block mt-7 sm:mt-0"
                                >
                                    <p className="footer_nav-text">What You Get</p>
                                </a>
                                <a
                                    href="/terms-of-service"
                                    className="link_footer mt-7 w-full inline-block"
                                >
                                    <p className="footer_nav-text">Terms &amp; Policies</p>
                                </a>
                                <div className="link_footer mt-7 mob">
                                    <a href="/" className="footer_nav-text">
                                        Hiring 🔥
                                    </a>
                                </div>
                            </div>
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
                                src="/icons/website-icon.svg"
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
                                src="/icons/behance-icon.svg"
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
                                src="/icons/fb-icon.svg"
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
                                src="/icons/instagram-icon.svg"
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
                                src="/icons/twitter-icon.svg"
                                loading="lazy"
                                alt=""
                                className="ico-img"
                            />
                        </a>
                    </div>
                    <div className="footer-motto">
                        <p className="text-style-m center mob-ver">
                            Ovioo - awesome
                            <br />
                            on a cosmic level
                        </p>
                        <p className="text-style-m center desk">
                            Ovioo - awesome on a cosmic level
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
