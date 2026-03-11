import { motion } from "framer-motion";
import recastLogo from "@/assets/recast-logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-soft via-background to-pink-soft/50" 
        style={{ background: "linear-gradient(135deg, hsl(340,60%,95%) 0%, hsl(0,0%,100%) 40%, hsl(340,60%,95%) 100%)" }} 
      />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full gradient-pink opacity-10 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full gradient-pink opacity-10 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      
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
          className="text-5xl md:text-7xl lg:text-8xl font-display font-900 tracking-tight leading-[0.95] mb-8"
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
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Recast empowers you to efficiently and effectively streamline your brand by creating, managing, and facilitating content for you.
        </motion.p>

        <motion.a
          href="#work-with-us"
          className="inline-block gradient-pink text-primary-foreground font-display font-semibold px-10 py-4 rounded-full text-lg glow-pink hover:scale-105 transition-transform cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Apply Now
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
