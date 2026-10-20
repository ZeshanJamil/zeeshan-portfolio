import { ProcessStepper } from "@/components/process/process-stepper";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/content/capabilities";

/**
 * "How I build products" section with the interactive process sequence.
 */
export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="scroll-mt-20 border-t border-line bg-bg-elevated py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="process-title"
          eyebrow="How I build"
          align="split"
          title={
            <>
              From requirements to <em className="text-accent-text">shipped</em> and supported.
            </>
          }
          lead="The same loop I follow on product teams: understand the workflow, shape a maintainable solution, build it with review, and keep delivery visible."
        />
        <div className="mt-16" data-reveal>
          <ProcessStepper steps={processSteps} />
        </div>
      </div>
    </section>
  );
}
