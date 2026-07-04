import { createFileRoute } from "@tanstack/react-router";
import { Flame, Target, TrendingUp, Trophy } from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell, PageHeader } from "@/components/AppShell";
import { WEEK_DATA } from "@/lib/fitness-data";

export const Route = createFileRoute("/progress")({
  component: ProgressPage,
});

const GOALS = [
  { label: "Trainings/Woche", current: 4, goal: 5 },
  { label: "Distanz km/Woche", current: 24, goal: 40 },
  { label: "Aktive Minuten", current: 240, goal: 300 },
];

function ProgressPage() {
  const streak = 12;
  return (
    <AppShell>
      <PageHeader title="Fortschritt" subtitle="Ziele & Serien" />

      {/* Streak hero */}
      <div className="px-5">
        <div className="glass relative overflow-hidden rounded-3xl p-5">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-70 blur-3xl"
            style={{ background: "var(--gradient-primary)" }}
          />
          <div className="relative flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-2xl gradient-primary text-primary-foreground glow-primary">
              <Flame className="h-8 w-8" size={32} />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Aktuelle Serie
              </p>
              <p className="text-3xl font-bold gradient-text">{streak} Tage</p>
              <p className="text-xs text-muted-foreground">
                Weiter so — nur noch 2 Tage bis zum neuen Rekord
              </p>
            </div>
          </div>
          <div className="relative mt-4 flex gap-1.5">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className={`h-6 flex-1 rounded-md ${
                  i < streak
                    ? "gradient-primary"
                    : "bg-primary/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Weekly trend */}
      <div className="mt-4 px-5">
        <div className="glass rounded-3xl p-4">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              <TrendingUp className="h-3.5 w-3.5" size={14} /> Wochentrend
            </p>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
              +18%
            </span>
          </div>
          <div className="mt-2 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEK_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  stroke="oklch(0.68 0.19 245)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "oklch(0.68 0.19 245)" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="mt-4 px-5">
        <h2 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <Target className="h-3.5 w-3.5" size={14} /> Wochenziele
        </h2>
        <div className="space-y-3">
          {GOALS.map((g) => {
            const pct = Math.min(100, Math.round((g.current / g.goal) * 100));
            return (
              <div key={g.label} className="glass rounded-2xl p-4">
                <div className="flex items-baseline justify-between">
                  <p className="font-semibold">{g.label}</p>
                  <p className="text-sm text-muted-foreground tabular-nums">
                    <span className="font-bold text-foreground">{g.current}</span> / {g.goal}
                  </p>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary/10">
                  <div
                    className="h-full gradient-primary transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-muted-foreground">{pct}% erreicht</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-4 px-5">
        <h2 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <Trophy className="h-3.5 w-3.5" size={14} /> Errungenschaften
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {["10km Läufer", "7-Tage-Serie", "Frühaufsteher"].map((t, i) => (
            <div key={t} className="glass rounded-2xl p-3 text-center">
              <div
                className="mx-auto grid h-12 w-12 place-items-center rounded-full text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Trophy className="h-5 w-5" size={20} />
              </div>
              <p className="mt-2 text-[11px] font-semibold">{t}</p>
              <p className="text-[10px] text-muted-foreground">Stufe {i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
