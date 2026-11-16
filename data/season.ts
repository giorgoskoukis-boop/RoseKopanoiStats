// The Rose Copanoi — Winter Progress League 26/27.
// Source: basketaki.com "Player Stats" per game. To add a game, append one object to `games`.
// Points are computed from made shots (2×2P + 3×3P + FT).

/** Profile as shown on the player's basketaki.com page. */
export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string; // as written on basketaki.com
  height?: string; // metres, e.g. "1.80"
  age?: number;
  previousTeams: string[];
  seasons: string[]; // seasons with the team on basketaki.com
  /** Career averages per game on basketaki.com (all competitions). */
  career: { eff: number; pts: number; reb: number };
}

export interface PlayerLine {
  player: string; // Player.id
  min: number;
  eff: number;
  fg2m: number;
  fg2a: number;
  fg3m: number;
  fg3a: number;
  ftm: number;
  fta: number;
  oreb: number;
  dreb: number;
  ast: number;
  stl: number;
  tov: number;
  blk: number;
}

export interface Game {
  id: string;
  round: number;
  date: string; // YYYY-MM-DD
  opponent: string;
  venue: "home" | "away";
  teamScore: number;
  oppScore: number;
  mvp?: string; // Player.id
  /** Points per quarter; a 5th entry is overtime. */
  quarters?: { team: number[]; opp: number[] };
  lines: PlayerLine[];
}

export const TEAM_NAME = "The Rose Copanoi";
export const SEASON = "Winter Progress League 26/27";

export const roster: Player[] = [
  {
    id: "athanasiadis", firstName: "Ιωάννης", lastName: "Αθανασιάδης", fullName: "Αθανασιάδης Μιχ. Ιωάννης",
    height: "1.80", age: 34, previousTeams: [],
    seasons: ["25/26", "26/27"],
    career: { eff: 9.4, pts: 10.1, reb: 5.5 },
  },
  {
    id: "vlachos", firstName: "Αχιλλεύς", lastName: "Βλάχος", fullName: "Βλάχος Γεώ. Αχιλλεύς",
    age: 48, previousTeams: ["Leontario BC"],
    seasons: ["21/22", "22/23", "23/24", "24/25", "25/26", "26/27"],
    career: { eff: 10.1, pts: 10.2, reb: 7.8 },
  },
  {
    id: "giannopoulos", firstName: "Πέτρος", lastName: "Γιαννόπουλος", fullName: "Γιαννόπουλος Σπύ. Πέτρος",
    height: "1.82", age: 35, previousTeams: [],
    seasons: ["24/25", "25/26", "26/27"],
    career: { eff: 8.4, pts: 9.9, reb: 4.6 },
  },
  {
    id: "giataganas", firstName: "Δημήτριος", lastName: "Γιαταγάνας", fullName: "Γιαταγάνας Αθα. Δημήτριος",
    height: "1.80", age: 35, previousTeams: [],
    seasons: ["24/25", "25/26", "26/27"],
    career: { eff: 3.9, pts: 3.0, reb: 3.6 },
  },
  {
    id: "katsampekis", firstName: "Αριστείδης", lastName: "Κατσαμπέκης", fullName: "Κατσαμπέκης Κων. Αριστείδης",
    height: "1.90", age: 44, previousTeams: ["Komodo Dragons"],
    seasons: ["23/24", "24/25", "25/26", "26/27"],
    career: { eff: 21.2, pts: 15.7, reb: 10.3 },
  },
  {
    id: "katsiadramis", firstName: "Νικόλαος", lastName: "Κατσιαδράμης", fullName: "Κατσιαδράμης Ιωά. Νικόλαος",
    height: "1.85", age: 42, previousTeams: [],
    seasons: ["24/25", "25/26"],
    career: { eff: 7.0, pts: 6.5, reb: 4.6 },
  },
  {
    id: "kolovos", firstName: "Κωνσταντίνος", lastName: "Κολοβός", fullName: "Κολοβός Γεώ. Κωνσταντίνος",
    height: "1.86", age: 41, previousTeams: [],
    seasons: ["24/25", "25/26", "26/27"],
    career: { eff: 6.1, pts: 8.8, reb: 3.3 },
  },
  {
    id: "koukis", firstName: "Γεώργιος", lastName: "Κουκής", fullName: "Κουκής Στα. Γεώργιος",
    height: "1.93", age: 52, previousTeams: [],
    seasons: ["25/26", "26/27"],
    career: { eff: 10.3, pts: 11.5, reb: 6.6 },
  },
  {
    id: "kostopoulos", firstName: "Κωνσταντίνος", lastName: "Κωστόπουλος", fullName: "Κωστόπουλος Λεν. Κωνσταντίνος",
    age: 44, previousTeams: ["Mad Frogs"],
    seasons: ["19/20", "20/21", "21/22", "22/23", "25/26", "26/27"],
    career: { eff: 3.9, pts: 6.4, reb: 3.0 },
  },
  {
    id: "leivadas", firstName: "Εμμανουήλ", lastName: "Λειβαδάς", fullName: "Λειβαδάς Χαρ. Εμμανουήλ",
    height: "1.83", age: 42, previousTeams: [],
    seasons: ["24/25", "25/26", "26/27"],
    career: { eff: 9.8, pts: 5.9, reb: 7.7 },
  },
  {
    id: "maltezos", firstName: "Ιωάννης", lastName: "Μαλτέζος", fullName: "Μαλτέζος Ευά. Ιωάννης",
    height: "1.96", age: 38, previousTeams: ["Ellinoroston Celtics"],
    seasons: ["22/23", "23/24", "24/25", "26/27"],
    career: { eff: 8.9, pts: 9.2, reb: 10.5 },
  },
  {
    id: "manikas", firstName: "Ιωάννης", lastName: "Μανίκας", fullName: "Μανίκας Γεώ. Ιωάννης",
    age: 46, previousTeams: ["Smokin' Aces"],
    seasons: ["19/20", "21/22", "24/25", "25/26", "26/27"],
    career: { eff: 4.9, pts: 5.4, reb: 4.9 },
  },
  {
    id: "nikolaidis", firstName: "Νικόλαος", lastName: "Νικολαΐδης", fullName: "Νικολαΐδης Παύ. Νικόλαος",
    height: "1.94", age: 52, previousTeams: ["Brooklyn Bets"],
    seasons: ["23/24", "24/25", "25/26", "26/27"],
    career: { eff: 5.9, pts: 4.3, reb: 5.2 },
  },
  {
    id: "papalevyzakis", firstName: "Δημήτριος", lastName: "Παπαλεβυζάκης", fullName: "Παπαλεβυζάκης Παν. Δημήτριος",
    height: "1.83", age: 49, previousTeams: [],
    seasons: ["26/27"],
    career: { eff: 2.0, pts: 0.0, reb: 1.0 },
  },
  {
    id: "spafarov", firstName: "Άγγελος", lastName: "Σπαφάροβ", fullName: "Σπαφάροβ Ιωά. Άγγελος",
    height: "1.80", age: 23, previousTeams: [],
    seasons: ["25/26", "26/27"],
    career: { eff: 5.5, pts: 4.6, reb: 3.0 },
  },
  {
    id: "sterpis", firstName: "Άγγελος", lastName: "Στερπης", fullName: "Στερπης Παν. Άγγελος",
    height: "1.74", age: 39, previousTeams: ["Flint Tropics"],
    seasons: ["25/26", "26/27"],
    career: { eff: -0.5, pts: 0.3, reb: 1.2 },
  },
  {
    id: "chalavatzis", firstName: "Γεώργιος", lastName: "Χαλαβατζής", fullName: "Χαλαβατζής Ματ. Γεώργιος",
    height: "1.76", age: 38, previousTeams: ["Brooklyn Bets"],
    seasons: ["23/24", "24/25", "25/26", "26/27"],
    career: { eff: 7.7, pts: 8.6, reb: 4.3 },
  },
];

export const games: Game[] = [
  {
    id: "g1",
    round: 1,
    date: "2026-09-19",
    opponent: "West Dozers",
    venue: "home",
    teamScore: 80,
    oppScore: 69,
    mvp: "katsampekis",
    lines: [
      { player: "athanasiadis", min: 23, eff: -1, fg2m: 1, fg2a: 2, fg3m: 1, fg3a: 7, ftm: 0, fta: 0, oreb: 0, dreb: 1, ast: 0, stl: 0, tov: 0, blk: 0 },
      { player: "vlachos", min: 22, eff: 15, fg2m: 3, fg2a: 5, fg3m: 1, fg3a: 6, ftm: 4, fta: 6, oreb: 4, dreb: 6, ast: 1, stl: 1, tov: 1, blk: 0 },
      { player: "giannopoulos", min: 15, eff: 5, fg2m: 3, fg2a: 6, fg3m: 0, fg3a: 1, ftm: 0, fta: 2, oreb: 0, dreb: 0, ast: 2, stl: 4, tov: 1, blk: 0 },
      { player: "katsampekis", min: 25, eff: 32, fg2m: 8, fg2a: 14, fg3m: 2, fg3a: 3, ftm: 7, fta: 8, oreb: 3, dreb: 6, ast: 1, stl: 1, tov: 1, blk: 1 },
      { player: "koukis", min: 26, eff: 14, fg2m: 3, fg2a: 5, fg3m: 2, fg3a: 4, ftm: 4, fta: 6, oreb: 0, dreb: 2, ast: 2, stl: 1, tov: 1, blk: 0 },
      { player: "kostopoulos", min: 24, eff: 0, fg2m: 0, fg2a: 2, fg3m: 0, fg3a: 3, ftm: 2, fta: 2, oreb: 0, dreb: 1, ast: 0, stl: 2, tov: 0, blk: 0 },
      { player: "leivadas", min: 14, eff: 2, fg2m: 1, fg2a: 5, fg3m: 0, fg3a: 0, ftm: 0, fta: 0, oreb: 0, dreb: 2, ast: 0, stl: 2, tov: 0, blk: 0 },
      { player: "manikas", min: 14, eff: 0, fg2m: 0, fg2a: 3, fg3m: 0, fg3a: 0, ftm: 0, fta: 0, oreb: 1, dreb: 3, ast: 1, stl: 0, tov: 2, blk: 0 },
      { player: "nikolaidis", min: 18, eff: 3, fg2m: 2, fg2a: 4, fg3m: 0, fg3a: 0, ftm: 1, fta: 2, oreb: 1, dreb: 0, ast: 1, stl: 1, tov: 2, blk: 0 },
      { player: "papalevyzakis", min: 4, eff: 2, fg2m: 0, fg2a: 0, fg3m: 0, fg3a: 0, ftm: 0, fta: 0, oreb: 0, dreb: 1, ast: 0, stl: 1, tov: 0, blk: 0 },
      { player: "chalavatzis", min: 42, eff: 8, fg2m: 1, fg2a: 1, fg3m: 0, fg3a: 3, ftm: 0, fta: 0, oreb: 0, dreb: 4, ast: 4, stl: 2, tov: 1, blk: 0 },
    ],
  },
  {
    id: "g2",
    round: 2,
    date: "2026-09-27",
    opponent: "Πάσα___Ρε",
    venue: "home",
    teamScore: 56,
    oppScore: 47,
    mvp: "katsampekis",
    lines: [
      { player: "vlachos", min: 10, eff: 8, fg2m: 1, fg2a: 2, fg3m: 2, fg3a: 4, ftm: 0, fta: 1, oreb: 3, dreb: 1, ast: 0, stl: 2, tov: 2, blk: 0 },
      { player: "giannopoulos", min: 16, eff: 7, fg2m: 1, fg2a: 4, fg3m: 0, fg3a: 1, ftm: 0, fta: 0, oreb: 0, dreb: 3, ast: 5, stl: 2, tov: 1, blk: 0 },
      { player: "giataganas", min: 19, eff: 1, fg2m: 0, fg2a: 1, fg3m: 1, fg3a: 4, ftm: 1, fta: 2, oreb: 0, dreb: 2, ast: 1, stl: 0, tov: 1, blk: 0 },
      { player: "katsampekis", min: 23, eff: 15, fg2m: 3, fg2a: 4, fg3m: 1, fg3a: 1, ftm: 2, fta: 2, oreb: 0, dreb: 6, ast: 1, stl: 1, tov: 3, blk: 0 },
      { player: "koukis", min: 23, eff: 6, fg2m: 3, fg2a: 5, fg3m: 0, fg3a: 6, ftm: 3, fta: 6, oreb: 1, dreb: 5, ast: 1, stl: 0, tov: 1, blk: 2 },
      { player: "kostopoulos", min: 12, eff: 0, fg2m: 2, fg2a: 5, fg3m: 0, fg3a: 1, ftm: 0, fta: 0, oreb: 0, dreb: 1, ast: 1, stl: 0, tov: 2, blk: 0 },
      { player: "leivadas", min: 18, eff: 7, fg2m: 2, fg2a: 6, fg3m: 0, fg3a: 0, ftm: 0, fta: 0, oreb: 2, dreb: 6, ast: 1, stl: 1, tov: 3, blk: 0 },
      { player: "manikas", min: 16, eff: 5, fg2m: 1, fg2a: 5, fg3m: 0, fg3a: 0, ftm: 0, fta: 1, oreb: 1, dreb: 7, ast: 0, stl: 0, tov: 1, blk: 1 },
      { player: "nikolaidis", min: 13, eff: 2, fg2m: 1, fg2a: 2, fg3m: 0, fg3a: 0, ftm: 0, fta: 0, oreb: 0, dreb: 1, ast: 0, stl: 0, tov: 0, blk: 0 },
      { player: "spafarov", min: 15, eff: 7, fg2m: 0, fg2a: 1, fg3m: 2, fg3a: 4, ftm: 1, fta: 2, oreb: 1, dreb: 0, ast: 0, stl: 3, tov: 0, blk: 0 },
      { player: "sterpis", min: 9, eff: 2, fg2m: 0, fg2a: 0, fg3m: 0, fg3a: 0, ftm: 0, fta: 0, oreb: 0, dreb: 1, ast: 1, stl: 0, tov: 0, blk: 0 },
      { player: "chalavatzis", min: 22, eff: 9, fg2m: 0, fg2a: 3, fg3m: 1, fg3a: 4, ftm: 0, fta: 0, oreb: 0, dreb: 5, ast: 8, stl: 1, tov: 2, blk: 0 },
    ],
  },
  {
    id: "g3",
    round: 3,
    date: "2026-10-11",
    opponent: "Chicago Trolls",
    venue: "away",
    teamScore: 61,
    oppScore: 51,
    mvp: "koukis",
    lines: [
      { player: "athanasiadis", min: 24, eff: 6, fg2m: 0, fg2a: 2, fg3m: 2, fg3a: 6, ftm: 2, fta: 4, oreb: 1, dreb: 6, ast: 1, stl: 2, tov: 4, blk: 0 },
      { player: "vlachos", min: 24, eff: 13, fg2m: 3, fg2a: 5, fg3m: 2, fg3a: 6, ftm: 1, fta: 1, oreb: 2, dreb: 5, ast: 0, stl: 0, tov: 1, blk: 0 },
      { player: "giannopoulos", min: 20, eff: 13, fg2m: 0, fg2a: 2, fg3m: 3, fg3a: 3, ftm: 0, fta: 0, oreb: 1, dreb: 4, ast: 1, stl: 3, tov: 3, blk: 0 },
      { player: "giataganas", min: 21, eff: -1, fg2m: 0, fg2a: 3, fg3m: 0, fg3a: 0, ftm: 0, fta: 0, oreb: 2, dreb: 0, ast: 0, stl: 0, tov: 0, blk: 0 },
      { player: "kolovos", min: 6, eff: -2, fg2m: 0, fg2a: 1, fg3m: 0, fg3a: 1, ftm: 0, fta: 0, oreb: 0, dreb: 0, ast: 0, stl: 0, tov: 0, blk: 0 },
      { player: "koukis", min: 27, eff: 17, fg2m: 8, fg2a: 16, fg3m: 1, fg3a: 5, ftm: 3, fta: 6, oreb: 2, dreb: 6, ast: 1, stl: 1, tov: 0, blk: 0 },
      { player: "kostopoulos", min: 16, eff: -2, fg2m: 0, fg2a: 3, fg3m: 0, fg3a: 2, ftm: 0, fta: 0, oreb: 1, dreb: 1, ast: 1, stl: 0, tov: 0, blk: 0 },
      { player: "leivadas", min: 15, eff: 8, fg2m: 2, fg2a: 6, fg3m: 0, fg3a: 0, ftm: 1, fta: 2, oreb: 4, dreb: 4, ast: 0, stl: 0, tov: 0, blk: 0 },
      { player: "manikas", min: 5, eff: -2, fg2m: 0, fg2a: 1, fg3m: 0, fg3a: 0, ftm: 0, fta: 0, oreb: 0, dreb: 0, ast: 0, stl: 0, tov: 1, blk: 0 },
      { player: "nikolaidis", min: 18, eff: 3, fg2m: 1, fg2a: 5, fg3m: 0, fg3a: 1, ftm: 2, fta: 2, oreb: 1, dreb: 2, ast: 1, stl: 1, tov: 1, blk: 0 },
      { player: "chalavatzis", min: 33, eff: 8, fg2m: 0, fg2a: 3, fg3m: 0, fg3a: 1, ftm: 0, fta: 2, oreb: 0, dreb: 3, ast: 7, stl: 4, tov: 1, blk: 1 },
    ],
  },
  {
    id: "g4",
    round: 4,
    date: "2026-10-17",
    opponent: "Sacramento Drinks",
    venue: "home",
    teamScore: 55,
    oppScore: 35,
    mvp: "katsampekis",
    quarters: { team: [14, 18, 4, 19], opp: [9, 8, 9, 9] },
    lines: [
      { player: "giannopoulos", min: 24, eff: 15, fg2m: 2, fg2a: 4, fg3m: 0, fg3a: 1, ftm: 0, fta: 0, oreb: 1, dreb: 8, ast: 3, stl: 3, tov: 1, blk: 0 },
      { player: "katsampekis", min: 33, eff: 20, fg2m: 3, fg2a: 10, fg3m: 2, fg3a: 3, ftm: 0, fta: 0, oreb: 4, dreb: 10, ast: 2, stl: 0, tov: 0, blk: 0 },
      { player: "koukis", min: 21, eff: 11, fg2m: 4, fg2a: 11, fg3m: 2, fg3a: 6, ftm: 2, fta: 6, oreb: 2, dreb: 8, ast: 0, stl: 1, tov: 1, blk: 0 },
      { player: "kostopoulos", min: 22, eff: 5, fg2m: 3, fg2a: 7, fg3m: 0, fg3a: 3, ftm: 2, fta: 2, oreb: 0, dreb: 3, ast: 1, stl: 0, tov: 0, blk: 0 },
      { player: "leivadas", min: 20, eff: 4, fg2m: 2, fg2a: 4, fg3m: 0, fg3a: 0, ftm: 0, fta: 0, oreb: 1, dreb: 1, ast: 1, stl: 0, tov: 1, blk: 0 },
      { player: "manikas", min: 19, eff: 0, fg2m: 1, fg2a: 3, fg3m: 0, fg3a: 0, ftm: 1, fta: 2, oreb: 0, dreb: 1, ast: 0, stl: 0, tov: 1, blk: 0 },
      { player: "nikolaidis", min: 23, eff: 8, fg2m: 2, fg2a: 4, fg3m: 0, fg3a: 0, ftm: 0, fta: 0, oreb: 0, dreb: 6, ast: 0, stl: 0, tov: 0, blk: 0 },
      { player: "sterpis", min: 11, eff: -1, fg2m: 0, fg2a: 2, fg3m: 0, fg3a: 1, ftm: 0, fta: 0, oreb: 0, dreb: 1, ast: 1, stl: 0, tov: 0, blk: 0 },
      { player: "chalavatzis", min: 27, eff: 3, fg2m: 0, fg2a: 2, fg3m: 1, fg3a: 4, ftm: 1, fta: 2, oreb: 0, dreb: 3, ast: 6, stl: 0, tov: 4, blk: 0 },
    ],
  },
  {
    id: "g5",
    round: 5,
    date: "2026-10-24",
    opponent: "Bronx Bournazi Ballers",
    venue: "away",
    teamScore: 59,
    oppScore: 52,
    mvp: "chalavatzis",
    lines: [
      { player: "athanasiadis", min: 24, eff: 11, fg2m: 0, fg2a: 2, fg3m: 2, fg3a: 6, ftm: 3, fta: 3, oreb: 2, dreb: 3, ast: 1, stl: 2, tov: 0, blk: 0 },
      { player: "giannopoulos", min: 14, eff: 6, fg2m: 0, fg2a: 1, fg3m: 1, fg3a: 1, ftm: 0, fta: 0, oreb: 1, dreb: 0, ast: 3, stl: 2, tov: 2, blk: 0 },
      { player: "koukis", min: 21, eff: 8, fg2m: 2, fg2a: 4, fg3m: 0, fg3a: 4, ftm: 1, fta: 2, oreb: 1, dreb: 7, ast: 1, stl: 1, tov: 1, blk: 1 },
      { player: "kostopoulos", min: 19, eff: 12, fg2m: 7, fg2a: 9, fg3m: 0, fg3a: 2, ftm: 1, fta: 1, oreb: 1, dreb: 1, ast: 0, stl: 0, tov: 1, blk: 0 },
      { player: "leivadas", min: 22, eff: 8, fg2m: 2, fg2a: 5, fg3m: 0, fg3a: 0, ftm: 1, fta: 1, oreb: 1, dreb: 2, ast: 1, stl: 2, tov: 0, blk: 0 },
      { player: "maltezos", min: 10, eff: -1, fg2m: 0, fg2a: 2, fg3m: 0, fg3a: 0, ftm: 0, fta: 0, oreb: 1, dreb: 1, ast: 0, stl: 0, tov: 1, blk: 0 },
      { player: "manikas", min: 23, eff: 3, fg2m: 1, fg2a: 6, fg3m: 0, fg3a: 0, ftm: 3, fta: 4, oreb: 1, dreb: 5, ast: 0, stl: 0, tov: 2, blk: 0 },
      { player: "nikolaidis", min: 26, eff: 5, fg2m: 2, fg2a: 3, fg3m: 0, fg3a: 0, ftm: 0, fta: 0, oreb: 0, dreb: 3, ast: 0, stl: 0, tov: 2, blk: 1 },
      { player: "spafarov", min: 17, eff: 1, fg2m: 0, fg2a: 1, fg3m: 1, fg3a: 4, ftm: 0, fta: 0, oreb: 1, dreb: 1, ast: 0, stl: 4, tov: 4, blk: 0 },
      { player: "chalavatzis", min: 30, eff: 13, fg2m: 0, fg2a: 1, fg3m: 3, fg3a: 6, ftm: 1, fta: 4, oreb: 0, dreb: 3, ast: 6, stl: 4, tov: 3, blk: 0 },
    ],
  },
  {
    id: "g6",
    round: 7,
    date: "2026-11-14",
    opponent: "Basket Maniacs",
    venue: "home",
    teamScore: 72,
    oppScore: 68,
    mvp: "giannopoulos",
    quarters: { team: [15, 18, 17, 6, 16], opp: [3, 13, 9, 21, 12] },
    lines: [
      { player: "athanasiadis", min: 30, eff: 6, fg2m: 1, fg2a: 4, fg3m: 0, fg3a: 5, ftm: 2, fta: 2, oreb: 1, dreb: 7, ast: 2, stl: 0, tov: 0, blk: 0 },
      { player: "giannopoulos", min: 22, eff: 16, fg2m: 2, fg2a: 7, fg3m: 3, fg3a: 5, ftm: 3, fta: 4, oreb: 0, dreb: 4, ast: 2, stl: 2, tov: 0, blk: 0 },
      { player: "kolovos", min: 20, eff: 7, fg2m: 0, fg2a: 1, fg3m: 1, fg3a: 4, ftm: 2, fta: 3, oreb: 1, dreb: 1, ast: 4, stl: 1, tov: 0, blk: 0 },
      { player: "kostopoulos", min: 28, eff: 8, fg2m: 4, fg2a: 8, fg3m: 0, fg3a: 2, ftm: 0, fta: 0, oreb: 0, dreb: 5, ast: 0, stl: 0, tov: 0, blk: 1 },
      { player: "leivadas", min: 22, eff: 11, fg2m: 2, fg2a: 6, fg3m: 0, fg3a: 0, ftm: 0, fta: 0, oreb: 3, dreb: 6, ast: 2, stl: 0, tov: 0, blk: 0 },
      { player: "maltezos", min: 21, eff: 12, fg2m: 3, fg2a: 5, fg3m: 0, fg3a: 0, ftm: 4, fta: 8, oreb: 3, dreb: 5, ast: 1, stl: 0, tov: 1, blk: 0 },
      { player: "manikas", min: 22, eff: 3, fg2m: 2, fg2a: 7, fg3m: 0, fg3a: 0, ftm: 0, fta: 2, oreb: 0, dreb: 2, ast: 1, stl: 1, tov: 0, blk: 2 },
      { player: "nikolaidis", min: 23, eff: 9, fg2m: 4, fg2a: 8, fg3m: 0, fg3a: 0, ftm: 0, fta: 0, oreb: 1, dreb: 3, ast: 0, stl: 0, tov: 0, blk: 1 },
      { player: "sterpis", min: 13, eff: 2, fg2m: 1, fg2a: 1, fg3m: 0, fg3a: 1, ftm: 0, fta: 0, oreb: 0, dreb: 1, ast: 0, stl: 0, tov: 0, blk: 0 },
      { player: "chalavatzis", min: 30, eff: 12, fg2m: 0, fg2a: 3, fg3m: 3, fg3a: 5, ftm: 2, fta: 4, oreb: 1, dreb: 4, ast: 3, stl: 2, tov: 2, blk: 0 },
    ],
  },
];
