import { useEffect, useState } from "react";
import { getAwards } from "../api/client.js";
import SEO from "../components/SEO.jsx";
import Pagination from "../components/Pagination.jsx";
import { LoadingGrid } from "../components/AsyncStates.jsx";

export default function Awards() {
  const [awards, setAwards] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAwards({ page, limit: 12 })
      .then((res) => { setAwards(res.data.data); setPages(res.data.pages || 1); })
      .catch(() => setAwards([]))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24" data-reveal>
      <SEO title="Awards" description="Recognition and awards received by Nexus Design & Built." path="/awards" />
      <span className="eyebrow mb-6">Since Inception</span>
      <h1 className="font-display text-5xl mb-16 max-w-2xl">Our Awards.</h1>

      {loading ? (
        <LoadingGrid count={3} />
      ) : awards.length === 0 ? (
        <p className="text-mute">Award entries will appear here once added via the admin API.</p>
      ) : (
        <>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((a) => (
            <div key={a._id} className="bg-charcoal-panel border border-white/10 p-6">
              {a.certificateImage && (
                <img src={a.certificateImage} alt={a.title} className="w-full mb-4" />
              )}
              <h3 className="font-display text-lg">{a.title}</h3>
              <p className="text-mute text-sm">{a.subtitle} &middot; {a.year}</p>
            </div>
          ))}
        </div>
        <Pagination page={page} pages={pages} onChange={setPage} />
        </>
      )}
    </section>
  );
}