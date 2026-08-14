const services = [
  {
    order: "01",
    title: "Interior",
    desc: "Residential and commercial interiors, tailored to how the space will actually be used.",
    accent: "brass",
  },
  {
    order: "02",
    title: "Architecture",
    desc: "Ground-up structural design, from concept massing to construction drawings.",
    accent: "brass",
  },
  {
    order: "03",
    title: "Consulting",
    desc: "Planning, budgeting and project consultancy for builds of any scale.",
    accent: "brass",
  },
  {
    order: "04",
    title: "IT & Technology",
    desc: "Smart-building systems, networking, and the software that runs the space.",
    accent: "brass",
  },
];



export default function ServicesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24" data-reveal>
      <div className="grid md:grid-cols-2 gap-16 mb-16">
        <div>
          <span className="eyebrow mb-6">What We Do</span>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Excellence in <span className="text-brass">design</span>,{" "}
            <span className="text-brass">delivery</span> &amp; systems.
          </h2>
        </div>
        <p className="text-mute self-end leading-relaxed">
          We provide stellar products, unmatched service, and the technical backbone
          your project needs — according to the nature, requirements, and budget of
          every client we work with.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s) => (
          <div
            key={s.title}
            className="group bg-charcoal-panel border border-white/5 p-8 hover:border-brass/40 transition-colors"
          >
            <span
              className={`font-mono text-sm ${s.accent === "signal" ? "text-signal" : "text-brass"}`}
            >
              {s.order}
            </span>
            <h3 className="font-display text-2xl mt-4 mb-3">{s.title}</h3>
            <p className="text-mute text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
