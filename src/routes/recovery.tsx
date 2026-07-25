import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Moon,
  Brain,
  Activity,
  Wind,
  Sparkles,
  Waves,
  HeartPulse,
  ArrowRight,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { HEALTH_SNAPSHOT, READINESS } from "@/lib/fitness-data";

export const Route = createFileRoute("/recovery")({
  head: () => ({
    meta: [
      { title: "Recovery — Fitness" },
      {
        name: "description",
        content:
          "Recovery Score, Schlafqualität, Stresslevel und Empfehlungen zur Stressreduktion.",
      },
      { property: "og:title", content: "Recovery — Fitness" },
      {
        property: "og:description",
        content: "Deine Erholung im Blick: Score, Schlaf, Stress & Empfehlungen.",
      },
    ],
  }),
  component: RecoveryPage,
});

const recoveryScore = Math.round(
  (READINESS.score + HEALTH_SNAPSHOT.sleepQuality + (100 - HEALTH_SNAPSHOT.stress)) / 3,
);

function intensityFor(score: number) {
  if (score >= 80)
    return {
      label: "Hoch",
      hint: "Intensives Training möglich — HIIT oder Tempoläufe.",
      pct: 0.9,
      tone: "oklch(0.68 0.19 245)",
    };
  if (score >= 60)
    return {
      label: "Moderat",
      hint: "Ausgewogene Session — Zone 2 oder Krafttraining.",
      pct: 0.65,
      tone: "oklch(0.78 0.17 220)",
    };
  return {
    label: "Leicht",
    hint: "Aktive Erholung — Mobility, Yoga oder Spaziergang.",
    pct: 0.35,
    tone: "oklch(0.72 0.15 200)",
  };
}

const rec = intensityFor(recoveryScore);

const exercises = [
  {
    icon: Wind,
    title: "Box Breathing",
    subtitle: "4 min · Atmung 4-4-4-4",
    color: "oklch(0.78 0.17 220)",
  },
  {
    icon: Waves,
    title: "Body Scan",
    subtitle: "8 min · Geführte Entspannung",
    color: "oklch(0.68 0.19 245)",
  },
  {
    icon: Sparkles,
    title: "Mobility Flow",
    subtitle: "10 min · Sanfte Dehnung",
    color: "oklch(0.72 0.15 260)",
  },
  {
    icon: Brain,
    title: "Meditation",
    subtitle: "12 min · Fokus & Ruhe",
    color: "oklch(0.74 0.14 235)",
  },
];

function RecoveryPage() {
  return (
    <AppShell>
      <PageHeader title="Recovery" subtitle="Wie erholt bist du heute?" />

      {/* Recovery Score */}
      <div className="px-5">
        <div className="glass relative overflow-hidden rounded-3xl p-5">
          <div
            className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full opacity-70 blur-3xl"
            style={{ background: "var(--gradient-primary)" }}
          />
          <div className="relative flex items-center gap-5">
            <ScoreRing value={recoveryScore} />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Recovery Score
              </p>
              <p className="mt-0.5 text-lg font-bold">
                {recoveryScore >= 80
                  ? "Sehr gut erholt"
                  : recoveryScore >= 60
                    ? "Gut erholt"
                    : "Erholung nötig"}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Chip label="Schlaf" value={HEALTH_SNAPSHOT.sleepQuality} />
                <Chip label="Stress" value={100 - HEALTH_SNAPSHOT.stress} />
                <Chip label="HRV" value={74} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sleep & Stress */}
      <div className="mt-3 grid grid-cols-2 gap-3 px-5">
        <MetricCard
          icon={<Moon className="h-4 w-4" size={16} />}
          label="Schlafqualität"
          value={`${HEALTH_SNAPSHOT.sleepQuality}%`}
          sub={`${HEALTH_SNAPSHOT.sleepHours} h Schlaf`}
          progress={HEALTH_SNAPSHOT.sleepQuality / 100}
        />
        <MetricCard
          icon={<Brain className="h-4 w-4" size={16} />}
          label="Stresslevel"
          value={String(HEALTH_SNAPSHOT.stress)}
          sub={HEALTH_SNAPSHOT.stress < 40 ? "Niedrig" : "Moderat"}
          progress={HEALTH_SNAPSHOT.stress / 100}
          inverse
        />
      </div>

      {/* Recommended intensity */}
      <div className="mt-3 px-5">
        <div className="glass rounded-3xl p-5">
          <div className="flex items-center gap-2">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl"
              style={{ background: `${rec.tone}22`, color: rec.tone }}
            >
              <Activity className="h-4.5 w-4.5" size={18} />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Empfohlene Intensität
              </p>
              <p className="text-lg font-bold">{rec.label}</p>
            </div>
          </div>
          <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-primary/10">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${rec.pct * 100}%`,
                background: "var(--gradient-primary)",
              }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
            <span>Leicht</span>
            <span>Moderat</span>
            <span>Hoch</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{rec.hint}</p>
        </div>
      </div>

      {/* Stress reduction exercises */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" size={14} />
            Stressreduktion
          </h2>
        </div>
        <div className="mt-3 space-y-2.5 px-5">
          {exercises.map((e) => {
            const I = e.icon;
            return (
              <div
                key={e.title}
                className="glass flex items-center gap-3 rounded-2xl p-3.5 transition hover:glow-primary"
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                  style={{ background: `${e.color}22`, color: e.color }}
                >
                  <I className="h-5 w-5" size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{e.title}</p>
                  <p className="text-xs text-muted-foreground">{e.subtitle}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" size={16} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 px-5">
        <Link
          to="/health"
          className="glass flex items-center gap-3 rounded-2xl p-3.5 transition hover:glow-primary"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <HeartPulse className="h-5 w-5" size={20} />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold">Alle Gesundheitswerte</p>
            <p className="text-xs text-muted-foreground">Puls, Schritte & mehr</p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" size={16} />
        </Link>
      </div>
    </AppShell>
  );
}

function Chip({ label, value }: { label: string; value: number }) {
  return (
    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
      {label} {value}
    </span>
  );
}

function ScoreRing({ value }: { value: number }) {
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
          className="fill-none stroke-[url(#gradRec)] transition-all duration-700"
        />
        <defs>
          <linearGradient id="gradRec" x1="0" y1="0" x2="1" y2="1">
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

function MetricCard({
  icon,
  label,
  value,
  sub,
  progress,
  inverse,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  progress: number;
  inverse?: boolean;
}) {
  const pct = Math.min(1, Math.max(0, progress));
  const displayPct = inverse ? 1 - pct : pct;
  return (
    <div className="glass rounded-3xl p-4">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-[11px] font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold tabular-nums">{value}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${displayPct * 100}%`,
            background: "var(--gradient-primary)",
          }}
        />
      </div>
    </div>
  );
}
