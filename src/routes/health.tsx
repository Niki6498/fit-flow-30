import { createFileRoute } from "@tanstack/react-router";
import { Footprints, Flame, Moon, Activity, Brain, Heart } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { HEALTH_SNAPSHOT } from "@/lib/fitness-data";

export const Route = createFileRoute("/health")({
  component: HealthPage,
});

function HealthPage() {
  const h = HEALTH_SNAPSHOT;
  return (
    <AppShell>
      <PageHeader title="Gesundheit" subtitle="Deine Werte heute" />

      <div className="grid grid-cols-2 gap-3 px-5">
        <Ring
          icon={<Footprints className="h-4 w-4" size={16} />}
          label="Schritte"
          value={h.steps.toLocaleString("de-DE")}
          progress={h.steps / h.stepsGoal}
          sub={`Ziel ${h.stepsGoal.toLocaleString("de-DE")}`}
          color="oklch(0.68 0.19 245)"
        />
        <Ring
          icon={<Flame className="h-4 w-4" size={16} />}
          label="Kalorien"
          value={String(h.calories)}
          progress={h.calories / h.caloriesGoal}
          sub={`Ziel ${h.caloriesGoal}`}
          color="oklch(0.78 0.17 220)"
        />
      </div>

      <div className="mt-3 px-5">
        <div className="glass rounded-3xl p-5">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
              <Moon className="h-4.5 w-4.5" size={18} />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Schlaf</p>
              <p className="text-lg font-bold">{h.sleepHours} h</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-muted-foreground">Qualität</p>
              <p className="text-lg font-bold gradient-text">{h.sleepQuality}%</p>
            </div>
          </div>
          <div className="mt-4 flex gap-1 items-end h-16">
            {[3, 4, 2, 3, 4, 2, 1, 3, 4, 3, 2, 4].map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t"
                style={{
                  height: `${v * 22}%`,
                  background: `linear-gradient(180deg, oklch(0.78 0.17 235 / ${0.4 + v * 0.15}), oklch(0.68 0.19 245 / 0.9))`,
                }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
            <span>23:00</span>
            <span>03:00</span>
            <span>07:00</span>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 px-5">
        <Tile
          icon={<Activity className="h-4 w-4" size={16} />}
          label="Aktivitätslevel"
          value={h.activityLevel}
          hint="Über Durchschnitt"
        />
        <Tile
          icon={<Brain className="h-4 w-4" size={16} />}
          label="Stress"
          value={String(h.stress)}
          hint="Niedrig"
        />
      </div>

      <div className="mt-3 px-5">
        <div className="glass flex items-center gap-4 rounded-3xl p-5">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Heart className="h-6 w-6" size={24} />
          </span>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Ruhepuls</p>
            <p className="text-2xl font-bold tabular-nums">
              {h.restingHr} <span className="text-sm font-medium text-muted-foreground">bpm</span>
            </p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Sehr gut
          </span>
        </div>
      </div>
    </AppShell>
  );
}

function Ring({
  icon,
  label,
  value,
  progress,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  progress: number;
  sub: string;
  color: string;
}) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const off = c - Math.min(1, progress) * c;
  return (
    <div className="glass rounded-3xl p-4">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-[11px] font-medium uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="relative h-20 w-20">
          <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
            <circle cx="40" cy="40" r={r} strokeWidth="7" className="fill-none stroke-primary/10" />
            <circle
              cx="40"
              cy="40"
              r={r}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={off}
              stroke={color}
              className="fill-none transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <span className="text-xs font-bold">{Math.round(progress * 100)}%</span>
          </div>
        </div>
        <div>
          <p className="text-xl font-bold tabular-nums">{value}</p>
          <p className="text-[11px] text-muted-foreground">{sub}</p>
        </div>
      </div>
    </div>
  );
}

function Tile({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="glass rounded-3xl p-4">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-[11px] font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-2 text-lg font-bold">{value}</p>
      <p className="text-[11px] text-primary">{hint}</p>
    </div>
  );
}
