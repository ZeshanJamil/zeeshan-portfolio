import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { QuickFacts } from "@/components/sections/quick-facts";
import { SelectedWork } from "@/components/sections/selected-work";
import { Services } from "@/components/sections/services";
import { Toolkit } from "@/components/sections/toolkit";

/**
 * Home page composed of the portfolio sections in reading order.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickFacts />
      <SelectedWork />
      <Process />
      <Services />
      <Toolkit />
      <About />
      <ExperienceTimeline />
      <Contact />
    </>
  );
}
