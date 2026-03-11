import { motion } from "framer-motion";

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
  <div className="flex-shrink-0 w-44 md:w-52 group cursor-pointer">
    <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
      <img
        src={img}
        alt={name}
        className="w-44 h-52 md:w-52 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <p className="absolute bottom-3 left-3 right-3 font-display text-xl tracking-wide text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {name.toUpperCase()}
      </p>
    </div>
  </div>
);

const Creators = () => {
  return (
    <section className="py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(340,60%,95%) 0%, hsl(0,0%,100%) 100%)" }}>
      <div className="container mx-auto px-6 mb-14">
        <motion.h2
          className="text-5xl md:text-7xl font-display tracking-wider text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          OUR <span className="text-gradient-pink">CREATORS</span>
        </motion.h2>
      </div>

      {/* Top row - scrolls right */}
      <div className="relative mb-6">
        <div className="flex gap-5 animate-scroll-right">
          {[...topRow, ...topRow].map((c, i) => (
            <CreatorCard key={`top-${i}`} name={c.name} img={c.img} />
          ))}
        </div>
      </div>

      {/* Bottom row - scrolls left */}
      <div className="relative">
        <div className="flex gap-5 animate-scroll-left">
          {[...bottomRow, ...bottomRow].map((c, i) => (
            <CreatorCard key={`bot-${i}`} name={c.name} img={c.img} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Creators;
