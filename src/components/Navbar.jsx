import { cn } from "@/lib/utils";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll state
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when menu open (mobile)
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* NAV */}
      <nav
        className={cn(
          "fixed top-0 left-0 w-full transition-all duration-300",
          "z-100", // important: above hero effects
          "bg-background/90 dark:bg-background/70 backdrop-blur-md border-b border-border",
          isScrolled ? "py-3 shadow-sm" : "py-5"
        )}
      >
        <div className="container flex items-center justify-between">
          {/* Brand */}
          <a
            className="text-xl font-bold flex items-center max-w-[65%] md:max-w-none"
            href="#hero"
          >
            <span className="text-glow text-foreground">Abdul Kalam Syed</span>
            {/* Hide on very small screens to avoid crowding */}
            <span className="ml-2 text-primary hidden sm:inline">Portfolio</span>
          </a>

          <div className="flex items-center gap-4">
            {/* Desktop nav */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Socials: desktop only */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com/abdulksyed10"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/abdul-kalam-syed"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>

            {/* Compact controls on the right */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="md:hidden p-2 text-foreground z-120"
                aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                type="button"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div
        className={cn(
          "fixed left-0 right-0 bottom-0 top-[76px] md:hidden",
          "z-110", // above hero, below the button
          "bg-background/95 dark:bg-background/85 backdrop-blur-md",
          "transition-opacity duration-300",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={closeMenu}
      >
        <div
          className="h-full w-full flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Links */}
          <div className="flex flex-col items-center space-y-8 text-2xl">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/90 hover:text-primary transition-colors duration-300"
                onClick={closeMenu}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Socials: mobile only (below links) */}
          <div className="mt-10 flex items-center gap-6">
            <a
              href="https://github.com/abdulksyed10"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-foreground/80 hover:text-primary transition-colors"
              onClick={closeMenu}
            >
              <Github size={28} />
            </a>

            <a
              href="https://www.linkedin.com/in/abdul-kalam-syed"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-foreground/80 hover:text-primary transition-colors"
              onClick={closeMenu}
            >
              <Linkedin size={28} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
