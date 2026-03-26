import { motion } from "framer-motion";
import { useState } from "react";

const viewers = [1000, 2000, 3000, 5000, 10000];
const hours = [100, 150, 200, 250];
const CPM = 15;
const ADS_PER_HOUR = 6;

const calcRevenue = (ccv: number, hrs: number) =>
  Math.round((ccv / 1000) * CPM * ADS_PER_HOUR * hrs);

const formatMoney = (v: number) =>
  v >= 1000 ? `$${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k` : `$${v}`;

const RevenueCalculator = () => {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-32 px-4 md:px-12 max-w-[1200px] mx-auto">
      <motion.div
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-[clamp(28px,4vw,48px)] font-body font-bold tracking-[-1px] mb-4">
          Uncapped Scaling at $15 CPM.
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          6 Ads Per Hour. Paid per 1,000 viewers. The more you stream, the more you earn.
        </p>
      </motion.div>

      <motion.div
        className="glass-card overflow-hidden hud-grid-dense relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
      >
        {/* Title bar */}
        <div className="p-4 md:p-6 border-b border-border/50 flex items-center justify-between">
          <p className="font-body font-semibold text-sm md:text-base">Revenue Calculator</p>
          <motion.div
            className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10"
            animate={{ borderColor: ["hsla(199,89%,58%,0.3)", "hsla(199,89%,58%,0.6)", "hsla(199,89%,58%,0.3)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-primary text-xs font-mono font-bold">
              {hoveredCell ? formatMoney(parseInt(hoveredCell)) + " / mo" : "$225k / mo"}
            </span>
          </motion.div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr>
                <th className="p-3 md:p-4 text-left text-xs font-mono text-muted-foreground/40">
                  <span className="writing-mode-vertical hidden md:inline">Avg CCV</span>
                  <span className="md:hidden">CCV</span>
                </th>
                {hours.map((h) => (
                  <th key={h} className="p-3 md:p-4 text-center text-xs font-mono text-muted-foreground/60">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...viewers].reverse().map((ccv) => (
                <tr key={ccv} className="border-t border-border/20">
                  <td className="p-3 md:p-4 text-sm font-mono text-muted-foreground/60">
                    {ccv.toLocaleString()}
                  </td>
                  {hours.map((h) => {
                    const rev = calcRevenue(ccv, h);
                    const isMax = ccv === 10000 && h === 250;
                    return (
                      <td
                        key={`${ccv}-${h}`}
                        className={`p-3 md:p-4 text-center text-sm font-mono transition-colors cursor-default ${
                          isMax
                            ? "text-primary font-bold bg-primary/10"
                            : hoveredCell === String(rev)
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                        }`}
                        onMouseEnter={() => setHoveredCell(String(rev))}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        {formatMoney(rev)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-border/30">
                <td />
                {hours.map((h) => (
                  <td key={h} className="p-3 md:p-4 text-center text-xs font-mono text-muted-foreground/40">
                    {h}
                  </td>
                ))}
              </tr>
              <tr>
                <td />
                <td colSpan={4} className="text-center text-xs font-mono text-muted-foreground/30 pb-4">
                  Hours / Month
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>
    </section>
  );
};

export default RevenueCalculator;
