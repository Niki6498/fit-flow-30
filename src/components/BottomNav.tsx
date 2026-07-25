import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Home, BarChart3, HeartPulse, Target, Users, Play } from "lucide-react";

const leftItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/activity", label: "Aktivität", icon: BarChart3 },
] as const;

const rightItems = [
  { to: "/progress", label: "Fortschritt", icon: Target },
  { to: "/social", label: "Social", icon: Users },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const renderItem = (it: { to: string; label: string; icon: typeof Home }) => {
    const active =
      it.to === "/" ? pathname === "/" : pathname.startsWith(it.to);
    const Icon = it.icon;
    return (
      <Link
        key={it.to}
        to={it.to}
        className="group relative flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-2 py-2 transition"
      >
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
            active
              ? "gradient-primary text-primary-foreground glow-primary"
              : "text-muted-foreground group-hover:text-foreground"
          }`}
        >
          <Icon className="h-4.5 w-4.5" size={18} />
        </div>
        <span
          className={`text-[10px] font-medium transition ${
            active ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {it.label}
        </span>
      </Link>
    );
  };

  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-4 pb-4">
      <div className="glass relative flex items-center justify-between rounded-3xl px-2 py-2">
        {leftItems.map(renderItem)}

        {/* Central Run button */}
        <div className="relative flex flex-1 flex-col items-center">
          <button
            onClick={() =>
              navigate({ to: "/session/$type", params: { type: "running" } })
            }
            className="group -mt-8 flex h-16 w-16 flex-col items-center justify-center rounded-full gradient-primary text-primary-foreground glow-primary shadow-lg ring-4 ring-background transition active:scale-95 hover:brightness-110"
            aria-label="Run starten"
          >
            <Play className="h-6 w-6 fill-current" />
          </button>
          <span className="mt-0.5 text-[10px] font-semibold text-foreground">
            Run
          </span>
        </div>

        {rightItems.map(renderItem)}
      </div>
    </nav>
  );
}
