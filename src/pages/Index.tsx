import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Mission from "@/components/Mission";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import TwoCol from "@/components/TwoCol";
import Creators from "@/components/Creators";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <Helmet>
        <title>Recast – Social Media Talent Agency | Stretch Your Reach</title>
        <meta name="description" content="Recast connects top content creators with leading betting and gaming brands. High-value partnerships built on real audiences, real influence, and real results." />
        <link rel="canonical" href="https://recastgg.lovable.app/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Recast",
          "url": "https://recastgg.lovable.app",
          "description": "Social media talent agency connecting creators with betting and gaming brands.",
          "sameAs": []
        })}</script>
      </Helmet>
      <Navbar />
      <Hero />
      <Brands />
      <Mission />
      <Services />
      <HowItWorks />
      <TwoCol />
      <Creators />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
