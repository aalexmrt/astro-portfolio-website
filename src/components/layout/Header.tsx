import { Moon, Sun, Menu, X, Home } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Sync with localStorage and ensure dark class is on HTML
    const savedTheme = localStorage.getItem("theme");
    const shouldBeDark = savedTheme !== "light";

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    // Track active section on scroll
    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50">
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 w-full relative">
          {/* Home Icon */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 group"
            aria-label="Scroll to top"
          >
            <Home className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors relative z-10" />
          </button>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                  activeSection === link.id
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600 dark:bg-cyan-400 rounded-full"></span>
                )}
                <span className="absolute inset-0 bg-cyan-600/10 dark:bg-cyan-400/10 rounded-lg scale-0 hover:scale-100 transition-transform duration-200"></span>
              </a>
            ))}
          </div>

          {/* Right Side - Theme Toggle (Desktop) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 group"
              aria-label="Toggle theme"
            >
              <span className="absolute inset-0 bg-cyan-600/10 dark:bg-cyan-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200"></span>
              {isDark ? (
                <Sun className="w-5 h-5 text-zinc-600 dark:text-white relative z-10 transition-transform duration-200 group-hover:scale-110" />
              ) : (
                <Moon className="w-5 h-5 text-zinc-600 dark:text-white relative z-10 transition-transform duration-200 group-hover:scale-110" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 group"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-zinc-900 dark:text-white transition-transform duration-200 rotate-90" />
            ) : (
              <Menu className="w-5 h-5 text-zinc-900 dark:text-white transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-2 border-t border-zinc-200 dark:border-zinc-800 pt-4">
            <button
              onClick={scrollToTop}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === "hero"
                  ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 border-l-2 border-cyan-600 dark:border-cyan-400"
                  : "text-zinc-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === link.id
                    ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 border-l-2 border-cyan-600 dark:border-cyan-400"
                    : "text-zinc-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-zinc-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 text-sm font-medium"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
                <span>Toggle Theme</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
