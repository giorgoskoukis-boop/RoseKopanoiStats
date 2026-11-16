// Player photos cropped from each player's basketaki.com profile.
// Players without a photo on basketaki.com fall back to the team logo.
import athanasiadis from "@/assets/players/athanasiadis.jpg";
import chalavatzis from "@/assets/players/chalavatzis.jpg";
import giannopoulos from "@/assets/players/giannopoulos.jpg";
import giataganas from "@/assets/players/giataganas.jpg";
import katsampekis from "@/assets/players/katsampekis.jpg";
import katsiadramis from "@/assets/players/katsiadramis.jpg";
import kolovos from "@/assets/players/kolovos.jpg";
import kostopoulos from "@/assets/players/kostopoulos.jpg";
import koukis from "@/assets/players/koukis.jpg";
import leivadas from "@/assets/players/leivadas.jpg";
import nikolaidis from "@/assets/players/nikolaidis.jpg";
import spafarov from "@/assets/players/spafarov.jpg";
import logo from "@/assets/team-logo.png";

export const teamLogo = logo;

export const playerPhotos: Record<string, string> = {
  athanasiadis,
  chalavatzis,
  giannopoulos,
  giataganas,
  katsampekis,
  katsiadramis,
  kolovos,
  kostopoulos,
  koukis,
  leivadas,
  nikolaidis,
  spafarov,
};
