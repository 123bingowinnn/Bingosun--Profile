"use client";

import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { About } from "@/components/sections/About";
import { ExperiencePreview } from "@/components/sections/ExperiencePreview";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ResearchSection } from "@/components/sections/ResearchSection";
import { Education } from "@/components/sections/Education";
import { Leadership } from "@/components/sections/Leadership";
import { Interests } from "@/components/sections/Interests";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <About />
      <ExperiencePreview />
      <FeaturedProjects />
      <ResearchSection />
      <Education />
      <Leadership />
      <Interests />
      <ContactCTA />
    </>
  );
}
