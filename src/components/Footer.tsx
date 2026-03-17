import recastIcon from "@/assets/recast-icon.png";

const Footer = () => {
  return (
    <footer className="border-t border-border px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <a href="#" className="flex items-center gap-2">
        <img src={recastIcon} alt="Recast" className="h-5 invert" />
        <span className="text-foreground font-body font-bold text-sm tracking-tight">RECAST</span>
      </a>
      <ul className="flex flex-wrap justify-center gap-8">
        <li><a href="#brands" className="text-muted-foreground text-[13px] hover:text-primary transition-colors">For Brands</a></li>
        <li><a href="#creators" className="text-muted-foreground text-[13px] hover:text-primary transition-colors">For Creators</a></li>
        <li><a href="#how" className="text-muted-foreground text-[13px] hover:text-primary transition-colors">How It Works</a></li>
        <li><a href="mailto:harry@recast.gg" className="text-muted-foreground text-[13px] hover:text-primary transition-colors">Contact</a></li>
      </ul>
      <p className="text-xs text-foreground/30">
        © {new Date().getFullYear()} Recast. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
