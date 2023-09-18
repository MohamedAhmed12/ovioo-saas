import "@/styles/components/animated-btn.scss";

export const AnimatedBtn = ({ title }: { title: string }) => (
    <a href="/demo" className="button-wrapper w-inline-block">
        <div className="button-outline">
            <div className="cta book-demo">
                <p className="buttons-l dark">{title}</p>
            </div>
        </div>
    </a>
);

export default AnimatedBtn;
