import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowDown, ArrowUp, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  A,
  BoxCells,
  BoxHeader,
  MvpMark,
  numCell,
  PlayerLink,
  PlayerPhoto,
  ResultBadge,
} from "@/components/stats-ui";
import { TEAM_NAME, type Game } from "@/data/season";
import {
  fmtAvg,
  fmtPct,
  gameTotals,
  isWin,
  lineTotals,
  longDate,
  pctVal,
  playerName,
  rosterByName,
  seasonRows,
  shortDate,
  shot,
  signed,
  sortedGames,
  sum,
  toDate,
  type SeasonRow,
} from "@/lib/stats";
import { cn } from "@/lib/utils";

/* ---------- games ---------- */

function ResultsStrip({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const maxMargin = Math.max(1, ...sortedGames.map((g) => Math.abs(g.teamScore - g.oppScore)));
  return (
    <section aria-labelledby="results-h" className="rounded-lg border bg-card p-4">
      <h2 id="results-h" className="mb-3 text-base font-semibold">
        Αποτελέσματα
      </h2>
      <div role="group" aria-label="Επιλογή αγώνα" className="flex gap-2 overflow-x-auto pb-1">
        {sortedGames.map((g) => {
          const margin = g.teamScore - g.oppScore;
          const h = (Math.abs(margin) / maxMargin) * 44;
          const active = g.id === selected;
          return (
            <button
              key={g.id}
              type="button"
              aria-pressed={active}
              aria-label={`${g.round}η αγωνιστική, ${shortDate.format(toDate(g.date))}, ${g.venue === "home" ? "εντός" : "εκτός"} με ${g.opponent}, ${g.teamScore}–${g.oppScore}, ${isWin(g) ? "νίκη" : "ήττα"}`}
              onClick={() => onSelect(g.id)}
              className={cn(
                "flex w-[6.25rem] shrink-0 flex-col items-center gap-1 rounded-md border px-1.5 py-2 text-center transition-colors hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                active ? "border-primary bg-muted ring-1 ring-primary forced-colors:border-[Highlight]" : "border-border",
              )}
            >
              <span className="text-xs text-foreground">{shortDate.format(toDate(g.date))}</span>
              <span className="relative block h-24 w-full" aria-hidden="true">
                <span className="absolute inset-x-1 top-1/2 h-px bg-border forced-colors:bg-[CanvasText]" />
                <span
                  className={cn(
                    "absolute left-1/2 w-5 -translate-x-1/2 rounded-sm forced-colors:bg-[CanvasText]",
                    margin >= 0 ? "bottom-1/2 bg-green-700 dark:bg-green-600" : "top-1/2 bg-red-700 dark:bg-red-500",
                  )}
                  style={{ height: `${Math.max(h, 2)}px` }}
                />
                <span className={cn("absolute inset-x-0 text-xs font-medium tabular-nums", margin >= 0 ? "top-0" : "bottom-0")}>
                  {signed(margin)}
                </span>
              </span>
              <span className="text-sm font-semibold tabular-nums">
                {g.teamScore}–{g.oppScore}
              </span>
              <span className="text-xs leading-tight break-words">
                {g.venue === "home" ? "vs" : "@"} {g.opponent}
              </span>
              <span className="text-xs font-semibold">{isWin(g) ? "Ν" : "Η"}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function LineScore({ g }: { g: Game }) {
  if (!g.quarters) return null;
  const { team, opp } = g.quarters;
  const heads = team.map((_, i) => (i < 4 ? String(i + 1) : "Παρ."));
  const rows: [string, number[]][] = [
    [TEAM_NAME, team],
    [g.opponent, opp],
  ];
  return (
    <table className="text-sm tabular-nums">
      <caption className="sr-only">Σκορ ανά δεκάλεπτο</caption>
      <thead>
        <tr>
          <th scope="col" className="sr-only">Ομάδα</th>
          {heads.map((h) => (
            <th key={h} scope="col" className="w-9 px-1 text-center font-medium text-muted-foreground">
              {h === "Παρ." ? <A s={h} t="Παράταση" /> : h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(([name, vals]) => (
          <tr key={name}>
            <th scope="row" className="pr-3 text-left font-normal whitespace-normal">{name}</th>
            {vals.map((v, i) => (
              <td key={i} className="px-1 text-center">{v}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function BoxScore({ g }: { g: Game }) {
  const t = gameTotals(g);
  const margin = g.teamScore - g.oppScore;
  const summary: [string, string][] = [
    ["2Π", `${shot(t.fg2m, t.fg2a)} · ${fmtPct(pctVal(t.fg2m, t.fg2a))}`],
    ["3Π", `${shot(t.fg3m, t.fg3a)} · ${fmtPct(pctVal(t.fg3m, t.fg3a))}`],
    ["Βολές", `${shot(t.ftm, t.fta)} · ${fmtPct(pctVal(t.ftm, t.fta))}`],
    ["Ριμπάουντ", `${t.reb} (${t.oreb} επ.)`],
    ["Ασίστ", String(t.ast)],
    ["Κλεψίματα", String(t.stl)],
    ["Κοψίματα", String(t.blk)],
    ["Λάθη", String(t.tov)],
  ];
  return (
    <section aria-labelledby="game-h" className="rounded-lg border bg-card">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b p-4">
        <div className="min-w-0">
          <h2 id="game-h" className="text-xl font-semibold tabular-nums">
            {TEAM_NAME} {g.teamScore} – {g.oppScore} {g.opponent}
          </h2>
          <p className="text-sm text-muted-foreground">
            {g.round}η αγωνιστική · {longDate.format(toDate(g.date))} · {g.venue === "home" ? "Εντός έδρας" : "Εκτός έδρας"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ResultBadge g={g} />
          <span className="text-sm font-medium tabular-nums">{signed(margin)}</span>
        </div>
        {g.quarters && (
          <div className="ml-auto">
            <LineScore g={g} />
          </div>
        )}
      </div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-2 border-b p-4 text-sm sm:grid-cols-4 lg:grid-cols-8">
        {summary.map(([k, v]) => (
          <div key={k} className="min-w-0">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="font-semibold tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      {t.pts !== g.teamScore && (
        <p role="note" className="border-b px-4 py-2 text-sm">
          Το άθροισμα πόντων των παικτών ({t.pts}) διαφέρει από το τελικό σκορ ({g.teamScore}).
        </p>
      )}
      {g.mvp && (
        <div className="flex items-center gap-3 border-b px-4 py-2 text-sm">
          <PlayerPhoto id={g.mvp} className="size-9 rounded-full" />
          <p>
            <span className="text-muted-foreground">MVP αγώνα:</span>{" "}
            <PlayerLink id={g.mvp} className="font-semibold">{playerName(g.mvp)}</PlayerLink>
          </p>
        </div>
      )}
      <div role="region" aria-label="Στατιστικά παικτών αγώνα" tabIndex={0} className="p-2">
        <Table>
          <caption className="sr-only">
            Στατιστικά παικτών, {TEAM_NAME} – {g.opponent}, {shortDate.format(toDate(g.date))}
          </caption>
          <BoxHeader first="Παίκτης" />
          <TableBody>
            {g.lines.map((l) => (
              <TableRow key={l.player}>
                <TableHead scope="row" className="whitespace-normal font-normal">
                  <span className="flex items-center gap-2">
                    <PlayerPhoto id={l.player} className="size-7 rounded-full" />
                    <span>
                      <PlayerLink id={l.player}>{playerName(l.player)}</PlayerLink>
                      {g.mvp === l.player && <MvpMark />}
                    </span>
                  </span>
                </TableHead>
                <BoxCells t={lineTotals(l)} />
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableHead scope="row">Σύνολο</TableHead>
              <BoxCells t={t} />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
}

/* ---------- players ---------- */

type Mode = "avg" | "tot";
type ColKey = "gp" | "min" | "pts" | "eff" | "reb" | "ast" | "stl" | "blk" | "tov" | "p2" | "p3" | "pft" | "mvp";
const COLS: { key: ColKey; s: string; t: string; pct?: boolean }[] = [
  { key: "gp", s: "ΑΓ", t: "Αγώνες" },
  { key: "min", s: "ΛΕΠ", t: "Λεπτά" },
  { key: "pts", s: "ΠΟΝ", t: "Πόντοι" },
  { key: "eff", s: "EFF", t: "Αξιολόγηση (efficiency)" },
  { key: "reb", s: "ΡΙΜ", t: "Ριμπάουντ" },
  { key: "ast", s: "ΑΣ", t: "Ασίστ" },
  { key: "stl", s: "ΚΛ", t: "Κλεψίματα" },
  { key: "blk", s: "ΚΟ", t: "Κοψίματα" },
  { key: "tov", s: "ΛΑ", t: "Λάθη" },
  { key: "p2", s: "2Π%", t: "Ποσοστό δίποντων", pct: true },
  { key: "p3", s: "3Π%", t: "Ποσοστό τρίποντων", pct: true },
  { key: "pft", s: "ΒΟΛ%", t: "Ποσοστό βολών", pct: true },
  { key: "mvp", s: "MVP", t: "Βραβεία MVP αγώνα" },
];
function colValue(r: SeasonRow, k: ColKey, mode: Mode): number | null {
  if (k === "gp") return r.gp;
  if (k === "mvp") return r.mvps;
  if (k === "p2") return pctVal(r.t.fg2m, r.t.fg2a);
  if (k === "p3") return pctVal(r.t.fg3m, r.t.fg3a);
  if (k === "pft") return pctVal(r.t.ftm, r.t.fta);
  const v = r.t[k];
  if (mode === "tot") return r.gp ? v : null;
  return r.gp ? v / r.gp : null;
}
function fmtCol(v: number | null, k: ColKey, mode: Mode) {
  if (v === null) return "–";
  const c = COLS.find((c) => c.key === k)!;
  if (c.pct) return fmtPct(v);
  if (k === "gp" || k === "mvp" || mode === "tot") return String(v);
  return fmtAvg(v);
}

function RosterGrid() {
  return (
    <section aria-labelledby="roster-h">
      <h2 id="roster-h" className="mb-3 text-base font-semibold">
        Ρόστερ <span className="font-normal text-muted-foreground">({rosterByName.length})</span>
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {rosterByName.map((r) => (
          <li key={r.id}>
            <PlayerLink
              id={r.id}
              className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card hover:no-underline hover:border-primary"
            >
              <PlayerPhoto id={r.id} className="aspect-square w-full" />
              <span className="flex flex-col p-2.5">
                <span className="text-xs text-muted-foreground">{r.firstName}</span>
                <span className="font-semibold leading-tight group-hover:underline">{r.lastName}</span>
                <span className="mt-1 text-xs tabular-nums">
                  {r.gp > 0 ? `${fmtAvg(r.t.pts / r.gp)} πόντοι · ${r.gp} αγ.` : "Χωρίς συμμετοχή"}
                </span>
              </span>
            </PlayerLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PlayersView() {
  const [mode, setMode] = useState<Mode>("avg");
  const [sort, setSort] = useState<{ key: ColKey; dir: "desc" | "asc" }>({ key: "pts", dir: "desc" });
  const rows = useMemo(() => {
    const r = [...seasonRows];
    r.sort((a, b) => {
      const va = colValue(a, sort.key, mode) ?? -Infinity;
      const vb = colValue(b, sort.key, mode) ?? -Infinity;
      return sort.dir === "desc" ? vb - va : va - vb;
    });
    return r;
  }, [mode, sort]);

  return (
    <div className="flex flex-col gap-6">
      <RosterGrid />
      <section aria-labelledby="players-h" className="rounded-lg border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
          <h2 id="players-h" className="text-base font-semibold">
            {mode === "avg" ? "Μέσοι όροι ανά αγώνα" : "Σύνολα σεζόν"}
          </h2>
          <div role="group" aria-label="Τρόπος προβολής" className="flex gap-1 rounded-md bg-muted p-1">
            {(["avg", "tot"] as Mode[]).map((m) => (
              <Button key={m} size="sm" variant={mode === m ? "default" : "ghost"} aria-pressed={mode === m} onClick={() => setMode(m)}>
                {m === "avg" ? "Μέσοι όροι" : "Σύνολα"}
              </Button>
            ))}
          </div>
        </div>
        <div role="region" aria-label="Πίνακας παικτών" tabIndex={0} className="p-2">
          <Table>
            <caption className="sr-only">
              Στατιστικά παικτών σεζόν, ταξινόμηση κατά {COLS.find((c) => c.key === sort.key)!.t}
            </caption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Παίκτης</TableHead>
                {COLS.map((c) => {
                  const active = sort.key === c.key;
                  return (
                    <TableHead
                      key={c.key}
                      scope="col"
                      className={numCell}
                      aria-sort={active ? (sort.dir === "desc" ? "descending" : "ascending") : "none"}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setSort(active ? { key: c.key, dir: sort.dir === "desc" ? "asc" : "desc" } : { key: c.key, dir: "desc" })
                        }
                        className={cn(
                          "inline-flex items-center gap-0.5 rounded-sm px-1 hover:underline focus-visible:outline-2 focus-visible:outline-ring",
                          active && "font-semibold text-primary",
                        )}
                      >
                        <A s={c.s} t={c.t} />
                        {active &&
                          (sort.dir === "desc" ? (
                            <ArrowDown className="size-3.5" aria-hidden="true" />
                          ) : (
                            <ArrowUp className="size-3.5" aria-hidden="true" />
                          ))}
                      </button>
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableHead scope="row" className="whitespace-normal font-normal">
                    <span className="flex items-center gap-2">
                      <PlayerPhoto id={r.id} className="size-7 rounded-full" />
                      <PlayerLink id={r.id}>{r.name}</PlayerLink>
                    </span>
                  </TableHead>
                  {COLS.map((c) => (
                    <TableCell key={c.key} className={cn(numCell, c.key === sort.key && "font-semibold")}>
                      {fmtCol(colValue(r, c.key, mode), c.key, mode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}

/* ---------- team ---------- */

function splitRow(label: string, list: Game[]) {
  const n = list.length;
  const w = list.filter(isWin).length;
  const t = sum(list.map(gameTotals));
  const pf = list.reduce((a, g) => a + g.teamScore, 0);
  const pa = list.reduce((a, g) => a + g.oppScore, 0);
  return { label, n, w, l: n - w, t, pf, pa };
}

function TeamView() {
  const splits = [
    splitRow("Σύνολο", sortedGames),
    splitRow("Εντός έδρας", sortedGames.filter((g) => g.venue === "home")),
    splitRow("Εκτός έδρας", sortedGames.filter((g) => g.venue === "away")),
    splitRow("Σε νίκες", sortedGames.filter(isWin)),
    splitRow("Σε ήττες", sortedGames.filter((g) => !isWin(g))),
  ];
  const avg = (v: number, n: number) => (n ? fmtAvg(v / n) : "–");
  const cats: { title: string; get: (r: SeasonRow) => number; total?: boolean }[] = [
    { title: "Πόντοι", get: (r) => r.t.pts / r.gp },
    { title: "EFF", get: (r) => r.t.eff / r.gp },
    { title: "Ριμπάουντ", get: (r) => r.t.reb / r.gp },
    { title: "Ασίστ", get: (r) => r.t.ast / r.gp },
    { title: "Κλεψίματα", get: (r) => r.t.stl / r.gp },
    { title: "Εύστοχα τρίποντα", get: (r) => r.t.fg3m, total: true },
  ];
  const active = seasonRows.filter((r) => r.gp > 0);

  return (
    <div className="flex flex-col gap-6">
      <section aria-labelledby="splits-h" className="rounded-lg border bg-card">
        <h2 id="splits-h" className="border-b p-4 text-base font-semibold">
          Μέσοι όροι ομάδας ανά αγώνα
        </h2>
        <div role="region" aria-label="Μέσοι όροι ομάδας" tabIndex={0} className="p-2">
          <Table>
            <caption className="sr-only">Μέσοι όροι ομάδας ανά αγώνα, συνολικά και ανά κατηγορία αγώνων</caption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Αγώνες</TableHead>
                <TableHead scope="col" className={numCell}><A s="ΑΓ" t="Αριθμός αγώνων" /></TableHead>
                <TableHead scope="col" className={numCell}>Ρεκόρ</TableHead>
                <TableHead scope="col" className={numCell}><A s="ΥΠΕΡ" t="Πόντοι υπέρ" /></TableHead>
                <TableHead scope="col" className={numCell}><A s="ΚΑΤΑ" t="Πόντοι κατά" /></TableHead>
                <TableHead scope="col" className={numCell}><A s="ΔΙΑΦ" t="Μέση διαφορά" /></TableHead>
                <TableHead scope="col" className={numCell}><A s="EFF" t="Αξιολόγηση (efficiency)" /></TableHead>
                <TableHead scope="col" className={numCell}><A s="ΡΙΜ" t="Ριμπάουντ" /></TableHead>
                <TableHead scope="col" className={numCell}><A s="ΑΣ" t="Ασίστ" /></TableHead>
                <TableHead scope="col" className={numCell}><A s="ΚΛ" t="Κλεψίματα" /></TableHead>
                <TableHead scope="col" className={numCell}><A s="ΛΑ" t="Λάθη" /></TableHead>
                <TableHead scope="col" className={numCell}><A s="2Π%" t="Ποσοστό δίποντων" /></TableHead>
                <TableHead scope="col" className={numCell}><A s="3Π%" t="Ποσοστό τρίποντων" /></TableHead>
                <TableHead scope="col" className={numCell}><A s="ΒΟΛ%" t="Ποσοστό βολών" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {splits.map((s) => {
                const diff = s.n ? (s.pf - s.pa) / s.n : 0;
                return (
                  <TableRow key={s.label}>
                    <TableHead scope="row" className="whitespace-normal">{s.label}</TableHead>
                    <TableCell className={numCell}>{s.n}</TableCell>
                    <TableCell className={numCell}>{s.w}–{s.l}</TableCell>
                    <TableCell className={cn(numCell, "font-semibold")}>{avg(s.pf, s.n)}</TableCell>
                    <TableCell className={numCell}>{avg(s.pa, s.n)}</TableCell>
                    <TableCell className={numCell}>{s.n ? (diff > 0 ? "+" : diff < 0 ? "−" : "") + fmtAvg(Math.abs(diff)) : "–"}</TableCell>
                    <TableCell className={numCell}>{avg(s.t.eff, s.n)}</TableCell>
                    <TableCell className={numCell}>{avg(s.t.reb, s.n)}</TableCell>
                    <TableCell className={numCell}>{avg(s.t.ast, s.n)}</TableCell>
                    <TableCell className={numCell}>{avg(s.t.stl, s.n)}</TableCell>
                    <TableCell className={numCell}>{avg(s.t.tov, s.n)}</TableCell>
                    <TableCell className={numCell}>{fmtPct(pctVal(s.t.fg2m, s.t.fg2a))}</TableCell>
                    <TableCell className={numCell}>{fmtPct(pctVal(s.t.fg3m, s.t.fg3a))}</TableCell>
                    <TableCell className={numCell}>{fmtPct(pctVal(s.t.ftm, s.t.fta))}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </section>

      <section aria-labelledby="leaders-h">
        <h2 id="leaders-h" className="mb-3 flex items-center gap-2 text-base font-semibold">
          <Trophy className="size-4" aria-hidden="true" />
          Πρώτοι της ομάδας
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((c) => {
            const top = [...active].sort((a, b) => c.get(b) - c.get(a)).slice(0, 3);
            return (
              <div key={c.title} className="rounded-lg border bg-card p-4">
                <h3 className="text-sm font-semibold">
                  {c.title} <span className="font-normal text-muted-foreground">{c.total ? "σύνολο" : "ανά αγώνα"}</span>
                </h3>
                <ol className="mt-2 divide-y divide-border">
                  {top.map((r, i) => (
                    <li key={r.id} className="flex items-center gap-3 py-1.5 text-sm">
                      <span className="w-4 tabular-nums text-muted-foreground">{i + 1}</span>
                      <PlayerPhoto id={r.id} className="size-7 rounded-full" />
                      <span className="min-w-0 flex-1 break-words">
                        <PlayerLink id={r.id}>{r.name}</PlayerLink>{" "}
                        <span className="text-muted-foreground">({r.gp} αγ.)</span>
                      </span>
                      <span className={cn("tabular-nums", i === 0 ? "text-base font-semibold" : "font-medium")}>
                        {c.total ? c.get(r) : fmtAvg(c.get(r))}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* ---------- page ---------- */

type View = "games" | "players" | "team";
const VIEWS: View[] = ["games", "players", "team"];

export function HomePage() {
  const [params, setParams] = useSearchParams();
  const tabParam = params.get("tab") as View | null;
  const view: View = tabParam && VIEWS.includes(tabParam) ? tabParam : "games";
  const [gameId, setGameId] = useState(sortedGames[sortedGames.length - 1]?.id ?? "");
  const game = sortedGames.find((g) => g.id === gameId);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6">
      <Tabs
        value={view}
        onValueChange={(v) => setParams(v === "games" ? {} : { tab: v }, { replace: true })}
        className="gap-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">Στατιστικά</h1>
          <TabsList aria-label="Ενότητες">
            <TabsTrigger value="games" className="px-3">Αγώνες</TabsTrigger>
            <TabsTrigger value="players" className="px-3">Παίκτες</TabsTrigger>
            <TabsTrigger value="team" className="px-3">Ομάδα</TabsTrigger>
          </TabsList>
        </div>
        <div id="content" tabIndex={-1} className="outline-none">
          <TabsContent value="games" className="flex flex-col gap-6">
            {sortedGames.length === 0 || !game ? (
              <p className="rounded-lg border bg-card p-6 text-sm">Δεν υπάρχουν ακόμη αγώνες.</p>
            ) : (
              <>
                <ResultsStrip selected={gameId} onSelect={setGameId} />
                <BoxScore g={game} />
              </>
            )}
          </TabsContent>
          <TabsContent value="players">
            <PlayersView />
          </TabsContent>
          <TabsContent value="team">
            <TeamView />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
