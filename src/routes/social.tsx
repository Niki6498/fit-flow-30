import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Rss, Trophy, UserPlus } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { CHALLENGES, FRIENDS } from "@/lib/fitness-data";

export const Route = createFileRoute("/social")({
  component: SocialPage,
});

function SocialPage() {
  return (
    <AppShell>
      <PageHeader
        title="Community"
        subtitle="Freunde & Challenges"
        right={
          <Link
            to="/feed"
            className="glass flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-semibold"
          >
            <Rss className="h-3.5 w-3.5" size={14} /> Feed
          </Link>
        }
      />

      {/* Challenges */}
      <div className="px-5">
        <h2 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <Trophy className="h-3.5 w-3.5" size={14} /> Aktive Challenges
        </h2>
        <div className="space-y-3">
          {CHALLENGES.map((c) => {
            const pct = Math.min(100, Math.round((c.progress / c.goal) * 100));
            return (
              <div key={c.id} className="glass rounded-2xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{c.title}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {c.participants} Teilnehmer
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary tabular-nums">
                    {c.progress}/{c.goal} {c.unit}
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary/10">
                  <div
                    className="h-full gradient-primary transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Friends */}
      <div className="mt-5 px-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
            Freunde
          </h2>
          <button className="glass flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[11px] font-semibold">
            <UserPlus className="h-3 w-3" size={12} /> Hinzufügen
          </button>
        </div>
        <div className="mt-3 space-y-2.5">
          {FRIENDS.map((f) => (
            <div key={f.id} className="glass flex items-center gap-3 rounded-2xl p-3.5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">
                {f.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{f.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  Online · trainiert regelmäßig
                </p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                <Flame className="h-3 w-3" size={12} /> {f.streak}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
