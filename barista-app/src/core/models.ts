export type DrinkType = "coffee" | "tea" | "matcha";
export type Step = { id: string; label: string; durationSec?: number; lottie?: string };
export type Recipe = {
  id: string; title: string; type: DrinkType; difficulty: number;
  ingredients: { item: string; amount?: string }[]; steps: Step[]; unlocks: string[];
};
export type ManifestItem = { id: string; title: string; type: DrinkType; difficulty: number };
