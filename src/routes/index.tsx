import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Play, Sparkles, ArrowRight, Leaf } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import {
  ACTIVITY_META,
  ACTIVITY_ORDER,
  PAST_ACTIVITIES,
  READINESS,
  SUGGESTED,
  formatDate,
  formatDuration,
  type ActivityType,
} from "@/lib/fitness-data";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [type, setType] = useState<ActivityType>("running");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const Meta = ACTIVITY_META[type];
  const Icon = Meta.icon;

  const start = () => {
    navigate({ to: "/session/$type", params: { type } });
  };

  return (
    <AppShell>
      <PageHeader
        title="Hey, Alex"
        subtitle="Bereit für deine nächste Session?"
        right={
          <div className="glass grid h-11 w-11 place-items-center rounded-2xl text-sm font-bold">
            AL
          </div>
        }
      />

      {/* Start card */}
      <div className="px-5">
        <div className="glass relative overflow-hidden rounded-3xl p-5">
          <div
            className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full opacity-70 blur-3xl"
            style={{ background: "var(--gradient-primary)" }}
          />
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Aktivität starten
          </p>

          <div className="relative mt-3">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-2xl bg-white/70 px-4 py-3 text-left backdrop-blur transition hover:bg-white"
            >
              <span className="flex items-center gap-3">
                <span
                  className="grid h-9 w-9 place-items-center rounded-xl"
                  style={{ background: `${Meta.color}22`, color: Meta.color }}
                >
                  <Icon className="h-4.5 w-4.5" size={18} />
                </span>
                <span className="font-semibold">{Meta.label}</span>
              </span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open ? (
              <div className="glass absolute z-20 mt-2 w-full overflow-hidden rounded-2xl p-1.5 shadow-lg animate-in fade-in-0 zoom-in-95">
                {ACTIVITY_ORDER.map((t) => {
                  const M = ACTIVITY_META[t];
                  const I = M.icon;
                  return (
                    <button
                      key={t}
                      onClick={() => {
                        setType(t);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-primary/10 ${
                        t === type ? "bg-primary/10" : ""
                      }`}
                    >
                      <span
                        className="grid h-8 w-8 place-items-center rounded-lg"
                        style={{ background: `${M.color}22`, color: M.color }}
                      >
                        <I className="h-4 w-4" size={16} />
                      </span>
                      <span className="font-medium">{M.label}</span>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <button
            onClick={start}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl gradient-primary py-4 font-semibold text-primary-foreground glow-primary transition hover:brightness-110 active:scale-[0.98]"
          >
            <Play className="h-5 w-5 fill-current" />
            Los geht's
          </button>
        </div>
      </div>

      {/* Readiness */}
      <div className="mt-6 px-5">
        <div className="glass flex items-center gap-4 rounded-3xl p-5">
          <ReadinessRing value={READINESS.score} />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Trainingsbereitschaft
            </p>
            <p className="mt-0.5 text-lg font-bold">{READINESS.label}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {READINESS.factors.map((f) => (
                <span
                  key={f.name}
                  className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary"
                >
                  {f.name} {f.value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recovery card */}
      <div className="mt-3 px-5">
        <Link
          to="/recovery"
          className="glass relative flex items-center gap-4 overflow-hidden rounded-3xl p-4 transition hover:glow-primary"
        >
          <div
            className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full opacity-60 blur-2xl"
            style={{ background: "var(--gradient-primary)" }}
          />
          <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Leaf className="h-5.5 w-5.5" size={22} />
          </span>
          <div className="relative min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Recovery
            </p>
            <p className="font-semibold">Score, Schlaf & Stress</p>
          </div>
          <ArrowRight className="relative h-4 w-4 text-muted-foreground" size={16} />
        </Link>
      </div>

      {/* Suggested */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" size={14} />
            Für dich empfohlen
          </h2>
        </div>
        <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
          {SUGGESTED.map((s) => {
            const M = ACTIVITY_META[s.type];
            const I = M.icon;
            return (
              <Link
                key={s.id}
                to="/session/$type"
                params={{ type: s.type }}
                className="glass group relative min-w-[180px] snap-start overflow-hidden rounded-2xl p-4"
              >
                <div
                  className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-60 blur-2xl"
                  style={{ background: M.color }}
                />
                <span
                  className="relative grid h-10 w-10 place-items-center rounded-xl"
                  style={{ background: `${M.color}22`, color: M.color }}
                >
                  <I className="h-5 w-5" size={20} />
                </span>
                <p className="relative mt-3 font-semibold">{s.title}</p>
                <p className="relative text-xs text-muted-foreground">{s.subtitle}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent */}
      <div className="mt-4 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground">Zuletzt absolviert</h2>
          <Link to="/activity" className="flex items-center gap-1 text-xs font-medium text-primary">
            Alle <ArrowRight className="h-3 w-3" size={12} />
          </Link>
        </div>
        <div className="mt-3 space-y-2.5">
          {PAST_ACTIVITIES.slice(0, 3).map((a) => {
            const M = ACTIVITY_META[a.type];
            const I = M.icon;
            return (
              <Link
                key={a.id}
                to="/activity/$id"
                params={{ id: a.id }}
                className="glass flex items-center gap-3 rounded-2xl p-3.5 transition hover:glow-primary"
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                  style={{ background: `${M.color}22`, color: M.color }}
                >
                  <I className="h-5 w-5" size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{M.label}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(a.date)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{formatDuration(a.durationSec)}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {a.distanceKm > 0 ? `${a.distanceKm} km` : `${a.calories} kcal`}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

function ReadinessRing({ value }: { value: number }) {
  const r = 32;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative h-20 w-20 shrink-0">
      <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
        <circle cx="40" cy="40" r={r} strokeWidth="7" className="fill-none stroke-primary/15" />
        <circle
          cx="40"
          cy="40"
          r={r}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
          className="fill-none stroke-[url(#gradR)] transition-all duration-700"
        />
        <defs>
          <linearGradient id="gradR" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.68 0.19 245)" />
            <stop offset="100%" stopColor="oklch(0.78 0.17 220)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-xl font-bold gradient-text">{value}</span>
      </div>
    </div>
  );
}
