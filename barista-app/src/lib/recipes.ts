import type { ManifestItem, Recipe } from "../core/models";

export async function loadManifest(): Promise<ManifestItem[]> {
  const res = await fetch("/recipes/manifest.json", { cache: "no-cache" });
  if (!res.ok) throw new Error("manifest");
  const j = await res.json();
  return j.recipes as ManifestItem[];
}

export async function loadRecipe(id: string): Promise<Recipe> {
  const res = await fetch(`/recipes/${id}.json`, { cache: "no-cache" });
  if (!res.ok) throw new Error(id);
  return res.json();
}
