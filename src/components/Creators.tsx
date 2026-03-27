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
import samulx from "@/assets/samulx.png";
import queasy from "@/assets/queasy.png";
import harrietParkes from "@/assets/harriet-parkes.png";
import jarvis from "@/assets/jarvis.png";
import jonathanPeters from "@/assets/jonathan-peters.png";
import hannahMarbles from "@/assets/hannah-marbles.png";

const creators: { name: string; img: string }[] = [
  { name: "Charlotte Parkes", img: charlotteParkes },
  { name: "Teeqo", img: teeqo },
  { name: "Ellie Vandeel", img: ellieVandeel },
  { name: "HighSky", img: highsky },
  { name: "K Jane Caron", img: kJaneCaron },
  { name: "Temperr", img: temperr },
  { name: "Khanada", img: khanada },
  { name: "AllInAbe", img: allinabe },
  { name: "P God", img: pGod },
  { name: "Samulx", img: samulx },
  { name: "Queasy", img: queasy },
  { name: "Harriet Parkes", img: harrietParkes },
  { name: "Jarvis", img: jarvis },
  { name: "Jonathan Peters", img: jonathanPeters },
  { name: "Hannah Marbles", img: hannahMarbles },
];

const CreatorCard = ({ name, img }: { name: string; img: string }) => (
  <div className="flex-shrink-0 w-36 sm:w-48 md:w-64 group cursor-pointer">
    <div className="relative overflow-hidden rounded-sm border border-border group-hover:border-blue-accent/40 transition-all duration-500">
      <img
        src={img}
        alt={name}
        className="w-36 h-48 sm:w-48 sm:h-64 md:w-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
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

      <div className="relative">
        <div className="flex gap-3 sm:gap-4 md:gap-6 animate-scroll-left">
          {creators.map((creator) => (
            <CreatorCard key={creator.name} name={creator.name} img={creator.img} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Creators;
