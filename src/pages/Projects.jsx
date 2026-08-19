import { useEffect, useState } from "react";
import { getProjects } from "../api/client.js";
import SEO from "../components/SEO.jsx";
import Pagination from "../components/Pagination.jsx";
import { LoadingGrid } from "../components/AsyncStates.jsx";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProjects({ page, limit: 12 })
      .then((res) => { setProjects(res.data.data); setPages(res.data.pages || 1); setError(""); })
      .catch(() => { setProjects([]); setError("Projects are temporarily unavailable. Please try again shortly."); })
      .finally(() => setLoading(false));
  }, [page]);

  const categories = ["All", "Interior", "Architecture", "Consulting", "IT"];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24" data-reveal>
      <SEO title="Projects" description="Explore selected interior, architecture, consulting and technology work by Nexus Design & Built." path="/projects" />
      <span className="eyebrow mb-6">Projects</span>
      <h1 className="font-display text-5xl mb-10 max-w-2xl">Selected work.</h1>

      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => { setFilter(c); setPage(1); }}
            className={`px-5 py-2 text-sm border transition-colors ${filter === c ? "border-brass text-brass" : "border-white/10 text-mute hover:text-ivory"
              }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingGrid />
      ) : visible.length === 0 ? (
        <p className="text-mute">
          No projects loaded yet — connect MongoDB Atlas and add project entries via the API to
          populate this page.
        </p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((p) => (
              <Link key={p.slug} to={`/projects/${p.slug}`} className="group block">
                <div className="aspect-[4/3] bg-charcoal-panel border border-white/10 overflow-hidden mb-4">
                  {p.coverImage && (
                    <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                  )}
                </div>
                <h3 className="font-display text-xl group-hover:text-brass transition-colors">{p.title}</h3>
                <p className="text-mute text-sm">{p.category} &middot; {p.year}</p>
              </Link>
            ))}
          </div>
          <Pagination page={page} pages={pages} onChange={setPage} />
        </>
      )}
      {error && <p className="mt-6 text-red-300" role="alert">{error}</p>}
    </section>
  );
}