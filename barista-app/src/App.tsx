import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import RecipeDetail from "./pages/RecipeDetail";
import Cafe from "./pages/Cafe";

export default function App() {
  return (
    <BrowserRouter>
      <header className="sticky top-0 bg-emerald-600 text-white">
        <nav className="mx-auto max-w-5xl px-4 py-3 flex gap-6">
          <Link to="/" className="font-semibold">Barista</Link>
          <Link to="/catalogue">Catalogue</Link>
          <Link to="/cafe">Café</Link>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/catalogue" element={<Catalogue/>}/>
          <Route path="/recipe/:id" element={<RecipeDetail/>}/>
          <Route path="/cafe" element={<Cafe/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}
