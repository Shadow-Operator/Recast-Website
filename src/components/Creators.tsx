import charlotteParkes from "@/assets/IMG_6876.jpg";
import teeqo from "@/assets/teeqo.jpg";

import highsky from "@/assets/highsky.jpg";
import kJaneCaron from "@/assets/IMG_6877.jpg";

import khanada from "@/assets/khanada.webp";
import allinabe from "@/assets/allinabe.webp";
import pGod from "@/assets/p-god.jpg";
import samulx from "@/assets/samulx.webp";

import harrietParkes from "@/assets/harriet-parkes.webp";
import jarvis from "@/assets/jarvis.webp";
import jonathanPeters from "@/assets/jonathan-peters.webp";
import hannahMarbles from "@/assets/hannah-marbles.webp";

const creators: { name: string; img: string; platform: string; followers: string }[] = [
  { name: "Charlotte Parkes", img: charlotteParkes, platform: "YouTube", followers: "5.2M" },
  { name: "Teeqo", img: teeqo, platform: "YouTube", followers: "2.68M" },

  { name: "H1ghSky1", img: highsky, platform: "YouTube", followers: "2.5M" },
  { name: "K Jane Caron", img: kJaneCaron, platform: "Instagram", followers: "635K" },

  { name: "Khanada", img: khanada, platform: "Twitch", followers: "924K" },
  { name: "AllInAbe", img: allinabe, platform: "Kick", followers: "135K" },
  { name: "P God", img: pGod, platform: "Twitch", followers: "856K" },
  { name: "Samulx", img: samulx, platform: "Kick", followers: "421K" },

  { name: "Harriet Parkes", img: harrietParkes, platform: "Instagram", followers: "165K" },
  { name: "FaZe Jarvis", img: jarvis, platform: "YouTube", followers: "5.69M" },
  { name: "Jonathan Peters", img: jonathanPeters, platform: "Instagram", followers: "9M" },
  { name: "Hannah Marbles", img: hannahMarbles, platform: "YouTube", followers: "1.86M" },
];

const CreatorCard = ({ name, img, platform, followers }: { name: string; img: string; platform: string; followers: string }) => (
  <div className="flex-shrink-0 w-44 sm:w-56 md:w-72 group cursor-pointer">
    <div className="relative overflow-hidden rounded-sm border border-border group-hover:border-blue-accent/40 transition-all duration-500">
      <img
        src={img}
        alt={`${name} - ${platform} creator`}
        loading="lazy"
        decoding="async"
        width={288}
        height={448}
        className="w-44 h-56 sm:w-56 sm:h-72 md:w-72 md:h-[28rem] object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 md:p-4">
        <p className="text-white font-display font-bold text-sm md:text-base tracking-tight">{name}</p>
        <p className="text-white/60 text-[10px] md:text-xs font-medium tracking-wide uppercase">
          {platform} · {followers}
        </p>
      </div>
    </div>
  </div>
);

const Creators = () => {
  return (
    <section className="py-4 md:py-6 overflow-hidden bg-background">
      <div className="relative overflow-hidden">
        <div
          className="flex gap-0 w-max animate-scroll-right"
          style={{ willChange: "transform" }}
        >
          {[...creators, ...creators].map((creator, index) => (
            <CreatorCard key={`${creator.name}-${index}`} name={creator.name} img={creator.img} platform={creator.platform} followers={creator.followers} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Creators;

