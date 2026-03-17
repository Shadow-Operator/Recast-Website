const brandNames = [
  "Fanatics", "Papa John's", "Stake", "Betway", "DraftKings", "FanDuel", "888sport",
];

const Brands = () => {
  return (
    <section className="py-20 border-y border-border overflow-hidden">
      <p className="text-center text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-12">
        Brands we work with
      </p>
      <div className="overflow-hidden">
        <div className="marquee-track animate-scroll-right">
          {[...brandNames, ...brandNames].map((name, i) => (
            <span key={i} className="flex items-center gap-16 md:gap-20 px-8 md:px-10">
              <span className="text-xl md:text-[22px] font-bold tracking-[-0.5px] text-foreground/20 hover:text-foreground/60 transition-colors whitespace-nowrap">
                {name}
              </span>
              <span className="text-foreground/20">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
