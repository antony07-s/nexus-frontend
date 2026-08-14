import { useEffect, useState } from "react";
import { getBlogPosts } from "../api/client.js";
import SEO from "../components/SEO.jsx";
import Pagination from "../components/Pagination.jsx";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    getBlogPosts({ page, limit: 12 })
      .then((res) => { setPosts(res.data.data); setPages(res.data.pages || 1); })
      .catch(() => setPosts([]));
  }, [page]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24" data-reveal>
      <SEO title="Blog" description="Notes on interiors, architecture and technology from Nexus Design & Built." path="/blog" />
      <span className="eyebrow mb-6">Blog</span>
      <h1 className="font-display text-5xl mb-16 max-w-2xl">Notes from the studio.</h1>

      {posts.length === 0 ? (
        <p className="text-mute">No posts published yet.</p>
      ) : (
        <>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p) => (
            <article key={p.slug}>
              {p.coverImage && (
                <div className="aspect-[4/3] bg-charcoal-panel border border-white/10 overflow-hidden mb-4">
                  <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                </div>
              )}
              <h3 className="font-display text-xl mb-2">{p.title}</h3>
              <p className="text-mute text-sm leading-relaxed">{p.excerpt}</p>
            </article>
          ))}
        </div>
        <Pagination page={page} pages={pages} onChange={setPage} />
        </>
      )}
    </section>
  );
}
