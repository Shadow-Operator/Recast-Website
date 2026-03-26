import recastIcon from "@/assets/recast-icon.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 bg-[hsl(220,20%,2%)] px-4 md:px-10 py-8 md:py-10 flex flex-col items-center gap-6 md:flex-row md:justify-between">
      <a href="#" className="flex items-center">
        <img src={recastIcon} alt="Recast" className="h-10" />
      </a>
      <ul className="flex flex-wrap justify-center gap-8">
        <li><a href="#mechanism" className="text-muted-foreground text-xs hover:text-primary transition-colors">The Mechanism</a></li>
        <li><a href="#how" className="text-muted-foreground text-xs hover:text-primary transition-colors">How It Works</a></li>
        <li><a href="mailto:harry@recast.gg" className="text-muted-foreground text-xs hover:text-primary transition-colors">Contact</a></li>
      </ul>
      <p className="text-xs text-foreground/20 font-mono">
        © {new Date().getFullYear()} Recast. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
