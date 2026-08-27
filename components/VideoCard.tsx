"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  getActiveUnmutedId,
  setActiveUnmutedId,
  subscribeUnmuted,
} from "@/lib/video-audio";
import type { PortfolioItem } from "@/lib/types";

function canHover(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

export function VideoCard({ item }: { item: PortfolioItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [unmuted, setUnmuted] = useState(false);

  useEffect(() => {
    return subscribeUnmuted((activeId) => {
      if (activeId === item.id) return;
      const video = videoRef.current;
      if (!video) return;
      video.muted = true;
      setUnmuted(false);
    });
  }, [item.id]);

  function playWhenReady(video: HTMLVideoElement) {
    const attempt = () => {
      void video.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    };
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      attempt();
      return;
    }
    video.addEventListener("canplay", attempt, { once: true });
    video.addEventListener("error", () => setPlaying(false), { once: true });
  }

  function playMuted() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !unmuted;
    playWhenReady(video);
  }

  function pausePreview() {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
    if (!video.muted) {
      video.muted = true;
      setUnmuted(false);
      if (getActiveUnmutedId() === item.id) setActiveUnmutedId(null);
    }
  }

  function onMouseEnter() {
    if (canHover()) playMuted();
  }

  function onMouseLeave() {
    if (canHover()) pausePreview();
  }

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) playMuted();
    else {
      video.pause();
      setPlaying(false);
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      setActiveUnmutedId(item.id);
      video.muted = false;
      setUnmuted(true);
      if (video.paused) {
        playWhenReady(video);
      }
      return;
    }
    video.muted = true;
    setUnmuted(false);
    if (getActiveUnmutedId() === item.id) setActiveUnmutedId(null);
  }

  function onSurfaceClick(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button")) return;
    if (canHover()) return;
    togglePlay();
  }

  return (
    <article
      className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-cream ring-1 ring-champagne/40 transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(26,26,26,0.12)]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-0" onClick={onSurfaceClick}>
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          playsInline
          muted
          loop
          preload="metadata"
          className="h-full w-full object-cover"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-onyx/70 via-transparent to-onyx/10" />
      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
        {item.badges.map((badge) => (
          <span
            key={badge}
            className="bg-porcelain/90 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-onyx"
          >
            {badge}
          </span>
        ))}
      </div>
      <div className="absolute right-3 top-3 flex gap-2">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-porcelain/90 text-onyx transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
        >
          {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={unmuted ? "Mute video" : "Unmute video"}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-porcelain/90 text-onyx transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
        >
          {unmuted ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 text-porcelain">
        <p className="text-[11px] uppercase tracking-[0.18em] text-champagne">
          {item.brand}
        </p>
        <p className="mt-1 font-display text-lg leading-tight">{item.product}</p>
        <p className="mt-1 text-xs text-porcelain/75">{item.title}</p>
      </div>
    </article>
  );
}
