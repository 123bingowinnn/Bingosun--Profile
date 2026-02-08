"use client";

import { useState } from "react";
import { getContent, getAllTags } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { ProjectCard } from "@/components/ProjectCard";
import { TagFilter } from "@/components/TagFilter";
import { SectionWrapper } from "@/components/SectionWrapper";

export default function ProjectsPage() {
  const { lang } = useI18n();
  const content = getContent();
  const allTags = getAllTags(content.projects);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? content.projects.filter((p) => p.tags.includes(activeTag))
    : content.projects;

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionWrapper>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {lang === "en" ? "Projects" : "项目"}
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
            {lang === "en"
              ? "A collection of my work spanning AI, computer vision, full-stack development, and product design."
              : "涵盖 AI、计算机视觉、全栈开发和产品设计的项目集合。"}
          </p>
        </SectionWrapper>

        <div className="mb-8">
          <TagFilter tags={allTags} activeTag={activeTag} onTagChange={setActiveTag} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <SectionWrapper key={project.slug} delay={0.05}>
              <ProjectCard project={project} />
            </SectionWrapper>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            {lang === "en" ? "No projects found for this filter." : "未找到符合筛选条件的项目。"}
          </div>
        )}
      </div>
    </div>
  );
}
