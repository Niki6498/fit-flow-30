import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BarChart3, HeartPulse, Target, Users, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/activity", label: "Aktivität", icon: BarChart3 },
  { to: "/health", label: "Gesundheit", icon: HeartPulse },
  { to: "/progress", label: "Fortschritt", icon: Target },
  { to: "/social", label: "Social", icon: Users },
] as const;

export function SideMenu() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Menü öffnen"
          className="glass fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-2xl text-foreground shadow-lg transition hover:scale-105"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 border-r-0 p-0">
        <div className="flex h-full flex-col bg-background/95 backdrop-blur-xl">
          <SheetHeader className="px-6 pb-4 pt-8">
            <SheetTitle className="gradient-text text-2xl font-bold">
              Pulse
            </SheetTitle>
          </SheetHeader>
          <nav className="flex-1 px-3 py-4">
            <ul className="space-y-1">
              {items.map((it) => {
                const active =
                  it.to === "/"
                    ? pathname === "/"
                    : pathname.startsWith(it.to);
                const Icon = it.icon;
                return (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                        active
                          ? "gradient-primary text-primary-foreground glow-primary"
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                          active
                            ? "bg-white/15"
                            : "bg-muted/40"
                        }`}
                      >
                        <Icon className="h-4.5 w-4.5" size={18} />
                      </div>
                      <span>{it.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
