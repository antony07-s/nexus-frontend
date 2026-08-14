const steps = [
  { n: "01", title: "Design", desc: "We conceptualize a design that captures your vision for the space." },
  { n: "02", title: "Manufacturing", desc: "We create and source quality-assured materials and fittings." },
  { n: "03", title: "Site Installation", desc: "Our skilled team transforms the space with expertise and care." },
  { n: "04", title: "IT Integration", desc: "Networking, automation and systems are wired in before handover." },
  { n: "05", title: "Quality Control", desc: "We verify every element — physical and digital — meets spec." },
];

export default function Process() {
  return (
    <section className="bg-charcoal-soft py-16 sm:py-24" data-reveal>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <span className="eyebrow mb-6">How We Work</span>
        <h2 className="font-display text-4xl md:text-5xl max-w-2xl mb-16">
          A proven process, from first sketch to final switch-on.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-brass/50 pt-6">
              <span className="font-display text-3xl text-brass">{s.n}</span>
              <h3 className="font-display text-xl mt-4 mb-2">{s.title}</h3>
              <p className="text-mute text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
