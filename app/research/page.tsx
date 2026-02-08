"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, FileText } from "lucide-react";
import { getContent } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/SectionWrapper";

export default function ResearchPage() {
  const { lang } = useI18n();
  const content = getContent();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionWrapper>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {lang === "en" ? "Research & Publications" : "研究与论文"}
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
            {lang === "en"
              ? "Academic papers and research contributions."
              : "学术论文与研究贡献。"}
          </p>
        </SectionWrapper>

        <div className="space-y-4">
          {content.publications.map((pub, index) => {
            const p = pub[lang];
            const isExpanded = expanded === pub.slug;
            return (
              <SectionWrapper key={pub.slug} delay={index * 0.05}>
                <div className="rounded-xl border border-border bg-card/50 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-2">
                        <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <h2 className="font-semibold">{p.title}</h2>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {p.venue} · {p.date}
                      </p>
                      <p className="text-sm text-muted-foreground/70 mt-1">{p.authors}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {p.link && (
                        <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                          <a href={p.link} target="_blank" rel="noopener noreferrer" aria-label="Open paper">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => setExpanded(isExpanded ? null : pub.slug)}
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <h3 className="text-sm font-medium mb-2">
                        {lang === "en" ? "Abstract" : "摘要"}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.abstract}</p>
                    </div>
                  )}
                </div>
              </SectionWrapper>
            );
          })}
        </div>

        {content.publications.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            {lang === "en" ? "Publications coming soon." : "论文即将发布。"}
          </div>
        )}
      </div>
    </div>
  );
}
