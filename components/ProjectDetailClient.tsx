"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp, ExternalLink, Play } from "lucide-react";
import type { ProjectItem } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/SectionWrapper";

function ProjectVideo({ video, lang }: { video: string; lang: "en" | "zh" }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <SectionWrapper delay={0.08}>
      <div className="mb-10">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <Play className="h-3.5 w-3.5" />
          <span>{lang === "en" ? "Demo Video" : "演示视频"}</span>
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>
        {expanded && (
          <div className="mt-4 rounded-xl overflow-hidden border border-border bg-muted/30">
            <video
              src={video}
              controls
              playsInline
              preload="metadata"
              className="w-full max-h-[420px] object-contain bg-black/5 dark:bg-white/5"
            />
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

export default function ProjectDetailClient({ project }: { project: ProjectItem }) {
  const { lang } = useI18n();
  const p = project[lang];

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {lang === "en" ? "Back to Projects" : "返回项目列表"}
        </Link>

        <SectionWrapper>
          <div className="mb-10">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="accent" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {p.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {p.summary}
            </p>

            {project.links && project.links.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {project.links.map((link) => (
                  <Button key={link.label} variant="outline" size="sm" asChild>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5" />
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </SectionWrapper>

        {project.video && <ProjectVideo video={project.video} lang={lang} />}

        <div className="space-y-10">
          <SectionWrapper delay={0.1}>
            <div>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="h-6 w-1 bg-red-500 rounded-full" />
                {lang === "en" ? "Problem" : "问题"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{p.problem}</p>
            </div>
          </SectionWrapper>

          <SectionWrapper delay={0.15}>
            <div>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="h-6 w-1 bg-blue-500 rounded-full" />
                {lang === "en" ? "Action" : "行动"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{p.action}</p>
            </div>
          </SectionWrapper>

          <SectionWrapper delay={0.2}>
            <div>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="h-6 w-1 bg-green-500 rounded-full" />
                {lang === "en" ? "Result" : "结果"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{p.result}</p>
            </div>
          </SectionWrapper>

          <SectionWrapper delay={0.25}>
            <div>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="h-6 w-1 bg-purple-500 rounded-full" />
                {lang === "en" ? "Learnings" : "收获"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{p.learnings}</p>
            </div>
          </SectionWrapper>

          <SectionWrapper delay={0.3}>
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {lang === "en" ? "Tech Stack" : "技术栈"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {p.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
}
