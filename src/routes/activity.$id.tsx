import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Flame, Heart, Map, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ACTIVITY_META, PAST_ACTIVITIES, formatDate, formatDuration } from "@/lib/fitness-data";

export const Route = createFileRoute("/activity/$id")({
  component: DetailPage,
  notFoundComponent: () => (
    <div className="grid min-h-dvh place-items-center px-5">
      <div className="glass rounded-3xl p-8 text-center">
        <p className="font-semibold">Aktivität nicht gefunden</p>
        <Link to="/activity" className="mt-3 inline-block text-sm text-primary">
          Zurück
        </Link>
      </div>
    </div>
  ),
});

function DetailPage() {
  const { id } = Route.useParams();
  const a = PAST_ACTIVITIES.find((x) => x.id === id);
  if (!a) throw notFound();
  const M = ACTIVITY_META[a.type];
  const Icon = M.icon;

  return (
    <div className="mx-auto min-h-dvh w-full max-w-md pb-10">
      {/* Hero */}
      <div className="relative overflow-hidden px-5 pt-6 pb-8">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-40 blur-3xl"
          style={{ background: `radial-gradient(circle at 30% 20%, ${M.color}, transparent 60%)` }}
        />
        <div className="relative flex items-center justify-between">
          <Link to="/activity" className="glass grid h-10 w-10 place-items-center rounded-2xl">
            <ArrowLeft className="h-4 w-4" size={16} />
          </Link>
          <span className="text-xs text-muted-foreground">{formatDate(a.date)}</span>
        </div>
        <div className="relative mt-6 flex items-center gap-3">
          <span
            className="grid h-14 w-14 place-items-center rounded-2xl"
            style={{ background: `${M.color}22`, color: M.color }}
          >
            <Icon className="h-7 w-7" size={28} />
          </span>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Aktivität</p>
            <h1 className="text-2xl font-bold">{M.label}</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 px-5">
        <Big icon={<Clock className="h-4 w-4" size={16} />} label="Dauer" value={formatDuration(a.durationSec)} />
        <Big icon={<Map className="h-4 w-4" size={16} />} label="Distanz" value={a.distanceKm > 0 ? `${a.distanceKm} km` : "—"} />
        <Big icon={<Heart className="h-4 w-4" size={16} />} label="Ø Herzfrequenz" value={`${a.avgHr} bpm`} />
        <Big icon={<Flame className="h-4 w-4" size={16} />} label="Kalorien" value={`${a.calories}`} />
      </div>

      <div className="mt-4 px-5">
        <div className="glass rounded-3xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Herzfrequenz-Verlauf</p>
            <span className="text-xs text-muted-foreground">Max {a.maxHr} bpm</span>
          </div>
          <div className="mt-2 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={a.hrSeries} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="hrG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={M.color} stopOpacity={0.6} />
                    <stop offset="100%" stopColor={M.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" hide />
                <YAxis domain={["dataMin - 10", "dataMax + 10"]} tickLine={false} axisLine={false} fontSize={10} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey="hr"
                  stroke={M.color}
                  strokeWidth={2.5}
                  fill="url(#hrG)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {a.splits.length > 0 ? (
        <div className="mt-4 px-5">
          <div className="glass rounded-3xl p-4">
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              <TrendingUp className="h-3.5 w-3.5" size={14} /> Splits
            </p>
            <div className="mt-3 space-y-1.5">
              {a.splits.map((s) => (
                <div key={s.km} className="flex items-center gap-3 text-sm">
                  <span className="w-8 shrink-0 text-xs font-semibold text-muted-foreground">
                    {s.km}km
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-primary/10">
                    <div
                      className="h-full gradient-primary"
                      style={{
                        width: `${Math.min(100, (parseInt(s.pace.split(":")[1]) / 60) * 100 + 40)}%`,
                      }}
                    />
                  </div>
                  <span className="w-14 shrink-0 text-right font-semibold tabular-nums">
                    {s.pace}
                  </span>
                  <span className="w-14 shrink-0 text-right text-xs text-muted-foreground tabular-nums">
                    {s.hr} bpm
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Big({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-[11px] font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-1.5 text-xl font-bold tabular-nums">{value}</p>
    </div>
  );
}
