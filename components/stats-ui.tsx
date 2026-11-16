import { Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { playerPhotos, teamLogo } from "@/data/photos";
import { TEAM_NAME, type Game } from "@/data/season";
import { cn } from "@/lib/utils";
import { isWin, shot, type Totals } from "@/lib/stats";

export const numCell = "text-right tabular-nums";

export function A({ s, t }: { s: string; t: string }) {
  return (
    <abbr title={t} className="no-underline">
      {s}
    </abbr>
  );
}

export function ResultBadge({ g }: { g: Game }) {
  const win = isWin(g);
  return (
    <Badge
      className={cn(
        "border-transparent text-white",
        win ? "bg-green-700 dark:bg-green-800" : "bg-red-700 dark:bg-red-800",
      )}
    >
      {win ? "Νίκη" : "Ήττα"}
    </Badge>
  );
}

export function MvpMark() {
  return (
    <span className="ml-1.5 inline-flex items-center gap-0.5 align-middle text-xs font-semibold">
      <Award className="size-3.5" aria-hidden="true" />
      MVP
    </span>
  );
}

/** Player photo, or the team logo when the player has none. Decorative unless `alt` is given. */
export function PlayerPhoto({ id, className, alt = "" }: { id: string; className?: string; alt?: string }) {
  const photo = playerPhotos[id];
  return (
    <span className={cn("block shrink-0 overflow-hidden bg-muted", className)}>
      {photo ? (
        <img src={photo} alt={alt} loading="lazy" className="size-full object-cover object-top" />
      ) : (
        <img src={teamLogo} alt={alt ? `Σήμα ${TEAM_NAME}` : ""} loading="lazy" className="size-full object-contain p-[12%]" />
      )}
    </span>
  );
}

export function PlayerLink({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      to={`/players/${id}`}
      className={cn("rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-ring", className)}
    >
      {children}
    </Link>
  );
}

export function BoxHeader({ first }: { first: string }) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead scope="col">{first}</TableHead>
        <TableHead scope="col" className={numCell}><A s="ΛΕΠ" t="Λεπτά" /></TableHead>
        <TableHead scope="col" className={numCell}><A s="ΠΟΝ" t="Πόντοι" /></TableHead>
        <TableHead scope="col" className={numCell}><A s="EFF" t="Αξιολόγηση (efficiency)" /></TableHead>
        <TableHead scope="col" className={numCell}><A s="2Π" t="Δίποντα εύστοχα/προσπάθειες" /></TableHead>
        <TableHead scope="col" className={numCell}><A s="3Π" t="Τρίποντα εύστοχα/προσπάθειες" /></TableHead>
        <TableHead scope="col" className={numCell}><A s="ΒΟΛ" t="Βολές εύστοχες/προσπάθειες" /></TableHead>
        <TableHead scope="col" className={numCell}><A s="ΕΠ" t="Επιθετικά ριμπάουντ" /></TableHead>
        <TableHead scope="col" className={numCell}><A s="ΑΜ" t="Αμυντικά ριμπάουντ" /></TableHead>
        <TableHead scope="col" className={numCell}><A s="ΡΙΜ" t="Συνολικά ριμπάουντ" /></TableHead>
        <TableHead scope="col" className={numCell}><A s="ΑΣ" t="Ασίστ" /></TableHead>
        <TableHead scope="col" className={numCell}><A s="ΚΛ" t="Κλεψίματα" /></TableHead>
        <TableHead scope="col" className={numCell}><A s="ΚΟ" t="Κοψίματα" /></TableHead>
        <TableHead scope="col" className={numCell}><A s="ΛΑ" t="Λάθη" /></TableHead>
      </TableRow>
    </TableHeader>
  );
}

export const BOX_COLS = 13;

export function BoxCells({ t }: { t: Totals }) {
  return (
    <>
      <TableCell className={numCell}>{t.min}</TableCell>
      <TableCell className={cn(numCell, "font-semibold")}>{t.pts}</TableCell>
      <TableCell className={numCell}>{t.eff}</TableCell>
      <TableCell className={numCell}>{shot(t.fg2m, t.fg2a)}</TableCell>
      <TableCell className={numCell}>{shot(t.fg3m, t.fg3a)}</TableCell>
      <TableCell className={numCell}>{shot(t.ftm, t.fta)}</TableCell>
      <TableCell className={numCell}>{t.oreb}</TableCell>
      <TableCell className={numCell}>{t.dreb}</TableCell>
      <TableCell className={numCell}>{t.reb}</TableCell>
      <TableCell className={numCell}>{t.ast}</TableCell>
      <TableCell className={numCell}>{t.stl}</TableCell>
      <TableCell className={numCell}>{t.blk}</TableCell>
      <TableCell className={numCell}>{t.tov}</TableCell>
    </>
  );
}
