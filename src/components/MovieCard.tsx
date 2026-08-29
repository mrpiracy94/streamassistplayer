import { Play, Star } from "lucide-react";
import type { Movie } from "@/data/movies";

export function MovieCard({ movie, onPlay }: { movie: Movie; onPlay: () => void }) {
  return (
    <button
      onClick={onPlay}
      className="group text-left focus:outline-none"
      aria-label={`Play ${movie.title}`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-secondary shadow-soft transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-elevated">
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          loading="lazy"
          width={512}
          height={768}
          className="aspect-[2/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-md bg-foreground/75 px-2 py-0.5 text-[11px] font-bold text-background backdrop-blur">
          {movie.quality}
        </span>
        <span className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-imdb px-1.5 py-0.5 text-[11px] font-bold text-imdb-foreground">
          <Star className="size-3 fill-current" />
          {movie.rating.toFixed(1)}
        </span>
        <div className="absolute inset-0 grid place-items-center bg-foreground/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="grid size-14 scale-90 place-items-center rounded-full bg-accent shadow-glow transition-transform duration-300 group-hover:scale-100">
            <Play className="size-6 fill-accent-foreground text-accent-foreground" />
          </span>
        </div>
      </div>

      <div className="px-1 pt-3">
        <h3 className="truncate text-sm font-semibold text-foreground">{movie.title}</h3>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {movie.year} · {movie.genres.join(", ")}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {movie.audio.map((a) => (
            <span
              key={a}
              className="rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {a}
            </span>
          ))}
          {movie.subs.map((s) => (
            <span
              key={s}
              className="rounded border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[10px] font-medium text-accent"
            >
              CC {s}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
