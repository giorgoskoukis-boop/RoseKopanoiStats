import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Toaster } from "@/components/ui/sonner";
import { teamLogo } from "@/data/photos";
import { games, SEASON, TEAM_NAME } from "@/data/season";


export function AppShell() {
  const { pathname } = useLocation();
  const wins = games.filter((g) => g.teamScore > g.oppScore).length;
  const losses = games.length - wins;
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#content"
        className="sr-only z-50 rounded-md bg-background px-3 py-2 text-foreground focus:not-sr-only focus:absolute focus:left-3 focus:top-3"
      >
        Μετάβαση στο περιεχόμενο
      </a>
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground">
            <img src={teamLogo} alt="" className="size-11 shrink-0" />
            <span className="min-w-0">
              <span className="block text-lg font-semibold leading-tight">{TEAM_NAME}</span>
              <span className="block text-sm leading-tight">{SEASON}</span>
            </span>
          </Link>
          <dl className="ml-auto flex items-baseline gap-5 text-sm">
            <div className="flex items-baseline gap-1.5">
              <dt>Ρεκόρ</dt>
              <dd className="text-xl font-semibold tabular-nums">
                {wins}–{losses}
              </dd>
            </div>
            <div className="flex items-baseline gap-1.5">
              <dt>Αγώνες</dt>
              <dd className="text-xl font-semibold tabular-nums">{games.length}</dd>
            </div>
          </dl>
        </div>
      </header>
      <main className="flex flex-1 flex-col">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="flex-1"
        >
          <Outlet />
        </motion.div>
      </main>
      <Toaster />
    </div>
  );
}

export default AppShell;
