import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "../api/client.js";
import SEO from "../components/SEO.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getProjectBySlug(slug)
      .then((res) => { setProject(res.data.data); setError(""); })
      .catch(() => { setProject(null); setError("This project couldn't be found."); })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto px-4 sm:px-8 py-24">
        <p className="text-mute">Loading project…</p>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="max-w-5xl mx-auto px-4 sm:px-8 py-24">
        <p className="text-red-300 mb-6" role="alert">{error || "Project not found."}</p>
        <Link to="/projects" className="text-brass underline">
          &larr; Back to all projects
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24" data-reveal>
      <SEO title={project.title} description={project.description} path={`/projects/${project.slug}`} />

      <Link to="/projects" className="text-mute hover:text-brass text-sm mb-8 inline-block">
        &larr; Back to all projects
      </Link>

      <span className="eyebrow mb-4 block">{project.category}</span>
      <h1 className="font-display text-5xl mb-6 max-w-2xl">{project.title}</h1>

      <div className="flex flex-wrap gap-x-8 gap-y-2 text-mute text-sm mb-10">
        {project.client && <span>Client: {project.client}</span>}
        {project.location && <span>Location: {project.location}</span>}
        {project.year && <span>Year: {project.year}</span>}
      </div>

      <div className="aspect-[16/9] bg-charcoal-panel border border-white/10 overflow-hidden mb-10">
        {project.coverImage && (
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
        )}
      </div>

      {project.description && (
        <p className="text-lg text-ivory/90 max-w-3xl mb-10 leading-relaxed">{project.description}</p>
      )}

      {project.gallery?.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          {project.gallery.map((img, i) => (
            <div key={i} className="aspect-[4/3] bg-charcoal-panel border border-white/10 overflow-hidden">
              <img src={img} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}