import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SuccessStories from "@/components/SuccessStories";
import Creators from "@/components/Creators";
import Mission from "@/components/Mission";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <Services />
      <SuccessStories />
      <Creators />
      <Mission />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
