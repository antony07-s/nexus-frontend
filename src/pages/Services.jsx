import { useEffect, useState } from "react";
import { getServices } from "../api/client.js";
import SEO from "../components/SEO.jsx";

const fallback = [
  { slug: "interior", title: "Interior", shortDescription: "Interior Design, Renovation, Project Consultancy, Planning, 3D Perspective, Animation.", category: "design-build" },
  { slug: "architecture", title: "Architecture", shortDescription: "Concept design, structural planning, permits and construction drawings.", category: "design-build" },
  { slug: "consulting", title: "Consulting", shortDescription: "Budgeting, feasibility, and project management consultancy.", category: "design-build" },
  { slug: "it", title: "IT & Technology", shortDescription: "Networking, smart-building automation, security systems, and custom software.", category: "technology" },
];

export default function Services() {
  const [services, setServices] = useState(fallback);

  useEffect(() => {
    getServices()
      .then((res) => res.data.data.length && setServices(res.data.data))
      .catch(() => {}); // keep fallback content if API/DB isn't connected yet
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24" data-reveal>
      <SEO title="Services" path="/services" />
      <span className="eyebrow mb-6">Services</span>
      <h1 className="font-display text-5xl mb-16 max-w-2xl">
        Four disciplines. One accountable team.
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {services.map((s, i) => (
          <div key={s.slug} className="p-10 border border-white/10 bg-charcoal-panel">
            <span className="font-mono text-sm text-brass">
              0{i + 1}
            </span>
            <h2 className="font-display text-3xl mt-4 mb-4">{s.title}</h2>
            <p className="text-mute leading-relaxed">{s.shortDescription}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
