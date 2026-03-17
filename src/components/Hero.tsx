import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 relative overflow-hidden">
      {/* Ticker */}
      <div className="overflow-hidden mb-16">
        <motion.div
          className="marquee-track animate-scroll-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center pr-20">
              <span className="text-[clamp(52px,8vw,110px)] font-body font-black tracking-[-3px] leading-none lowercase whitespace-nowrap">
                where gaming meets gambling
              </span>
              <span className="text-muted-foreground mx-20 text-4xl">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom two-col */}
      <div className="grid md:grid-cols-2 gap-12 items-end max-w-[1400px]">
        <motion.p
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[520px]"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <strong className="text-foreground font-semibold">
            Recast is the talent agency connecting the world's top content creators with leading betting and gaming brands.
          </strong>{" "}
          We specialise in high-value partnerships that perform — built on real audiences, real influence, and real results.
        </motion.p>

        <motion.div
          className="flex gap-4 md:justify-end"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <a
            href="#contact"
            className="bg-foreground text-background font-bold text-[15px] px-8 py-3.5 rounded-full hover:opacity-85 transition-opacity"
          >
            Get started
          </a>
          <a
            href="#how"
            className="border border-border text-foreground font-medium text-[15px] px-8 py-3.5 rounded-full hover:border-foreground/40 hover:bg-foreground/5 transition-all"
          >
            How it works
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
