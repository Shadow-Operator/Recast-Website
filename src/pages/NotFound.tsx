import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-5 text-center">
        <p className="text-blue-accent text-[11px] font-bold tracking-[0.15em] uppercase mb-6">404</p>
        <h1 className="text-[clamp(48px,10vw,120px)] font-display font-extrabold tracking-[-0.03em] leading-[0.9] uppercase mb-6">
          Page Not<br />
          <span className="text-blue-accent">Found.</span>
        </h1>
        <p className="text-muted-foreground font-light max-w-[400px] mb-10 leading-relaxed">
          Looks like this page folded. Head back to the table.
        </p>
        <Link
          to="/"
          className="bg-blue-accent text-white font-semibold text-sm px-8 py-3 hover:bg-blue-glow transition-colors"
        >
          Back to home
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
