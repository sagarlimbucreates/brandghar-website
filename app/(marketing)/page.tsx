import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import Services from "../components/Services";
import About from "../components/About";
import FeaturedWork from "../components/FeaturedWork";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import CTABanner from "../components/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <About />
      <FeaturedWork />
      <Process />
      <Testimonials />
      <CTABanner />
    </>
  );
}
