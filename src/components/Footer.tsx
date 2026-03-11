import recastLogo from "@/assets/recast-logo.png";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground">
      <div className="container mx-auto px-6 text-center">
        <img src={recastLogo} alt="Recast" className="h-10 mx-auto mb-4 brightness-0 invert" />
        <p className="text-sm" style={{ color: "hsl(340, 10%, 60%)" }}>
          © {new Date().getFullYear()} Recast. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
