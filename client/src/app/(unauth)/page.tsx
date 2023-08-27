import Carousel from "@/components/Home/Carousel";
import { IntroContainer } from "@/components/Home/IntroContainer";
import "@/styles/app/unauth/home.scss";

export default function Home() {
    return (
        <div className="home-main items-center flex flex-col">
            <IntroContainer />
            <Carousel
                title={
                    <h3 className="carousel-title">
                        Light plan – $35<small> / day</small>
                    </h3>
                }
            />
              <Carousel
                title={
                    <h3 className="carousel-title">
                        Pro plan – $99<small> / day</small>
                    </h3>
                }
            />
        </div>
    );
}
