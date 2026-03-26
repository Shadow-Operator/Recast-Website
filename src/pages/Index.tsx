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
