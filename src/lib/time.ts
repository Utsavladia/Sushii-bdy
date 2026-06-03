import { content } from "@/content";

export type Remaining = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  unlocked: boolean;
};

export function getRemaining(now: Date = new Date()): Remaining {
  const target = new Date(content.birthday).getTime();
  const diff = target - now.getTime();
  const unlocked = diff <= 0;
  const safe = Math.max(0, diff);
  const days = Math.floor(safe / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safe / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safe / (1000 * 60)) % 60);
  const seconds = Math.floor((safe / 1000) % 60);
  return { total: diff, days, hours, minutes, seconds, unlocked };
}
