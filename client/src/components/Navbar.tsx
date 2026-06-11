import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-200",
        "bg-background/80 backdrop-blur-[12px] supports-[backdrop-filter]:bg-background/70",
        scrolled
          ? "shadow-brand-sm border-b border-border"
          : "border-b border-transparent",
      )}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-3 hover-elevate rounded-lg px-2 py-1 -ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            data-testid="link-home">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-serif text-2xl leading-none tracking-tight text-foreground">
              Resume <span className="italic text-primary">Analyzer</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded">
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded">
              How It Works
            </a>
            {/* <a
              href="#templates"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded"
            >
              Templates
            </a> */}
            <Button asChild data-testid="button-get-started">
              <Link href="/upload">Get Started</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            data-testid="button-mobile-menu">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            <a
              href="#features"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a
              href="#how-it-works"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </a>
            <a
              href="#templates"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Templates
            </a>
            <Button
              asChild
              className="w-full"
              data-testid="button-mobile-get-started">
              <Link href="/upload">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
