"use client"

import { useState } from "react"

// Lite YouTube embed: shows the thumbnail and only loads the player after a click.
export default function YouTubeEmbed({ id, title, poster }: { id: string; title: string; poster: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          <img
            src={poster}
            alt=""
            className="h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
          />
          <span className="absolute inset-0 flex items-end justify-end p-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-transform duration-300 group-hover:scale-110">
              <svg className="ml-1 h-6 w-6 text-foreground" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
          <span className="absolute bottom-3 left-3 rounded bg-background/80 px-2 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
            Walkthrough · demo data
          </span>
        </button>
      )}
    </div>
  )
}
