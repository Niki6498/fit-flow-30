import {
  Activity,
  Bike,
  Dumbbell,
  Flame,
  Footprints,
  Music,
  Waves,
  type LucideIcon,
} from "lucide-react";

export type ActivityType =
  | "running"
  | "cycling"
  | "hiit"
  | "swimming"
  | "strength"
  | "dance";

export const ACTIVITY_META: Record<
  ActivityType,
  { label: string; icon: LucideIcon; color: string; unit: "km" | "laps" | "reps" }
> = {
  running: { label: "Running", icon: Footprints, color: "#3b82f6", unit: "km" },
  cycling: { label: "Cycling", icon: Bike, color: "#06b6d4", unit: "km" },
  hiit: { label: "HIIT", icon: Flame, color: "#8b5cf6", unit: "reps" },
  swimming: { label: "Swimming", icon: Waves, color: "#0ea5e9", unit: "laps" },
  strength: { label: "Krafttraining", icon: Dumbbell, color: "#6366f1", unit: "reps" },
  dance: { label: "Tanzen", icon: Music, color: "#a855f7", unit: "reps" },
};

export const ACTIVITY_ORDER: ActivityType[] = [
  "running",
  "cycling",
  "hiit",
  "swimming",
  "strength",
  "dance",
];

export interface PastActivity {
  id: string;
  type: ActivityType;
  date: string; // ISO
  durationSec: number;
  distanceKm: number;
  calories: number;
  avgHr: number;
  maxHr: number;
  pace: string; // e.g. "5:12"
  splits: { km: number; pace: string; hr: number }[];
  hrSeries: { t: number; hr: number }[];
}

const mkHr = (base: number, n = 30) =>
  Array.from({ length: n }, (_, i) => ({
    t: i,
    hr: Math.round(base + Math.sin(i / 3) * 8 + (Math.random() - 0.5) * 4),
  }));

export const PAST_ACTIVITIES: PastActivity[] = [
  {
    id: "a1",
    type: "running",
    date: new Date(Date.now() - 1 * 864e5).toISOString(),
    durationSec: 32 * 60 + 14,
    distanceKm: 6.1,
    calories: 468,
    avgHr: 152,
    maxHr: 174,
    pace: "5:17",
    splits: [
      { km: 1, pace: "5:24", hr: 142 },
      { km: 2, pace: "5:18", hr: 149 },
      { km: 3, pace: "5:11", hr: 155 },
      { km: 4, pace: "5:09", hr: 158 },
      { km: 5, pace: "5:15", hr: 156 },
      { km: 6, pace: "5:22", hr: 153 },
    ],
    hrSeries: mkHr(152, 32),
  },
  {
    id: "a2",
    type: "cycling",
    date: new Date(Date.now() - 3 * 864e5).toISOString(),
    durationSec: 58 * 60,
    distanceKm: 24.3,
    calories: 612,
    avgHr: 138,
    maxHr: 165,
    pace: "2:23",
    splits: [
      { km: 5, pace: "2:30", hr: 130 },
      { km: 10, pace: "2:20", hr: 138 },
      { km: 15, pace: "2:22", hr: 142 },
      { km: 20, pace: "2:18", hr: 145 },
    ],
    hrSeries: mkHr(138, 40),
  },
  {
    id: "a3",
    type: "hiit",
    date: new Date(Date.now() - 5 * 864e5).toISOString(),
    durationSec: 28 * 60,
    distanceKm: 0,
    calories: 342,
    avgHr: 161,
    maxHr: 182,
    pace: "-",
    splits: [],
    hrSeries: mkHr(161, 28),
  },
  {
    id: "a4",
    type: "strength",
    date: new Date(Date.now() - 7 * 864e5).toISOString(),
    durationSec: 45 * 60,
    distanceKm: 0,
    calories: 298,
    avgHr: 118,
    maxHr: 142,
    pace: "-",
    splits: [],
    hrSeries: mkHr(118, 45),
  },
  {
    id: "a5",
    type: "swimming",
    date: new Date(Date.now() - 10 * 864e5).toISOString(),
    durationSec: 35 * 60,
    distanceKm: 1.4,
    calories: 388,
    avgHr: 132,
    maxHr: 158,
    pace: "2:30",
    splits: [],
    hrSeries: mkHr(132, 35),
  },
];

export const WEEK_DATA = [
  { day: "Mo", minutes: 42, calories: 380, goal: 45 },
  { day: "Di", minutes: 0, calories: 0, goal: 45 },
  { day: "Mi", minutes: 58, calories: 612, goal: 45 },
  { day: "Do", minutes: 28, calories: 342, goal: 45 },
  { day: "Fr", minutes: 45, calories: 298, goal: 45 },
  { day: "Sa", minutes: 35, calories: 388, goal: 45 },
  { day: "So", minutes: 32, calories: 468, goal: 45 },
];

export const HEALTH_SNAPSHOT = {
  steps: 8432,
  stepsGoal: 10000,
  calories: 2145,
  caloriesGoal: 2400,
  sleepHours: 7.4,
  sleepQuality: 82,
  activityLevel: "Aktiv",
  stress: 34,
  restingHr: 58,
};

export const READINESS = {
  score: 82,
  label: "Bereit für dein Training",
  factors: [
    { name: "Schlaf", value: 88 },
    { name: "HRV", value: 74 },
    { name: "Ruhepuls", value: 85 },
    { name: "Erholung", value: 80 },
  ],
};

export const SUGGESTED = [
  { id: "s1", title: "Easy Run", subtitle: "30 min · Zone 2", type: "running" as ActivityType },
  { id: "s2", title: "HIIT Blast", subtitle: "20 min · Hochintensiv", type: "hiit" as ActivityType },
  { id: "s3", title: "Kraft Oberkörper", subtitle: "45 min · 6 Übungen", type: "strength" as ActivityType },
];

export const FRIENDS = [
  { id: "f1", name: "Lena K.", streak: 12, avatar: "LK" },
  { id: "f2", name: "Max M.", streak: 7, avatar: "MM" },
  { id: "f3", name: "Sarah B.", streak: 21, avatar: "SB" },
  { id: "f4", name: "Tom H.", streak: 4, avatar: "TH" },
];

export const CHALLENGES = [
  { id: "c1", title: "50km Woche", progress: 32, goal: 50, participants: 4, unit: "km" },
  { id: "c2", title: "5x Training", progress: 3, goal: 5, participants: 6, unit: "" },
  { id: "c3", title: "10.000 Schritte täglich", progress: 5, goal: 7, participants: 12, unit: "Tage" },
];

export const FEED = [
  {
    id: "p1",
    user: "Lena K.",
    avatar: "LK",
    activity: "running" as ActivityType,
    title: "Morgenlauf im Park",
    distanceKm: 8.2,
    durationSec: 45 * 60,
    time: "vor 2 Std",
    kudos: 12,
  },
  {
    id: "p2",
    user: "Sarah B.",
    avatar: "SB",
    activity: "cycling" as ActivityType,
    title: "Feierabend Ride",
    distanceKm: 32.5,
    durationSec: 72 * 60,
    time: "vor 5 Std",
    kudos: 24,
  },
  {
    id: "p3",
    user: "Max M.",
    avatar: "MM",
    activity: "hiit" as ActivityType,
    title: "HIIT Session",
    distanceKm: 0,
    durationSec: 25 * 60,
    time: "gestern",
    kudos: 8,
  },
];

export function formatDuration(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" });
}

export { Activity };
