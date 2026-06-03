export type FlowerKind = "rose" | "tulip" | "daisy" | "sunflower";
export const ALL_FLOWER_KINDS: FlowerKind[] = ["rose", "tulip", "daisy", "sunflower"];

export const FLOWER_STORAGE_KEY = "sushii-bday-flowers";
export const FLOWER_EVENT = "sushii-flower-changed";

export const FLOWER_LABELS: Record<FlowerKind, string> = {
  rose: "Rose",
  tulip: "Tulip",
  daisy: "Daisy",
  sunflower: "Sunflower",
};

export function getChosenFlowers(): FlowerKind[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(FLOWER_STORAGE_KEY);
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is FlowerKind => (ALL_FLOWER_KINDS as string[]).includes(s));
}

export function setChosenFlowers(kinds: FlowerKind[]) {
  if (typeof window === "undefined") return;
  if (kinds.length === 0) {
    window.localStorage.removeItem(FLOWER_STORAGE_KEY);
  } else {
    window.localStorage.setItem(FLOWER_STORAGE_KEY, kinds.join(","));
  }
  window.dispatchEvent(new CustomEvent<FlowerKind[]>(FLOWER_EVENT, { detail: kinds }));
}
