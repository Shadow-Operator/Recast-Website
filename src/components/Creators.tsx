import { motion } from "framer-motion";

const creators = [
  "Hannah Marbles",
  "Harriet Parkes",
  "Jarvis",
  "Niah xoxo",
  "Charlotte Parkes",
];

const colors = [
  "from-pink-400 to-rose-500",
  "from-rose-400 to-pink-500",
  "from-fuchsia-400 to-pink-500",
  "from-pink-300 to-rose-400",
  "from-rose-300 to-fuchsia-400",
];

const Creators = () => {
  return (
    <section className="py-24 md:py-32" style={{ background: "linear-gradient(180deg, hsl(340,60%,95%) 0%, hsl(0,0%,100%) 100%)" }}>
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-display font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          OUR <span className="text-gradient-pink">CREATORS</span>
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {creators.map((name, i) => (
            <motion.div
              key={name}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`w-36 h-36 md:w-44 md:h-44 rounded-2xl bg-gradient-to-br ${colors[i]} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow`}>
                <span className="text-3xl md:text-4xl font-display font-bold text-primary-foreground opacity-80">
                  {name.charAt(0)}
                </span>
              </div>
              <p className="text-center mt-3 font-display font-semibold text-sm">{name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Creators;
