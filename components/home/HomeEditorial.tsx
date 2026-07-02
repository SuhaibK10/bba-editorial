import HeroSection from "./sections/HeroSection";
import TrustBar from "./sections/TrustBar";
import AboutSection from "./sections/AboutSection";
import ProductCarousel from "./sections/ProductCarousel";
import IndustriesSection from "./sections/IndustriesSection";
import ProcessSection from "./sections/ProcessSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import TrustBadges from "./sections/TrustBadges";
import CtaSection from "./sections/CtaSection";

export default function HomeEditorial() {
  return (
    <div className="bg-white">
        <HeroSection />
        <TrustBar />
        <ProductCarousel />   
        <AboutSection />      
        <IndustriesSection />
        <ProcessSection />
        <TestimonialsSection />
        <TrustBadges />
        <CtaSection />
    </div>
  );
}