import { useAppStore } from "../store/useAppStore";
import { Link } from "react-router-dom";

export default function Home() {
  const coins = useAppStore(s => s.user.coins);
  const unlocked = useAppStore(s => s.user.unlocked);
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Welcome back ☕</h1>
      <p>Coins: <span className="font-semibold">{coins}</span></p>
      <div>
        <h2 className="text-xl font-semibold mb-2">Continue</h2>
        <div className="flex gap-3 flex-wrap">
          {unlocked.map(id => (
            <Link key={id} to={`/recipe/${id}`} className="px-3 py-2 rounded bg-slate-200 hover:bg-slate-300">
              {id}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}