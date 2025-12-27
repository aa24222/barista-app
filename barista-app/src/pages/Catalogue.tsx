import { useEffect, useState } from "react";
import { loadManifest } from "../lib/recipes";
import { useAppStore } from "../store/useAppStore";
import { Link } from "react-router-dom";

export default function Catalogue() {
  const [items, setItems] = useState<{id:string; title:string; type:string; difficulty:number}[]>([]);
  const unlocked = useAppStore(s => s.user.unlocked);
  useEffect(() => { loadManifest().then(m => setItems(m)); }, []);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(it => {
        const isUnlocked = unlocked.includes(it.id);
        return (
          <Link to={isUnlocked ? `/recipe/${it.id}` : "#"} key={it.id}
            className={`rounded border p-4 ${isUnlocked ? "bg-white hover:bg-slate-50" : "bg-slate-100 opacity-70 pointer-events-none"}`}>
            <div className="text-sm text-slate-500">{it.type} • ★{it.difficulty}</div>
            <div className="font-semibold">{it.title}</div>
            {!isUnlocked && <div className="mt-2 text-xs text-slate-500">Locked</div>}
          </Link>
        );
      })}
    </div>
  );
}
