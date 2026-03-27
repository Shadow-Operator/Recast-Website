import { motion } from "framer-motion";
import AnimatedUnderline from "./AnimatedUnderline";

import creator1 from "@/assets/creator-1.jpg";
import creator2 from "@/assets/creator-2.jpg";
import creator3 from "@/assets/creator-3.jpg";
import creator4 from "@/assets/creator-4.jpg";
import creator5 from "@/assets/creator-5.jpg";
import creator6 from "@/assets/creator-6.jpg";
import creator7 from "@/assets/creator-7.jpg";
import creator8 from "@/assets/creator-8.jpg";

const topRow = [
  { name: "Charlotte Parkes", img: creator1 },
  { name: "Azra", img: creator2 },
  { name: "Bella Rama", img: creator3 },
  { name: "K Jane Caron", img: creator4 },
  { name: "Ellie Vandeel", img: creator5 },
  { name: "Teeqo", img: creator6 },
  { name: "HighSky", img: creator7 },
  { name: "Cam", img: creator8 },
  { name: "Ariel", img: creator1 },
  { name: "Amber Exclusive", img: creator2 },
  { name: "Temper", img: creator3 },
];

const bottomRow = [
  { name: "Khanada", img: creator4 },
  { name: "Allinabe", img: creator5 },
  { name: "Samulx", img: creator6 },
  { name: "Amber Jay", img: creator7 },
  { name: "Adelia", img: creator8 },
  { name: "Hailey", img: creator1 },
  { name: "Harriet Parkes", img: creator2 },
  { name: "Hannah Marbles", img: creator3 },
  { name: "Keep Chambers", img: creator4 },
  { name: "Nora", img: creator5 },
  { name: "Aleksandra Mariana", img: creator6 },
];

const CreatorCard = ({ name, img }: { name: string; img: string }) => (
  <div className="flex-shrink-0 w-28 sm:w-36 md:w-52 group cursor-pointer">
    <div className="relative overflow-hidden rounded-sm border border-border group-hover:border-blue-accent/40 transition-all duration-500">
      <img
        src={img}
        alt={name}
        className="w-28 h-36 sm:w-36 sm:h-48 md:w-52 md:h-68 object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  </div>
);

const Creators = () => {
  return (
    <section className="py-12 md:py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-14">
        <motion.p
          className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Representing the best creators
        </motion.p>
        <motion.h2
          className="text-3xl md:text-7xl font-display font-extrabold tracking-[-0.03em] text-center uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our{" "}
          <AnimatedUnderline delay={0.2}>
            <span className="text-blue-accent">creators</span>
          </AnimatedUnderline>
        </motion.h2>
      </div>

      {/* Top row - scrolls right */}
      <div className="relative mb-3 md:mb-6">
        <div className="flex gap-2 sm:gap-3 md:gap-5 animate-scroll-right">
          {[...topRow, ...topRow].map((c, i) => (
            <CreatorCard key={`top-${i}`} name={c.name} img={c.img} />
          ))}
        </div>
      </div>

      {/* Bottom row - scrolls left */}
      <div className="relative">
        <div className="flex gap-2 sm:gap-3 md:gap-5 animate-scroll-left">
          {[...bottomRow, ...bottomRow].map((c, i) => (
            <CreatorCard key={`bot-${i}`} name={c.name} img={c.img} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Creators;
