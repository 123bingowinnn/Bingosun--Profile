"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  FolderGit2,
  Languages,
  Trophy,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import type { ProofItem } from "@/lib/types";
import { OffersDialog } from "@/components/OffersDialog";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Briefcase,
  FolderGit2,
  Languages,
  Trophy,
};

function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (shouldReduceMotion) {
      setDisplay(value);
      return;
    }
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value, inView, shouldReduceMotion]);

  return <span>{display}</span>;
}

function ProofCard({ item, index, onOffersClick }: { item: ProofItem; index: number; onOffersClick?: () => void }) {
  const { lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = iconMap[item.icon];
  const localized = item[lang];
  const shouldReduceMotion = useReducedMotion();

  // Special handling for "Offers" card
  const isOffersCard = item.icon === "GraduationCap";

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative flex flex-col items-start justify-between p-6 h-full min-h-[160px] rounded-3xl border border-primary/10 bg-primary/5 backdrop-blur-md transition-all duration-500 overflow-hidden ${isOffersCard
        ? 'hover:bg-primary/10 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer'
        : 'hover:bg-primary/10 hover:border-primary/20'
        }`}
      onClick={isOffersCard ? onOffersClick : undefined}
    >
      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="flex w-full items-start justify-between">
        <div className="p-2 rounded-2xl bg-white/5 border border-white/10 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
          {Icon && <Icon className="h-5 w-5" />}
        </div>

        {isOffersCard && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            {lang === 'en' ? 'View' : '查看'}
          </div>
        )}
      </div>

      <div className="mt-auto space-y-1 z-10">
        <div className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
          {item.numericValue != null ? (
            <AnimatedNumber value={item.numericValue} inView={inView} />
          ) : (
            localized.value
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground/60">{localized.label}</span>
          {item.numericValue != null && (
            <span className="text-xs text-muted-foreground/40">{localized.value}</span>
          )}
          {item.subtitle && (
            <span className="text-xs text-primary/80 font-medium mt-0.5">{item.subtitle[lang]}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProofStrip() {
  const content = getContent();
  const [offersDialogOpen, setOffersDialogOpen] = useState(false);

  return (
    <>
      <section id="proof" className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.proofStrip.map((item, i) => (
              <ProofCard
                key={i}
                item={item}
                index={i}
                onOffersClick={() => setOffersDialogOpen(true)}
              />
            ))}
          </div>
        </div>
      </section>

      <OffersDialog open={offersDialogOpen} onOpenChange={setOffersDialogOpen} />
    </>
  );
}
