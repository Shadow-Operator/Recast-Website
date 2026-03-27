import { motion } from "framer-motion";
import AnimatedUnderline from "./AnimatedUnderline";

import charlotteParkes from "@/assets/charlotte-parkes.png";
import teeqo from "@/assets/teeqo.png";
import ellieVandeel from "@/assets/ellie-vandeel.png";
import highsky from "@/assets/highsky.png";
import kJaneCaron from "@/assets/k-jane-caron.png";
import temperr from "@/assets/temperr.png";
import khanada from "@/assets/khanada.png";
import allinabe from "@/assets/allinabe.png";
import pGod from "@/assets/p-god.png";

const topRow: { name: string; img: string }[] = [
  { name: "Charlotte Parkes", img: charlotteParkes },
  { name: "Teeqo", img: teeqo },
  { name: "Ellie Vandeel", img: ellieVandeel },
  { name: "HighSky", img: highsky },
  { name: "K Jane Caron", img: kJaneCaron },
  { name: "Temperr", img: temperr },
];

const bottomRow: { name: string; img: string }[] = [
  { name: "Khanada", img: khanada },
  { name: "AllInAbe", img: allinabe },
  { name: "P God", img: pGod },
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
