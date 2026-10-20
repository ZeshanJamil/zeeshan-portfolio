"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectVideo } from "@/content/types";
import { ArrowUpRightIcon, PlayIcon } from "@/components/ui/icons";

/**
 * Click-to-play product video: shows a lightweight poster and only loads the video after the visitor asks for it.
 */
export function VideoPreview({ video, sourceUrl }: { video: ProjectVideo; sourceUrl?: string }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <figure>
      <div className="card relative aspect-video overflow-hidden rounded-[1.75rem] bg-black shadow-3">
        {playing && !failed ? (
          <video
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
            className="absolute inset-0 size-full object-contain"
          />
        ) : (
          <>
            <Image
              src={video.poster}
              alt=""
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
            {failed ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-white">
                <p className="text-lg">The video couldn&apos;t be loaded right now.</p>
                {sourceUrl ? (
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm underline underline-offset-4"
                  >
                    Watch it on {video.source}
                    <ArrowUpRightIcon size={14} />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group/play absolute inset-0 flex items-center justify-center"
                aria-label={`Play video: ${video.title}`}
              >
                <span className="bg-accent text-accent-contrast inline-flex size-20 items-center justify-center rounded-full shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover/play:scale-105">
                  <PlayIcon size={28} className="ml-1" />
                </span>
                <span className="absolute bottom-6 left-6 text-left text-white">
                  <span className="block font-mono text-[0.6875rem] tracking-[0.14em] uppercase opacity-80">Video</span>
                  <span className="mt-1 block text-lg">{video.title}</span>
                </span>
              </button>
            )}
          </>
        )}
      </div>
      <figcaption className="text-subtle mt-4 font-mono text-[0.6875rem] tracking-wide">
        {video.caption} Source: {video.source}. Loads from the product site only when played.
      </figcaption>
    </figure>
  );
}
