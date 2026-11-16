import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@/components/ui/table";
import { BOX_COLS, BoxCells, BoxHeader, MvpMark, PlayerPhoto, ResultBadge } from "@/components/stats-ui";
import { SEASON, TEAM_NAME } from "@/data/season";
import {
  fmtAvg,
  fmtPct,
  lineTotals,
  pctVal,
  pts,
  rosterByName,
  shortDate,
  shortOpp,
  sortedGames,
  toDate,
} from "@/lib/stats";

const ptsChart = { pts: { label: "Πόντοι", color: "var(--chart-1)" } } satisfies ChartConfig;

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-2xl font-semibold tabular-nums leading-tight">{value}</dd>
      {sub && <dd className="text-xs tabular-nums text-muted-foreground">{sub}</dd>}
    </div>
  );
}

export function PlayerPage() {
  const { playerId = "" } = useParams();
  const idx = rosterByName.findIndex((r) => r.id === playerId);
  const row = idx >= 0 ? rosterByName[idx] : undefined;
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    headingRef.current?.focus();
  }, [playerId]);

  if (!row) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold">Ο παίκτης δεν βρέθηκε</h1>
        <Link to="/?tab=players" className="mt-4 inline-flex items-center gap-1 text-primary underline">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Όλοι οι παίκτες
        </Link>
      </div>
    );
  }

  const prev = rosterByName[(idx - 1 + rosterByName.length) % rosterByName.length];
  const next = rosterByName[(idx + 1) % rosterByName.length];
  const log = sortedGames.map((g) => ({ g, l: g.lines.find((x) => x.player === row.id) }));
  const played = log.filter((x) => x.l);
  const chartData = played.map(({ g, l }) => ({ label: shortOpp(g.opponent), pts: pts(l!) }));
  const best = played.reduce<{ opp: string; p: number } | null>((b, { g, l }) => {
    const p = pts(l!);
    return !b || p > b.p ? { opp: g.opponent, p } : b;
  }, null);
  const gp = row.gp || 1;
  const t = row.t;
  const per = (v: number) => fmtAvg(v / gp);

  const profile: [string, string][] = [
    ["Ύψος", row.height ? `${row.height.replace(".", ",")} μ.` : "–"],
    ["Ηλικία", row.age ? String(row.age) : "–"],
    ["Σεζόν στο Basketaki", row.seasons.join(", ")],
  ];
  if (row.previousTeams.length) profile.push(["Προηγούμενες ομάδες", row.previousTeams.join(", ")]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6">
      <nav aria-label="Πλοήγηση παικτών" className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm">
        <Link to="/?tab=players" className="inline-flex items-center gap-1 rounded-sm font-medium hover:underline focus-visible:outline-2 focus-visible:outline-ring">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Όλοι οι παίκτες
        </Link>
        <span className="flex gap-4">
          <Link to={`/players/${prev.id}`} className="inline-flex items-center gap-1 rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-ring">
            <ChevronLeft className="size-4" aria-hidden="true" />
            <span><span className="sr-only">Προηγούμενος: </span>{prev.name}</span>
          </Link>
          <Link to={`/players/${next.id}`} className="inline-flex items-center gap-1 rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-ring">
            <span><span className="sr-only">Επόμενος: </span>{next.name}</span>
            <ChevronRight className="size-4" aria-hidden="true" />
          </Link>
        </span>
      </nav>

      <div id="content" tabIndex={-1} className="flex flex-col gap-6 outline-none">
        <section aria-labelledby="player-h" className="grid gap-6 rounded-lg border bg-card p-4 sm:p-6 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
          <PlayerPhoto
            id={row.id}
            alt={`Φωτογραφία: ${row.name}`}
            className="aspect-square w-full max-w-[240px] rounded-lg"
          />
          <div className="flex min-w-0 flex-col gap-5">
            <div>
              <p className="text-lg">{row.firstName}</p>
              <h1 ref={headingRef} id="player-h" tabIndex={-1} className="text-4xl font-bold leading-none tracking-tight outline-none">
                {row.lastName}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {TEAM_NAME}
                {row.mvps > 0 && (
                  <>
                    {" · "}
                    <MvpMark /> {row.mvps}× φέτος
                  </>
                )}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
              {profile.map(([k, v]) => (
                <div key={k} className="min-w-0">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium break-words">{v}</dd>
                </div>
              ))}
            </dl>
            <div>
              <h2 className="mb-2 text-sm font-semibold">Καριέρα στο Basketaki · μέσοι όροι</h2>
              <dl className="flex flex-wrap gap-x-8 gap-y-2">
                <Stat label="Πόντοι" value={fmtAvg(row.career.pts)} />
                <Stat label="EFF" value={fmtAvg(row.career.eff)} />
                <Stat label="Ριμπάουντ" value={fmtAvg(row.career.reb)} />
              </dl>
            </div>
          </div>
        </section>

        <section aria-labelledby="season-h" className="rounded-lg border bg-card">
          <h2 id="season-h" className="border-b p-4 text-base font-semibold">
            {SEASON} <span className="font-normal text-muted-foreground">· {row.gp} από {sortedGames.length} αγώνες</span>
          </h2>
          {row.gp === 0 ? (
            <p className="p-4 text-sm">Δεν έχει αγωνιστεί ακόμη φέτος.</p>
          ) : (
            <>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-b p-4 sm:grid-cols-4 lg:grid-cols-8">
                <Stat label="Πόντοι" value={per(t.pts)} sub={`${t.pts} σύνολο`} />
                <Stat label="EFF" value={per(t.eff)} sub={`${t.eff} σύνολο`} />
                <Stat label="Ριμπάουντ" value={per(t.reb)} sub={`${t.oreb} επ. · ${t.dreb} αμ.`} />
                <Stat label="Ασίστ" value={per(t.ast)} sub={`${t.ast} σύνολο`} />
                <Stat label="Κλεψίματα" value={per(t.stl)} sub={`${t.stl} σύνολο`} />
                <Stat label="Λεπτά" value={per(t.min)} sub={`${t.min} σύνολο`} />
                <Stat label="2Π%" value={fmtPct(pctVal(t.fg2m, t.fg2a))} sub={`${t.fg2m}/${t.fg2a}`} />
                <Stat label="3Π%" value={fmtPct(pctVal(t.fg3m, t.fg3a))} sub={`${t.fg3m}/${t.fg3a}`} />
                <Stat label="Βολές%" value={fmtPct(pctVal(t.ftm, t.fta))} sub={`${t.ftm}/${t.fta}`} />
                <Stat label="Κοψίματα" value={per(t.blk)} sub={`${t.blk} σύνολο`} />
                <Stat label="Λάθη" value={per(t.tov)} sub={`${t.tov} σύνολο`} />
              </dl>

              <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
                <div className="rounded-lg border bg-card p-4">
                  <h3 className="text-sm font-semibold">Πόντοι ανά αγώνα</h3>
                  <p className="text-sm text-muted-foreground">
                    Μ.Ο. {per(t.pts)}
                    {best && ` · μέγιστο ${best.p} με ${best.opp}`}
                  </p>
                  <div aria-hidden="true" className="mt-2">
                    <ChartContainer config={ptsChart} className="aspect-auto h-44">
                      <BarChart data={chartData} accessibilityLayer={false} margin={{ left: -16, right: 4 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={11} />
                        <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={36} fontSize={11} />
                        <Bar dataKey="pts" fill="var(--color-pts)" radius={3} isAnimationActive={false} />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </div>
                <div role="region" aria-label={`Αγώνες ${row.name}`} tabIndex={0} className="min-w-0">
                  <Table>
                    <caption className="sr-only">Στατιστικά ανά αγώνα για {row.name}</caption>
                    <BoxHeader first="Αγώνας" />
                    <TableBody>
                      {log.map(({ g, l }) => (
                        <TableRow key={g.id}>
                          <TableHead scope="row" className="whitespace-normal font-normal">
                            <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                              <span className="tabular-nums">{shortDate.format(toDate(g.date))}</span>
                              <span>{g.venue === "home" ? "vs" : "@"} {g.opponent}</span>
                              <ResultBadge g={g} />
                              {g.mvp === row.id && <MvpMark />}
                            </span>
                          </TableHead>
                          {l ? (
                            <BoxCells t={lineTotals(l)} />
                          ) : (
                            <TableCell colSpan={BOX_COLS} className="text-muted-foreground">
                              Δεν αγωνίστηκε
                            </TableCell>
                          )}
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
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
