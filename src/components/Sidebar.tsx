import {
  Flame,
  TrendingUp,
  Film,
  Puzzle,
  FolderOpen,
  Settings,
  Server,
  CircleCheck,
} from "lucide-react";
import logo from "@/assets/streamassist-logo.png.asset.json";

export type ViewId =
  | "trending"
  | "popular"
  | "library"
  | "addons"
  | "local-files"
  | "settings";

type Item = { id: ViewId; label: string; icon: React.ElementType };

const sections: { title: string; items: Item[] }[] = [
  {
    title: "Discover",
    items: [
      { id: "trending", label: "Trending", icon: TrendingUp },
      { id: "popular", label: "Popular", icon: Flame },
    ],
  },
  {
    title: "My Library",
    items: [{ id: "library", label: "Filmes Locais", icon: Film }],
  },
  {
    title: "Tools",
    items: [
      { id: "addons", label: "Add-ons", icon: Puzzle },
      { id: "local-files", label: "Local Files", icon: FolderOpen },
    ],
  },
  {
    title: "Sistema",
    items: [{ id: "settings", label: "Settings", icon: Settings }],
  },
];

export function Sidebar({
  view,
  onNavigate,
  serverOnline,
  addonsConnected,
}: {
  view: ViewId;
  onNavigate: (id: ViewId) => void;
  serverOnline: boolean;
  addonsConnected: number;
}) {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center gap-3 px-6 py-6">
        <img
          src={logo.url}
          alt="StreamAssist logo"
          width={40}
          height={40}
          className="size-10 shrink-0 object-contain drop-shadow-sm"
        />
        <span className="text-lg font-semibold tracking-tight text-foreground">
          StreamAssist
        </span>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-2">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {section.title}
            </p>
            <ul className="space-y-1">
              {section.items.map(({ id, label, icon: Icon }) => {
                const active = view === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => onNavigate(id)}
                      aria-current={active ? "page" : undefined}
                      className={
                        active
                          ? "flex w-full items-center gap-3 rounded-lg bg-accent/12 px-3 py-2 text-sm font-medium text-accent transition-colors"
                          : "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground active:scale-[0.98]"
                      }
                    >
                      <Icon className="size-4" />
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="m-3 rounded-xl border border-border bg-card p-3 shadow-soft">
        <div className="flex items-center justify-between py-1">
          <span className="flex items-center gap-2 text-xs font-medium text-foreground">
            <Server className="size-3.5 text-muted-foreground" />
            Python {serverOnline ? "Online" : "Offline"}
          </span>
          <span
            className={
              serverOnline
                ? "flex items-center gap-1.5 text-[11px] font-medium text-success"
                : "flex items-center gap-1.5 text-[11px] font-medium text-destructive"
            }
          >
            <span
              className={
                serverOnline
                  ? "size-2 animate-pulse rounded-full bg-success"
                  : "size-2 rounded-full bg-destructive"
              }
            />
            {serverOnline ? "Live" : "Down"}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between py-1">
          <span className="flex items-center gap-2 text-xs font-medium text-foreground">
            <Puzzle className="size-3.5 text-muted-foreground" />
            Add-ons
          </span>
          <span
            className={
              addonsConnected > 0
                ? "flex items-center gap-1 rounded-full bg-success/12 px-2 py-0.5 text-[11px] font-semibold text-success"
                : "flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-muted-foreground"
            }
          >
            <CircleCheck className="size-3" />
            {addonsConnected > 0 ? `${addonsConnected} Connected` : "None"}
          </span>
        </div>
      </div>
    </aside>
  );
}
