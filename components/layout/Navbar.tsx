"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useI18n } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { lang } = useI18n();
  const pathname = usePathname();
  const content = getContent();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isHome = pathname === "/";

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const ids = content.nav.map((item) => item.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [content.nav]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print",
        scrolled
          ? "bg-background/60 backdrop-blur-xl border-b border-border/40 shadow-sm"
          : "bg-transparent"
      )}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground/20 origin-left"
        style={{ scaleX }}
      />

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 h-16">
        {/* Logo / Name / Back Button */}
        <div className="flex items-center gap-3">
          {!isHome && (
            <Link
              href="/"
              className="group flex items-center justify-center h-8 w-8 rounded-full bg-accent/50 hover:bg-accent transition-colors"
              aria-label="Back to Home"
            >
              <ArrowLeft className="h-4 w-4 text-foreground/70 group-hover:text-foreground transition-colors" />
            </Link>
          )}
          <Link
            href="/"
            className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            {content.hero[lang].name}
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {content.nav.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "relative px-3 py-2 text-sm rounded-md transition-colors",
                activeSection === item.id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item[lang]}
              {activeSection === item.id && (
                <motion.div
                  className="absolute inset-0 bg-accent rounded-md -z-10"
                  layoutId="nav-active"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
          <div className="ml-2 flex items-center gap-1 border-l border-border pl-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu with animation */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
        >
          <div className="flex flex-col px-4 py-3 gap-1">
            {content.nav.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "px-3 py-2.5 text-sm rounded-md text-left transition-colors",
                  activeSection === item.id
                    ? "text-foreground font-medium bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {item[lang]}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
