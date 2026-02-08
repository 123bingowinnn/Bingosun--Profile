"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { ResumePreview } from "@/components/ResumePreview";

function useTypewriter(text: string, speed: number = 40, startDelay: number = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setDisplayed("");
    setDone(false);

    if (shouldReduceMotion) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay, shouldReduceMotion]);

  return { displayed, done };
}

function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouse = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const { lang } = useI18n();
  const content = getContent();
  const hero = content.hero[lang];
  const shouldReduceMotion = useReducedMotion();
  const { displayed: typedTagline, done: taglineDone } = useTypewriter(hero.tagline, 25, 800);
  const [resumePreviewOpen, setResumePreviewOpen] = useState(false);

  const fadeUp = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] },
      };

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center px-4 sm:px-6 pt-16 overflow-hidden bg-noise">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[100px]" />
        <motion.div
          className="absolute top-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-blue-500/8 to-purple-500/8 blur-3xl dark:from-blue-500/15 dark:to-purple-500/15"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 h-[350px] w-[350px] rounded-full bg-gradient-to-r from-pink-500/6 to-orange-500/6 blur-3xl dark:from-pink-500/12 dark:to-orange-500/12"
          animate={{
            x: [0, -25, 20, 0],
            y: [0, 20, -30, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        {/* Greeting chip */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-md shadow-sm transition-colors hover:bg-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {lang === "en" ? "Welcome to my portfolio" : "欢迎来到我的个人主页"}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-6"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50 dark:from-white dark:via-white/90 dark:to-white/50">
            {hero.name}
          </span>
        </motion.h1>

        {/* Title */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-lg sm:text-xl text-muted-foreground font-medium mb-6"
        >
          {hero.title}
        </motion.p>

        {/* Typewriter Tagline */}
        <motion.div {...fadeUp(0.3)} className="min-h-[4rem] sm:min-h-[3.5rem] mb-10">
          <p className="text-base sm:text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
            {typedTagline}
            {!taglineDone && (
              <motion.span
                className="inline-block w-0.5 h-5 bg-foreground/60 ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              />
            )}
          </p>
        </motion.div>

        {/* Wrapper for the text content to sit on top of a glow */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="absolute -inset-x-20 -top-20 -bottom-20 bg-gradient-radial from-primary/5 to-transparent blur-2xl -z-10 pointer-events-none" />

          <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <Button
                size="lg"
                onClick={() => setResumePreviewOpen(true)}
                className="bg-primary/5 hover:bg-primary/10 text-foreground backdrop-blur-md border border-primary/10 shadow-xl shadow-primary/5 transition-all duration-300"
              >
                <FileText className="h-4 w-4 mr-2" />
                {hero.resumeLabel}
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button size="lg" variant="outline" asChild className="hover:shadow-lg transition-shadow">
                <a href="#contact">
                  <Mail className="h-4 w-4" />
                  {hero.contactLabel}
                </a>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-16"
        >
          <button
            onClick={() => document.getElementById("proof")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex flex-col items-center gap-2 text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            aria-label="Scroll down"
          >
            <span className="text-xs uppercase tracking-widest">
              {lang === "en" ? "Scroll" : "下滑"}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </button>
        </motion.div>
      </div>

      <ResumePreview open={resumePreviewOpen} onOpenChange={setResumePreviewOpen} />
    </section>
  );
}
