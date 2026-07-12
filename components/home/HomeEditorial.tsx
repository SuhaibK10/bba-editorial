import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ClientsSection from "./sections/ClientsSection";
import ProductCarousel from "./sections/ProductCarousel";
import LegacySection from "./sections/LegacySection";
import IndustriesSection from "./sections/IndustriesSection";
import ProcessSection from "./sections/ProcessSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import TrustBadges from "./sections/TrustBadges";
import CtaSection from "./sections/CtaSection";

export default function HomeEditorial() {
  return (
    <div className="bg-background">
        <HeroSection />
        <AboutSection />
        <ClientsSection />
        <ProductCarousel />
        <LegacySection />
        <IndustriesSection />
        <ProcessSection />
        <TestimonialsSection />
        <TrustBadges />
        <CtaSection />
    </div>
  );
}