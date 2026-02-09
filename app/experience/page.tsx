"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import { getContent, getAllTags } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { TagFilter } from "@/components/TagFilter";
import { SectionWrapper } from "@/components/SectionWrapper";

export default function ExperiencePage() {
  const { lang } = useI18n();
  const content = getContent();
  const allTags = getAllTags(content.experience);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? content.experience.filter((e) => e.tags.includes(activeTag))
    : content.experience;

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionWrapper>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {lang === "en" ? "Internships" : "实习经历"}
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
            {lang === "en"
              ? "Internships across product management, software engineering, and data."
              : "涵盖产品管理、软件工程和数据方向的实习经历。"}
          </p>
        </SectionWrapper>

        <div className="mb-8">
          <TagFilter tags={allTags} activeTag={activeTag} onTagChange={setActiveTag} />
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border hidden sm:block" />

          <div className="space-y-10">
            {filtered.map((exp, index) => {
              const e = exp[lang];
              return (
                <SectionWrapper key={exp.slug} delay={index * 0.05}>
                  <div id={exp.slug} className="relative sm:pl-12 scroll-mt-24">
                    {/* Timeline dot */}
                    <div className="absolute left-2.5 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-border bg-background hidden sm:block" />

                    <div className="rounded-xl border border-border bg-card/50 p-6 hover:border-foreground/20 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h2 className="text-lg font-semibold">{e.role}</h2>
                          <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                            <Building2 className="h-3.5 w-3.5" />
                            {e.company} · {e.location}
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground whitespace-nowrap shrink-0">
                          {e.period}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{e.summary}</p>

                      <ul className="space-y-2 mb-4">
                        {e.bullets.map((bullet, i) => (
                          <li key={i} className="text-sm text-muted-foreground/90 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-muted-foreground/40">
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                        {exp.tags.map((tag) => (
                          <Badge key={tag} variant="accent" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {e.techStack?.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs font-normal">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </SectionWrapper>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            {lang === "en" ? "No experiences found for this filter." : "未找到符合筛选条件的经历。"}
          </div>
        )}
      </div>
    </div>
  );
}
