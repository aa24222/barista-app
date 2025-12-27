import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadRecipe } from "../lib/recipes";
import type { Recipe } from "../core/models";
import { useAppStore } from "../store/useAppStore";

function MakeTimer({ onFinish }: { onFinish: (sec:number)=>void }) {
  const [sec,setSec]=useState(0); const [run,setRun]=useState(false);
  useEffect(()=>{ if(!run) return; const id=setInterval(()=>setSec(s=>s+1),1000); return ()=>clearInterval(id) },[run]);
  return (
    <div className="mt-4 flex items-center gap-3">
      <div className="text-2xl font-mono">{sec}s</div>
      <button className="px-3 py-1 rounded bg-emerald-500" onClick={()=>setRun(true)}>Start</button>
      <button className="px-3 py-1 rounded bg-slate-300" onClick={()=>setRun(false)}>Pause</button>
      <button className="px-3 py-1 rounded bg-indigo-500" onClick={()=>{setRun(false); onFinish(sec);}}>Finish</button>
    </div>
  );
}

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe,setRecipe]=useState<Recipe|null>(null);
  const complete = useAppStore(s=>s.complete);

  useEffect(()=>{ if(id) loadRecipe(id).then(setRecipe); },[id]);

  if(!recipe) return <div>Loading…</div>;
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">{recipe.title}</h1>
      <div className="text-slate-600">Difficulty: {recipe.difficulty} • {recipe.type}</div>
      <div>
        <h2 className="font-semibold mt-4 mb-1">Ingredients</h2>
        <ul className="list-disc ml-6">
          {recipe.ingredients.map((i,idx)=><li key={idx}>{i.item}{i.amount?` — ${i.amount}`:""}</li>)}
        </ul>
      </div>
      <div>
        <h2 className="font-semibold mt-4 mb-1">Steps</h2>
        <ol className="list-decimal ml-6">
          {recipe.steps.map(s=><li key={s.id}>{s.label}</li>)}
        </ol>
      </div>

      <MakeTimer onFinish={(sec)=>{
        const { newUnlocks } = complete(recipe.id, sec);
        if(newUnlocks.length) alert(`Unlocked: ${newUnlocks.join(", ")}`);
        else alert(`Nice! Best time updated.`);
      }}/>
    </section>
  );
}
