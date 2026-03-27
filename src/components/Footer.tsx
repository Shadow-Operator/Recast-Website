import recastIcon from "@/assets/recast-icon.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background px-4 md:px-12 py-8 md:py-10 flex flex-col items-center gap-6 md:flex-row md:justify-between" role="contentinfo">
      <a href="#" className="flex items-center">
        <img src={recastIcon} alt="Recast" className="h-12" />
      </a>
      <ul className="flex flex-wrap justify-center gap-8">
        <li><a href="/brands" className="text-muted-foreground text-[11px] tracking-[0.08em] uppercase font-medium hover:text-foreground transition-colors">For Brands</a></li>
        <li><a href="/creators" className="text-muted-foreground text-[11px] tracking-[0.08em] uppercase font-medium hover:text-foreground transition-colors">For Creators</a></li>
        <li><a href="/#how" className="text-muted-foreground text-[11px] tracking-[0.08em] uppercase font-medium hover:text-foreground transition-colors">How It Works</a></li>
        <li><a href="/blog" className="text-muted-foreground text-[11px] tracking-[0.08em] uppercase font-medium hover:text-foreground transition-colors">Blog</a></li>
        <li><a href="mailto:harry@recast.gg" className="text-muted-foreground text-[11px] tracking-[0.08em] uppercase font-medium hover:text-foreground transition-colors">Contact</a></li>
      </ul>
      <p className="text-[11px] text-muted-foreground">
        © {new Date().getFullYear()} Recast. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
