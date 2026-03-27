import { useState, useEffect } from "react";
import recastIcon from "@/assets/recast-icon.png";

const navLinks = [
  { href: "/brands", label: "For Brands" },
  { href: "/creators", label: "For Creators" },
  { href: "/#how", label: "How It Works" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Fade from 1 to 0.7 over 300px of scroll
      const newOpacity = Math.max(0.7, 1 - scrollY / 1000);
      setOpacity(newOpacity);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-3 md:py-5 px-4 md:px-12 border-b border-border/30 backdrop-blur-sm transition-opacity duration-300"
      style={{
        backgroundColor: `hsla(0, 0%, 4%, ${opacity})`,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='rock'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.35 0.55' numOctaves='8' stitchTiles='stitch' seed='5'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='0.6' intercept='0.1'/%3E%3CfeFuncG type='linear' slope='0.6' intercept='0.1'/%3E%3CfeFuncB type='linear' slope='0.6' intercept='0.1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23rock)' opacity='0.22'/%3E%3C/svg%3E")`,
      }}
      aria-label="Main navigation"
    >
      <a href="#" className="flex items-center gap-2">
        <img src={recastIcon} alt="Recast" className="h-10 md:h-14" />
        <span className="text-foreground font-display font-bold text-xl md:text-2xl tracking-wide uppercase">RECAST</span>
      </a>

      <ul className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-foreground text-[13px] font-bold tracking-[0.04em] uppercase hover:text-foreground/80 transition-colors">
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" className="bg-blue-accent text-white font-semibold text-[13px] px-6 py-2.5 hover:bg-blue-glow transition-colors">
            Get started
          </a>
        </li>
      </ul>

      <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {mobileOpen && (
        <div
          className="absolute top-full left-0 right-0 border-b border-border/30 md:hidden backdrop-blur-sm"
          style={{ backgroundColor: `hsla(0, 0%, 8%, ${opacity})` }}
        >
          <ul className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMobileOpen(false)} className="text-foreground text-[13px] font-bold tracking-[0.04em] uppercase hover:text-foreground/80 transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" onClick={() => setMobileOpen(false)} className="bg-blue-accent text-white font-semibold text-[13px] px-6 py-2.5 hover:bg-blue-glow transition-colors">
                Get started
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
