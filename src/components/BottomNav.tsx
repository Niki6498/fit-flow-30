import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BarChart3, HeartPulse, Sparkles, Target, Users } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/activity", label: "Aktivität", icon: BarChart3 },
  { to: "/health", label: "Gesundheit", icon: HeartPulse },
  { to: "/recovery", label: "Recovery", icon: Sparkles },
  { to: "/progress", label: "Fortschritt", icon: Target },
  { to: "/social", label: "Social", icon: Users },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-4 pb-4">
      <div className="glass flex items-center justify-between rounded-3xl px-2 py-2">
        {items.map((it) => {
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
        })}
      </div>
    </nav>
  );
}
