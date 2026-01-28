import { ThemeToggle } from "../components/ThemeToggle";
import { AboutSection } from "../components/AboutSection";
import { StarBackground } from "@/components/StarBackground";
import { Navbar } from "../components/Navbar";
import { ContactSection } from "../components/ContactSection";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Background Effects */}
      <StarBackground />

      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <AboutSection />
        <ContactSection />
      </main>

      {/* Footer */}

    </div>
  );
};