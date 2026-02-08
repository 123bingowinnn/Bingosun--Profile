"use client";

import { GraduationCap, MapPin } from "lucide-react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { useI18n } from "@/lib/i18n";
import { getContent } from "@/lib/content";

export function Education() {
  const { lang } = useI18n();
  const content = getContent();

  return (
    <SectionWrapper id="education" className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-10">
          {lang === "en" ? "Education" : "教育经历"}
        </h2>

        <div className="space-y-6">
          {content.education.map((edu, i) => {
            const e = edu[lang];
            return (
              <div
                key={i}
                className="rounded-xl border border-border bg-card/50 p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCap className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-semibold">{e.school}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{e.degree}</p>
                  </div>
                  <div className="text-sm text-muted-foreground text-right">
                    <p>{e.period}</p>
                    <p className="flex items-center gap-1 sm:justify-end">
                      <MapPin className="h-3 w-3" />
                      {e.location}
                    </p>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {e.highlights.map((h, j) => (
                    <li key={j} className="text-sm text-muted-foreground/90 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-muted-foreground/40">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
