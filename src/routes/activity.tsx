import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { AppShell, PageHeader } from "@/components/AppShell";
import {
  ACTIVITY_META,
  PAST_ACTIVITIES,
  WEEK_DATA,
  formatDate,
  formatDuration,
} from "@/lib/fitness-data";

export const Route = createFileRoute("/activity")({
  component: ActivityPage,
});

const RANGES = ["Woche", "Monat", "Jahr"] as const;

function ActivityPage() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("Woche");
  const [compare, setCompare] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setCompare((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else if (n.size < 2) n.add(id);
      return n;
    });
  };

  const totals = PAST_ACTIVITIES.reduce(
    (acc, a) => ({
      duration: acc.duration + a.durationSec,
      distance: acc.distance + a.distanceKm,
      calories: acc.calories + a.calories,
    }),
    { duration: 0, distance: 0, calories: 0 },
  );

  const compareList = PAST_ACTIVITIES.filter((a) => compare.has(a.id));

  return (
    <AppShell>
      <PageHeader title="Activity Summary" subtitle="Deine Trainings im Überblick" />

      <div className="px-5">
        <div className="glass inline-flex rounded-full p-1">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                range === r
                  ? "gradient-primary text-primary-foreground shadow"
                  : "text-muted-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="mt-4 grid grid-cols-3 gap-2 px-5">
        <Stat label="Zeit" value={formatDuration(totals.duration)} />
        <Stat label="Distanz" value={`${totals.distance.toFixed(1)} km`} />
        <Stat label="Kalorien" value={`${totals.calories}`} />
      </div>

      {/* Chart */}
      <div className="mt-4 px-5">
        <div className="glass rounded-3xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Minuten pro Tag</p>
            <span className="text-xs text-muted-foreground">Ziel 45 min</span>
          </div>
          <div className="mt-2 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEK_DATA} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.17 235)" />
                    <stop offset="100%" stopColor="oklch(0.68 0.19 245)" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.9 0.02 240)" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip
                  cursor={{ fill: "oklch(0.68 0.19 245 / 0.08)" }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid oklch(0.9 0.02 240)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="minutes" fill="url(#barG)" radius={[8, 8, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Compare */}
      {compareList.length === 2 ? (
        <div className="mt-4 px-5">
          <div className="glass rounded-3xl p-4">
            <p className="text-sm font-semibold">Vergleich</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {compareList.map((a) => {
                const M = ACTIVITY_META[a.type];
                return (
                  <div key={a.id} className="rounded-2xl bg-primary/5 p-3">
                    <p className="text-xs font-semibold" style={{ color: M.color }}>
                      {M.label}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {formatDate(a.date)}
                    </p>
                    <dl className="mt-2 space-y-1 text-xs">
                      <Row k="Dauer" v={formatDuration(a.durationSec)} />
                      <Row k="Distanz" v={`${a.distanceKm} km`} />
                      <Row k="Ø HF" v={`${a.avgHr} bpm`} />
                      <Row k="kcal" v={String(a.calories)} />
                    </dl>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      {/* List */}
      <div className="mt-4 px-5 pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground">
            Vergangene Aktivitäten
          </h2>
          <span className="text-[11px] text-muted-foreground">
            {compare.size}/2 zum Vergleich
          </span>
        </div>
        <div className="mt-3 space-y-2.5">
          {PAST_ACTIVITIES.map((a) => {
            const M = ACTIVITY_META[a.type];
            const I = M.icon;
            const selected = compare.has(a.id);
            return (
              <div
                key={a.id}
                className={`glass flex items-center gap-3 rounded-2xl p-3.5 ${
                  selected ? "ring-2 ring-primary" : ""
                }`}
              >
                <button
                  onClick={() => toggle(a.id)}
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ${
                    selected
                      ? "gradient-primary border-transparent text-primary-foreground"
                      : "border-muted-foreground/30"
                  }`}
                  aria-label="Vergleichen"
                >
                  {selected ? "✓" : ""}
                </button>
                <Link
                  to="/activity/$id"
                  params={{ id: a.id }}
                  className="flex flex-1 items-center gap-3"
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
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-3 text-center">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold tabular-nums">{value}</p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-semibold">{v}</dd>
    </div>
  );
}
