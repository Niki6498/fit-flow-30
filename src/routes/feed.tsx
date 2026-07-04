import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, MessageCircle, Share2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ACTIVITY_META, FEED, formatDuration } from "@/lib/fitness-data";

export const Route = createFileRoute("/feed")({
  component: FeedPage,
});

function FeedPage() {
  return (
    <AppShell>
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <Link to="/social" className="glass grid h-10 w-10 place-items-center rounded-2xl">
          <ArrowLeft className="h-4 w-4" size={16} />
        </Link>
        <div>
          <h1 className="text-xl font-bold">Activity Feed</h1>
          <p className="text-xs text-muted-foreground">Was deine Freunde tracken</p>
        </div>
      </div>

      <div className="space-y-3 px-5 pb-4">
        {FEED.map((p) => {
          const M = ACTIVITY_META[p.activity];
          const Icon = M.icon;
          return (
            <article key={p.id} className="glass overflow-hidden rounded-3xl">
              <div className="flex items-center gap-3 p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">
                  {p.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{p.user}</p>
                  <p className="text-[11px] text-muted-foreground">{p.time}</p>
                </div>
                <span
                  className="grid h-8 w-8 place-items-center rounded-xl"
                  style={{ background: `${M.color}22`, color: M.color }}
                >
                  <Icon className="h-4 w-4" size={16} />
                </span>
              </div>
              <div
                className="relative h-32"
                style={{
                  background: `linear-gradient(135deg, ${M.color}33, oklch(0.78 0.17 235 / 0.2))`,
                }}
              >
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <p className="text-lg font-bold">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{M.label}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 px-4 py-3 text-center text-xs">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Distanz
                  </p>
                  <p className="font-bold tabular-nums">
                    {p.distanceKm > 0 ? `${p.distanceKm} km` : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Dauer
                  </p>
                  <p className="font-bold tabular-nums">{formatDuration(p.durationSec)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Kudos
                  </p>
                  <p className="font-bold tabular-nums">{p.kudos}</p>
                </div>
              </div>
              <div className="flex items-center border-t border-border/60 text-sm">
                <button className="flex flex-1 items-center justify-center gap-1.5 py-3 font-medium text-muted-foreground hover:text-primary">
                  <Heart className="h-4 w-4" size={16} /> Kudos
                </button>
                <button className="flex flex-1 items-center justify-center gap-1.5 py-3 font-medium text-muted-foreground hover:text-primary">
                  <MessageCircle className="h-4 w-4" size={16} /> Kommentar
                </button>
                <button className="flex flex-1 items-center justify-center gap-1.5 py-3 font-medium text-muted-foreground hover:text-primary">
                  <Share2 className="h-4 w-4" size={16} /> Teilen
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </AppShell>
  );
}
