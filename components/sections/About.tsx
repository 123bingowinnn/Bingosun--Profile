"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { useI18n } from "@/lib/i18n";
import { getContent } from "@/lib/content";

export function About() {
  const { lang } = useI18n();
  const content = getContent();
  const about = content.about[lang];

  return (
    <SectionWrapper id="about" className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
          {about.heading}
        </h2>
        <div className="space-y-4">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              {p}
            </p>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
