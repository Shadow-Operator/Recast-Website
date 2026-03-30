import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Mission from "@/components/Mission";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import TwoCol from "@/components/TwoCol";
import Creators from "@/components/Creators";
import Testimonials from "@/components/Testimonials";

import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Helmet>
        <title>Recast | The Creator Agency</title>
        <meta name="description" content="Recast connects creators with brands across every platform and every industry. High-value partnerships built on real audiences and real results." />
        <link rel="canonical" href="https://recast.gg/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Recast",
          "url": "https://recast.gg",
          "description": "Talent agency connecting streaming creators with leading brands.",
          "sameAs": [
            "https://instagram.com/recastgg"
          ]
        })}</script>
      </Helmet>
      <Navbar />
      <div id="main-content" tabIndex={-1} />
      <Hero />
      <Brands />
      <Mission />
      <Creators />
      <Services />
      <HowItWorks />
      <TwoCol />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
