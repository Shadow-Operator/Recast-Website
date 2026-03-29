import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import recastIcon from "@/assets/recast-icon.png";

const navLinks = [
  { to: "/brands", label: "For Brands" },
  { to: "/creators", label: "For Creators" },
  { to: "/#how", label: "How It Works" },
  { to: "/blog", label: "Blog" },
];

const noiseBackground = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='rock'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.35 0.55' numOctaves='8' stitchTiles='stitch' seed='5'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='0.6' intercept='0.1'/%3E%3CfeFuncG type='linear' slope='0.6' intercept='0.1'/%3E%3CfeFuncB type='linear' slope='0.6' intercept='0.1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23rock)' opacity='0.22'/%3E%3C/svg%3E")`;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const newOpacity = Math.max(0.7, 1 - window.scrollY / 1000);
          setOpacity(newOpacity);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-3 md:py-4 lg:py-5 px-4 md:px-6 lg:px-12 border-b border-border/30 backdrop-blur-sm transition-opacity duration-300"
      style={{
        backgroundColor: `hsla(0, 0%, 4%, ${opacity})`,
        backgroundImage: noiseBackground,
      }}
      aria-label="Main navigation"
    >
      <Link to="/" className="flex items-center gap-2">
        <img src={recastIcon} alt="Recast" className="h-14 md:h-16 lg:h-18" />
        <span className="text-foreground font-display font-bold text-xl md:text-2xl tracking-wide uppercase">RECAST</span>
      </Link>

      <ul className="hidden lg:flex items-center gap-8 xl:gap-10">
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-foreground text-[13px] font-bold tracking-[0.04em] uppercase hover:text-foreground/80 transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/#contact" className="bg-blue-accent text-white font-semibold text-[13px] px-5 xl:px-6 py-2.5 hover:bg-blue-glow transition-colors">
            Get started
          </Link>
        </li>
      </ul>

      <button className="lg:hidden text-foreground p-2 relative z-[60]" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" aria-expanded={mobileOpen} aria-controls="mobile-menu">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {mobileOpen && createPortal(
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center lg:hidden"
          style={{ backgroundColor: "hsl(0, 0%, 4%)", backgroundImage: noiseBackground }}
        >
          <ul className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground text-[15px] font-bold tracking-[0.08em] uppercase hover:text-blue-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/#contact"
                onClick={() => setMobileOpen(false)}
                className="bg-blue-accent text-white font-semibold text-[14px] px-8 py-3 hover:bg-blue-glow transition-colors inline-block"
              >
                Get started
              </Link>
            </li>
          </ul>
        </div>,
        document.body
      )}
    </nav>
  );
};

export default Navbar;
