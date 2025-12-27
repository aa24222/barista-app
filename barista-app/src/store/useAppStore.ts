import { create } from "zustand";
import type { Recipe } from "../core/models";

type UserState = { unlocked: string[]; coins: number; bestTimes: Record<string, number|undefined> };
type AppState = {
  user: UserState;
  recipes: Record<string, Recipe>;
  setRecipes: (r: Recipe[]) => void;
  complete: (id: string, timeSec: number) => { newUnlocks: string[] };
};

export const useAppStore = create<AppState>((set, get) => ({
  user: { unlocked: ["espresso"], coins: 0, bestTimes: {} },
  recipes: {},
  setRecipes: (list) => set({ recipes: Object.fromEntries(list.map(r => [r.id, r])) }),
  complete: (id, t) => {
    const { recipes, user } = get();
    const rec = recipes[id]; if (!rec) return { newUnlocks: [] };
    const best = user.bestTimes[id]; const improved = best ? Math.min(best, t) : t;
    const newUnlocks = rec.unlocks.filter(x => !user.unlocked.includes(x));
    set({
      user: {
        unlocked: Array.from(new Set([...user.unlocked, ...newUnlocks])),
        coins: user.coins + (10 + rec.difficulty * 5),
        bestTimes: { ...user.bestTimes, [id]: improved },
      }
    });
    return { newUnlocks };
  }
}));
