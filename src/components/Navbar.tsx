import recastLogo from "@/assets/recast-logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-10 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/50">
      <img src={recastLogo} alt="Recast" className="h-8 md:h-10 brightness-0 invert" />
      <a
        href="#work-with-us"
        className="gradient-pink text-primary-foreground font-display text-lg tracking-wider px-6 py-2.5 rounded-full hover:scale-105 transition-transform"
      >
        GET STARTED
      </a>
    </nav>
  );
};

export default Navbar;
