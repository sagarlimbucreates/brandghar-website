import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Services from "./components/Services";
import About from "./components/About";
import FeaturedWork from "./components/FeaturedWork";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <About />
      <FeaturedWork />
      <Process />
      <Testimonials />
      <CTABanner />
      <Footer />
    </>
  );
}
