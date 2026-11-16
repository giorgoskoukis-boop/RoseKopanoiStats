import { games, roster, type Game, type Player, type PlayerLine } from "@/data/season";

export type Totals = {
  min: number; pts: number; fg2m: number; fg2a: number; fg3m: number; fg3a: number;
  ftm: number; fta: number; oreb: number; dreb: number; reb: number; ast: number;
  stl: number; blk: number; tov: number; eff: number;
};
const ZERO: Totals = {
  min: 0, pts: 0, fg2m: 0, fg2a: 0, fg3m: 0, fg3a: 0, ftm: 0, fta: 0,
  oreb: 0, dreb: 0, reb: 0, ast: 0, stl: 0, blk: 0, tov: 0, eff: 0,
};

export const pts = (l: PlayerLine) => 2 * l.fg2m + 3 * l.fg3m + l.ftm;
export function lineTotals(l: PlayerLine): Totals {
  const { player: _player, ...rest } = l;
  void _player;
  return { ...rest, pts: pts(l), reb: l.oreb + l.dreb };
}
export function sum(list: Totals[]): Totals {
  return list.reduce((a, b) => {
    const r = { ...a };
    (Object.keys(ZERO) as (keyof Totals)[]).forEach((k) => (r[k] = a[k] + b[k]));
    return r;
  }, ZERO);
}
export const gameTotals = (g: Game) => sum(g.lines.map(lineTotals));
export const isWin = (g: Game) => g.teamScore > g.oppScore;

const num1 = new Intl.NumberFormat("el-GR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
export const shortDate = new Intl.DateTimeFormat("el-GR", { day: "numeric", month: "short" });
export const longDate = new Intl.DateTimeFormat("el-GR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
export const toDate = (s: string) => new Date(`${s}T12:00:00`);
export const pctVal = (m: number, a: number) => (a > 0 ? (m / a) * 100 : null);
export const fmtPct = (v: number | null) => (v === null ? "–" : `${num1.format(v)}%`);
export const fmtAvg = (v: number) => num1.format(v);
export const signed = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : "0");
export const shot = (m: number, a: number) => `${m}/${a}`;

export const displayName = (p: Pick<Player, "firstName" | "lastName">) => `${p.firstName} ${p.lastName}`;
export const playerById = (id: string) => roster.find((p) => p.id === id);
export const playerName = (id: string) => {
  const p = playerById(id);
  return p ? displayName(p) : id;
};
export const shortOpp = (o: string) => o.replace(/_+/g, " ").split(" ")[0];

export const sortedGames = [...games].sort((a, b) => a.date.localeCompare(b.date));

export type SeasonRow = Player & { name: string; gp: number; mvps: number; t: Totals };
export const seasonRows: SeasonRow[] = roster.map((p) => {
  const lines = sortedGames.flatMap((g) => g.lines.filter((l) => l.player === p.id));
  const mvps = sortedGames.filter((g) => g.mvp === p.id).length;
  return { ...p, name: displayName(p), gp: lines.length, mvps, t: sum(lines.map(lineTotals)) };
});

/** Roster ordered by surname (Greek collation). */
export const rosterByName = [...seasonRows].sort((a, b) => a.lastName.localeCompare(b.lastName, "el"));
