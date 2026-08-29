import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Subtitles,
  Gauge,
  Maximize,
  Minimize,
} from "lucide-react";
import type { Movie } from "@/data/movies";

const SPEEDS = [0.5, 1, 1.25, 1.5, 2];

function fmt(t: number) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VideoPlayer({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [menu, setMenu] = useState<"none" | "tracks" | "speed">("none");
  const [audioTrack, setAudioTrack] = useState(movie.audio[0]);
  const [subTrack, setSubTrack] = useState("Off");
  const [fullscreen, setFullscreen] = useState(false);
  const [hover, setHover] = useState<{ x: number; t: number } | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = volume;
    v.muted = muted;
    v.playbackRate = speed;
  }, [volume, muted, speed]);

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("fullscreenchange", onFs);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const skip = (d: number) => {
    const v = videoRef.current;
    if (v) v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + d));
  };

  const seekFromEvent = (e: React.MouseEvent<HTMLDivElement>, commit: boolean) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const t = ratio * (duration || 0);
    setHover({ x: ratio * rect.width, t });
    if (commit && videoRef.current) videoRef.current.currentTime = t;
  };

  const progress = duration ? (time / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-slate-950/90 p-0 backdrop-blur-sm sm:p-6">
      <div
        ref={shellRef}
        className="group/player relative aspect-video w-full max-w-6xl animate-scale-in overflow-hidden rounded-none bg-black shadow-elevated sm:rounded-2xl"
      >
        <video
          ref={videoRef}
          src={movie.src}
          poster={movie.poster}
          className="size-full object-contain"
          onClick={toggle}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        />

        {/* Top overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start gap-3 bg-gradient-to-b from-slate-950/80 to-transparent p-4 opacity-100 transition-opacity">
          <button
            onClick={onClose}
            className="pointer-events-auto grid size-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Back to library"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div className="pt-0.5">
            <p className="text-sm font-semibold text-white">{movie.title}</p>
            <p className="text-xs text-white/70">{movie.quality} • Direct Play</p>
          </div>
        </div>

        {/* Center play */}
        {!playing && (
          <button
            onClick={toggle}
            className="absolute inset-0 grid place-items-center"
            aria-label="Play"
          >
            <span className="grid size-20 place-items-center rounded-full bg-accent/90 shadow-glow transition-transform hover:scale-105">
              <Play className="size-8 fill-white text-white" />
            </span>
          </button>
        )}

        {/* Control bar */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent px-4 pb-3 pt-10">
          {/* Timeline */}
          <div
            className="relative mb-3 cursor-pointer py-2"
            onMouseMove={(e) => seekFromEvent(e, false)}
            onMouseLeave={() => setHover(null)}
            onClick={(e) => seekFromEvent(e, true)}
          >
            <div className="h-1.5 w-full rounded-full bg-white/25">
              <div
                className="h-1.5 rounded-full bg-accent transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span
              className="pointer-events-none absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow"
              style={{ left: `${progress}%` }}
            />
            {hover && (
              <span
                className="pointer-events-none absolute -top-6 -translate-x-1/2 rounded bg-slate-900 px-1.5 py-0.5 text-[11px] font-medium text-white"
                style={{ left: hover.x }}
              >
                {fmt(hover.t)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-white">
            <button onClick={toggle} className="player-btn" aria-label="Play/Pause">
              {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
            </button>
            <button onClick={() => skip(-10)} className="player-btn" aria-label="Back 10s">
              <RotateCcw className="size-4" />
            </button>
            <button onClick={() => skip(10)} className="player-btn" aria-label="Forward 10s">
              <RotateCw className="size-4" />
            </button>

            <div className="group/vol flex items-center gap-2">
              <button
                onClick={() => setMuted((m) => !m)}
                className="player-btn"
                aria-label="Mute"
              >
                {muted || volume === 0 ? (
                  <VolumeX className="size-4" />
                ) : (
                  <Volume2 className="size-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setMuted(false);
                }}
                className="w-0 accent-teal-500 opacity-0 transition-all duration-300 group-hover/vol:w-20 group-hover/vol:opacity-100"
                aria-label="Volume"
              />
            </div>

            <span className="ml-1 text-xs font-medium tabular-nums text-white/80">
              {fmt(time)} / {fmt(duration)}
            </span>

            <div className="ml-auto flex items-center gap-2">
              {/* Tracks */}
              <div className="relative">
                <button
                  onClick={() => setMenu((m) => (m === "tracks" ? "none" : "tracks"))}
                  className="player-btn"
                  aria-label="Audio and subtitles"
                >
                  <Subtitles className="size-4" />
                </button>
                {menu === "tracks" && (
                  <div className="absolute bottom-11 right-0 w-52 animate-scale-in rounded-xl border border-white/10 bg-slate-900/95 p-2 text-xs text-white shadow-elevated backdrop-blur">
                    <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                      Audio
                    </p>
                    {movie.audio.map((a) => (
                      <button
                        key={a}
                        onClick={() => setAudioTrack(a)}
                        className={`block w-full rounded-lg px-2 py-1.5 text-left hover:bg-white/10 ${audioTrack === a ? "text-accent" : ""}`}
                      >
                        {a}
                      </button>
                    ))}
                    <p className="mt-1 border-t border-white/10 px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                      Subtitles
                    </p>
                    {["Off", ...movie.subs.map((s) => `${s} (.srt)`), "EN (.vtt) external"].map(
                      (s) => (
                        <button
                          key={s}
                          onClick={() => setSubTrack(s)}
                          className={`block w-full rounded-lg px-2 py-1.5 text-left hover:bg-white/10 ${subTrack === s ? "text-accent" : ""}`}
                        >
                          {s}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>

              {/* Speed */}
              <div className="relative">
                <button
                  onClick={() => setMenu((m) => (m === "speed" ? "none" : "speed"))}
                  className="player-btn"
                  aria-label="Playback speed"
                >
                  <Gauge className="size-4" />
                </button>
                {menu === "speed" && (
                  <div className="absolute bottom-11 right-0 w-28 animate-scale-in rounded-xl border border-white/10 bg-slate-900/95 p-2 text-xs text-white shadow-elevated backdrop-blur">
                    {SPEEDS.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSpeed(s);
                          setMenu("none");
                        }}
                        className={`block w-full rounded-lg px-2 py-1.5 text-left hover:bg-white/10 ${speed === s ? "text-accent" : ""}`}
                      >
                        {s.toFixed(2).replace(/0$/, "")}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  if (document.fullscreenElement) void document.exitFullscreen();
                  else void shellRef.current?.requestFullscreen();
                }}
                className="player-btn"
                aria-label="Fullscreen"
              >
                {fullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
