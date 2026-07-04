import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Square, ArrowLeft } from "lucide-react";
import { ACTIVITY_META, formatDuration, type ActivityType } from "@/lib/fitness-data";

export const Route = createFileRoute("/session/$type")({
  component: SessionPage,
});

function SessionPage() {
  const { type } = Route.useParams();
  const navigate = useNavigate();
  const activityType = (type as ActivityType) ?? "running";
  const Meta = ACTIVITY_META[activityType] ?? ACTIVITY_META.running;
  const Icon = Meta.icon;

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [hr, setHr] = useState(128);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
      setHr((h) => {
        const drift = (Math.random() - 0.45) * 4;
        return Math.max(90, Math.min(185, Math.round(h + drift)));
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const distance = +(seconds * 0.0035).toFixed(2); // km
  const paceSec = seconds > 30 && distance > 0.05 ? Math.round(seconds / distance) : 0;
  const paceStr = paceSec
    ? `${Math.floor(paceSec / 60)}:${String(paceSec % 60).padStart(2, "0")}`
    : "--:--";
  const calories = Math.round(seconds * 0.14);

  const stop = () => {
    navigate({ to: "/activity" });
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pt-6 pb-8">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate({ to: "/" })}
          className="glass grid h-10 w-10 place-items-center rounded-2xl"
        >
          <ArrowLeft className="h-4 w-4" size={16} />
        </button>
        <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-primary pulse-glow" />
          <span className="text-xs font-semibold">LIVE</span>
        </div>
        <div className="w-10" />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span
          className="grid h-12 w-12 place-items-center rounded-2xl"
          style={{ background: `${Meta.color}22`, color: Meta.color }}
        >
          <Icon className="h-6 w-6" size={24} />
        </span>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">In Bewegung</p>
          <h1 className="text-xl font-bold">{Meta.label}</h1>
        </div>
      </div>

      {/* Big timer */}
      <div className="mt-8 grid place-items-center">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full opacity-70 blur-3xl"
            style={{ background: "var(--gradient-primary)" }}
          />
          <div className="glass relative grid h-64 w-64 place-items-center rounded-full">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Zeit</p>
              <p className="mt-1 text-5xl font-bold tabular-nums gradient-text">
                {formatDuration(seconds)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                gestartet {new Date(startedAt.current).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        <Metric label="Distanz" value={distance.toFixed(2)} unit="km" />
        <Metric label="Pace" value={paceStr} unit="/km" />
        <Metric label="Herzfrequenz" value={String(hr)} unit="bpm" accent />
        <Metric label="Kalorien" value={String(calories)} unit="kcal" />
      </div>

      {/* Controls */}
      <div className="mt-auto flex items-center justify-center gap-4 pt-8">
        <button
          onClick={stop}
          className="grid h-16 w-16 place-items-center rounded-full bg-destructive text-destructive-foreground shadow-lg transition active:scale-95"
        >
          <Square className="h-6 w-6 fill-current" />
        </button>
        <button
          onClick={() => setRunning((r) => !r)}
          className="grid h-20 w-20 place-items-center rounded-full gradient-primary text-primary-foreground glow-ring transition active:scale-95"
        >
          {running ? <Pause className="h-8 w-8 fill-current" /> : <Play className="h-8 w-8 fill-current" />}
        </button>
        <div className="h-16 w-16" />
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: string;
  unit: string;
  accent?: boolean;
}) {
  return (
    <div className={`glass rounded-2xl p-4 ${accent ? "glow-primary" : ""}`}>
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-bold tabular-nums">{value}</span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}
