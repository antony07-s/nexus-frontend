import { useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  { eyebrow: "Interior Design", title: <>Perfect harmony of<br /><span className="text-brass">flair and function.</span></>, copy: "Considered spaces designed around how you live, work and feel every day.", action: "View interior projects", to: "/projects", label: "01", image: "/images/hero/interior.png" },
  { eyebrow: "Architecture", title: <>Architecture with<br /><span className="text-brass">purpose and presence.</span></>, copy: "From first concept to construction documentation, every line has a reason.", action: "Explore architecture", to: "/services", label: "02", image: "/images/hero/architecture.png" },
  { eyebrow: "IT & Technology", title: <>Smart spaces, built<br />to <span className="text-brass">perform.</span></>, copy: "Technology is planned into the space from the start — connected, discreet and reliable.", action: "Explore technology", to: "/services", label: "03", image: "/images/hero/technology.png" },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const selectSlide = (index) => setActive(index);
  return (
    <section className="hero relative min-h-[min(720px,82vh)] overflow-hidden bg-charcoal">
      <img src={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="hero__photo-overlay" />
      <div className="max-w-7xl mx-auto min-h-[min(720px,82vh)] px-4 sm:px-8 py-16 sm:py-24 flex items-center">
        <div className="relative z-10 max-w-3xl">
          <span className="eyebrow mb-6">{slide.eyebrow}</span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[1.04] mb-7">{slide.title}</h1>
          <p className="text-ivory/80 max-w-xl text-base sm:text-lg mb-9 leading-relaxed">{slide.copy}</p>
          <div className="flex flex-wrap gap-4"><Link to={slide.to} className="btn-primary">{slide.action} <span aria-hidden="true">→</span></Link><Link to="/contact-us" className="btn-outline bg-charcoal/20">Start a conversation</Link></div>
        </div>
      </div>
      <div className="hero__controls max-w-7xl mx-auto px-4 sm:px-8 pb-7 sm:pb-10 relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3" role="tablist" aria-label="Hero slides">{slides.map((item, index) => <button key={item.label} type="button" role="tab" aria-selected={active === index} aria-label={`Show slide ${index + 1}`} onClick={() => selectSlide(index)} className={`hero__dot ${active === index ? "hero__dot--active" : ""}`} />)}<span className="font-mono text-xs text-mute ml-2">{slide.label} / 03</span></div>
        <div className="flex gap-2"><button type="button" className="hero__arrow" aria-label="Previous slide" onClick={() => selectSlide((active - 1 + slides.length) % slides.length)}>←</button><button type="button" className="hero__arrow" aria-label="Next slide" onClick={() => selectSlide((active + 1) % slides.length)}>→</button></div>
      </div>
    </section>
  );
}
