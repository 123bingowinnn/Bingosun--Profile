"use client";

import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { getContent } from "@/lib/content";

export function ExperiencePreview() {
  const { lang } = useI18n();
  const content = getContent();
  const experiences = content.experience.slice(0, 4);

  return (
    <SectionWrapper id="experience" className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {lang === "en" ? "Internships" : "实习经历"}
          </h2>
          <Link href="/experience" className="hidden sm:block">
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
              {lang === "en" ? "View all" : "查看全部"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          {experiences.map((exp) => {
            const e = exp[lang];
            return (
              <div
                key={exp.slug}
                className="group relative pl-8 border-l-2 border-border hover:border-foreground/30 transition-colors"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-border bg-background group-hover:border-foreground/40 transition-colors" />

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">{e.role}</h3>
                    <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                      <Building2 className="h-3.5 w-3.5" />
                      {e.company}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {e.period}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{e.summary}</p>

                <ul className="space-y-1.5 mb-3">
                  {e.bullets.slice(0, 3).map((bullet, i) => (
                    <li key={i} className="text-sm text-muted-foreground/90 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-muted-foreground/40">
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link href="/experience">
            <Button variant="outline" size="sm" className="gap-1">
              {lang === "en" ? "View all internships" : "查看所有实习"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
