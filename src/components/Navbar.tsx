import { useState } from "react";
import recastIcon from "@/assets/recast-icon.png";

const navLinks = [
  { href: "#mechanism", label: "The Mechanism" },
  { href: "#how", label: "How It Works" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-3 md:py-4 px-4 md:px-10 bg-[hsla(220,20%,4%,0.9)] backdrop-blur-xl border-b border-border/30">
      <a href="#" className="flex items-center">
        <img src={recastIcon} alt="Recast" className="h-8 md:h-12" />
      </a>

      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-muted-foreground text-sm font-medium tracking-wide hover:text-primary transition-colors">
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" className="gradient-blue text-primary-foreground font-semibold text-sm px-6 py-2.5 rounded-full hover:opacity-85 transition-opacity">
            Start earning
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
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/30 md:hidden">
          <ul className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMobileOpen(false)} className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" onClick={() => setMobileOpen(false)} className="gradient-blue text-primary-foreground font-semibold text-sm px-6 py-2.5 rounded-full">
                Start earning
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
