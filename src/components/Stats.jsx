const stats = [
  { value: "300+", label: "Projects Delivered" },
  { value: "10+", label: "Years in Industry" },
  { value: "20+", label: "Team Members" },
  { value: "4", label: "Disciplines Under One Roof" },
];

export default function Stats() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
        <div>
          <span className="eyebrow mb-6">Expertise</span>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Milestones that lead us forward.
          </h2>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-charcoal-panel border border-white/5 p-10 text-center">
            <div className="font-display text-5xl text-brass mb-2">{s.value}</div>
            <div className="text-mute text-sm uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
