import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, SlidersHorizontal, LayoutGrid } from "lucide-react";
import { Sidebar, type ViewId } from "@/components/Sidebar";
import { MovieCard } from "@/components/MovieCard";
import { VideoPlayer } from "@/components/VideoPlayer";
import { movies, type Movie } from "@/data/movies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StreamAssist — Local Media Manager & Player" },
      {
        name: "description",
        content:
          "StreamAssist organizes your local movie library and plays it instantly with an embedded player, subtitle and audio track selection, and playback speed control.",
      },
      { property: "og:title", content: "StreamAssist — Local Media Manager & Player" },
      {
        property: "og:description",
        content:
          "Browse your local movie library and stream it in-app with a sleek custom player.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [active, setActive] = useState<Movie | null>(null);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<ViewId>("library");

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        view={view}
        onNavigate={setView}
        serverOnline={true}
        addonsConnected={2}
      />

      <main className="flex-1 overflow-x-hidden">
        <header className="sticky top-0 z-10 flex flex-wrap items-center gap-3 border-b border-border bg-background/85 px-8 py-4 backdrop-blur">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Filmes Locais
            </h1>
            <p className="text-xs text-muted-foreground">
              {movies.length} titles indexed from your local server
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search library…"
                className="h-9 w-56 rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
              />
            </div>
            <button className="grid size-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground">
              <SlidersHorizontal className="size-4" />
            </button>
            <button className="grid size-9 place-items-center rounded-lg border border-border bg-card text-accent">
              <LayoutGrid className="size-4" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-6 px-8 py-8 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {filtered.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onPlay={() => setActive(movie)} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="px-8 pb-12 text-sm text-muted-foreground">No titles match “{query}”.</p>
        )}
      </main>

      {active && <VideoPlayer movie={active} onClose={() => setActive(null)} />}
    </div>
  );
}
