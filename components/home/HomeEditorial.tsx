import HeroSection from "./sections/HeroSection";
import TrustBar from "./sections/TrustBar";
import AboutSection from "./sections/AboutSection";
import ProductCarousel from "./sections/ProductCarousel";
import IndustriesSection from "./sections/IndustriesSection";
import ProcessSection from "./sections/ProcessSection";
import CtaSection from "./sections/CtaSection";

export default function HomeEditorial() {
  return (
    <div className="bg-white">
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <ProductCarousel />
      <IndustriesSection />
      <ProcessSection />
      <CtaSection />
    </div>
  );
}