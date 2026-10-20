import Image from "next/image";
import type { ProjectImage } from "@/content/types";

/**
 * Renders a single product image, optionally inside a minimal browser frame.
 */
function GalleryImage({ image }: { image: ProjectImage }) {
  const isPortrait = image.height > image.width;
  const img = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={isPortrait ? "(min-width: 1024px) 360px, 70vw" : "(min-width: 1280px) 760px, (min-width: 1024px) 60vw, 92vw"}
      className="h-auto w-full"
    />
  );

  if (image.frame === "browser") {
    return (
      <div className="overflow-hidden rounded-xl border border-line-strong bg-white shadow-[var(--shadow-3)]">
        <div className="flex items-center gap-1.5 border-b border-black/10 bg-neutral-100 px-3 py-2.5">
          <span className="size-2.5 rounded-full bg-neutral-300" />
          <span className="size-2.5 rounded-full bg-neutral-300" />
          <span className="size-2.5 rounded-full bg-neutral-300" />
        </div>
        {img}
      </div>
    );
  }

  return img;
}

/**
 * Captioned gallery of product imagery with clear source attribution.
 */
export function CaseGallery({ images }: { images: ProjectImage[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {images.map((image) => {
        const isPortrait = image.height > image.width;
        return (
          <figure
            key={image.src}
            data-reveal
            className={`card relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] ${
              isPortrait ? "lg:col-span-4" : "lg:col-span-8"
            } ${images.length === 1 ? "lg:col-span-12" : ""}`}
          >
            <div aria-hidden="true" className="hairline-grid absolute inset-0 opacity-60" />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 50% 0%, var(--glow), transparent 65%)" }}
            />
            <div className={`relative flex flex-1 items-center justify-center ${isPortrait ? "px-10 pt-10" : "p-6 sm:p-10"}`}>
              <div className={isPortrait ? "w-full max-w-[17rem]" : "w-full"}>
                <GalleryImage image={image} />
              </div>
            </div>
            <figcaption className="relative border-t border-line px-6 py-4 text-sm">
              <span className="text-ink">{image.caption}</span>{" "}
              <span className="text-subtle font-mono text-[0.6875rem]">Source: {image.source}</span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
