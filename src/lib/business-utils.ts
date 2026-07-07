import type { Business, Hours } from "./mock-data";

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export function isOpenNow(b: Business, now = new Date()): { open: boolean; label: string } {
  const today = b.hours.find(h => h.day === DAYS[now.getDay()]);
  if (!today || today.closed || !today.open) return { open: false, label: "Closed today" };
  const [oh, om] = today.open.split(":").map(Number);
  const [ch, cm] = today.close.split(":").map(Number);
  const mins = now.getHours() * 60 + now.getMinutes();
  const open = mins >= oh * 60 + om && mins < ch * 60 + cm;
  return { open, label: open ? `Open · closes ${today.close}` : `Closed · opens ${today.open}` };
}

export function formatHours(hours: Hours[]) {
  return hours.map(h => ({
    day: h.day,
    label: h.closed || !h.open ? "Closed" : `${h.open} – ${h.close}`,
  }));
}
