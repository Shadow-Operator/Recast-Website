import recastLogo from "@/assets/recast-logo.png";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-6 text-center">
        <img src={recastLogo} alt="Recast" className="h-10 mx-auto mb-4 brightness-0 invert" />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Recast. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
