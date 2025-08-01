import HeroSection from "@/components/Home/heroSection";
import FeaturesSection from "@/components/Home/featuresSection";
import ProcessSection from "@/components/Home/processSection";
import TestimonialsSection from "@/components/Home/testimonialSection";
import CTASection from "@/components/Home/ctaSection";

import "@/app/globals.css";

export default function EsyHomepage() {
    return (
      <div className="origami-headers">
        <HeroSection />
        <FeaturesSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    );
  };