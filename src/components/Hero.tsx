import { motion } from "framer-motion";
import recastLogo from "@/assets/recast-logo.png";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsla(340,60%,10%,0.4) 0%, hsla(340,60%,10%,0.6) 100%)" }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.img
          src={recastLogo}
          alt="Recast Logo"
          className="mx-auto h-16 md:h-20 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />
        
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-display tracking-wider leading-[1.05] mb-8 text-primary-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          STRETCH YOUR
          <br />
          <span className="text-gradient-pink">REACH</span>
          <br />
          WITHOUT STRETCHING
          <br />
          YOURSELF THIN
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto text-lg md:text-xl mb-10 font-light text-primary-foreground/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Recast empowers you to efficiently and effectively streamline your brand by creating, managing, and facilitating content for you.
        </motion.p>

        <motion.a
          href="#work-with-us"
          className="inline-block gradient-pink text-primary-foreground font-display text-2xl tracking-wider px-10 py-4 rounded-full glow-pink hover:scale-105 transition-transform cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          APPLY NOW
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
