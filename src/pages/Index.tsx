import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import OldVsNew from "@/components/OldVsNew";
import StreamDemo from "@/components/StreamDemo";
import ComparisonTable from "@/components/ComparisonTable";
import EarningsEngine from "@/components/EarningsEngine";
import RevenueCalculator from "@/components/RevenueCalculator";
import ChannelControl from "@/components/ChannelControl";
import Partnership from "@/components/Partnership";
import Timeline from "@/components/Timeline";
import Creators from "@/components/Creators";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <Navbar />
      <Hero />
      <Brands />
      <OldVsNew />
      <StreamDemo />
      <ComparisonTable />
      <EarningsEngine />
      <RevenueCalculator />
      <ChannelControl />
      <Partnership />
      <Timeline />
      <Creators />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
