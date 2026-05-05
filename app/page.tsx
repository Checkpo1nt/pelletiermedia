import { BuildSystemsGrid } from "@/components/BuildSystemsGrid";
import { CommitActivity } from "@/components/CommitActivity";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { OpenClawDiagram } from "@/components/OpenClawDiagram";
import { ProblemCards } from "@/components/ProblemCards";
import { ProcessTimeline } from "@/components/ProcessTimeline";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProblemCards />
      <BuildSystemsGrid />
      <OpenClawDiagram />
      <CommitActivity />
      <ProcessTimeline />
      <CTASection />
    </main>
  );
}
