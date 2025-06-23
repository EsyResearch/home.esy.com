import Navigation from "./navigation";
import HeroSection from "./heroSection";
import FeaturesSection from "./featuresSection";
import ProcessSection from "./processSection";
import TestimonialsSection from "./testimonialSection";
import CTASection from "./ctaSection";
import Footer from "./footer";

import "../../app/globals.css";

export default function EsyHomepage() {
    return (
      <div>
        <Navigation />
        <HeroSection />
        <FeaturesSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    );
  };