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


type Item = { label: string; icon: React.ElementType; active?: boolean };

const sections: { title: string; items: Item[] }[] = [
  {
    title: "Discover",
    items: [
      { label: "Trending", icon: TrendingUp },
      { label: "Popular", icon: Flame },
    ],
  },
  {
    title: "My Library",
    items: [{ label: "Filmes Locais", icon: Film, active: true }],
  },
  {
    title: "Tools",
    items: [
      { label: "Add-ons", icon: Puzzle },
      { label: "Local Files", icon: FolderOpen },
    ],
  },
  {
    title: "Sistema",
    items: [{ label: "Settings", icon: Settings }],
  },
];

export function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="grid size-9 place-items-center rounded-xl bg-accent shadow-glow">
          <Play className="size-4 fill-accent-foreground text-accent-foreground" />
        </div>
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
              {section.items.map(({ label, icon: Icon, active }) => (
                <li key={label}>
                  <button
                    className={
                      active
                        ? "flex w-full items-center gap-3 rounded-lg bg-accent/12 px-3 py-2 text-sm font-medium text-accent transition-colors"
                        : "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    }
                  >
                    <Icon className="size-4" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="m-3 rounded-xl border border-border bg-card p-3 shadow-soft">
        <div className="flex items-center justify-between py-1">
          <span className="flex items-center gap-2 text-xs font-medium text-foreground">
            <Server className="size-3.5 text-muted-foreground" />
            Python Online
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-success">
            <span className="size-2 animate-pulse rounded-full bg-success" />
            Live
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between py-1">
          <span className="flex items-center gap-2 text-xs font-medium text-foreground">
            <Puzzle className="size-3.5 text-muted-foreground" />
            Add-ons
          </span>
          <span className="flex items-center gap-1 rounded-full bg-success/12 px-2 py-0.5 text-[11px] font-semibold text-success">
            <CircleCheck className="size-3" />
            Connected
          </span>
        </div>
      </div>
    </aside>
  );
}
