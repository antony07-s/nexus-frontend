import Hero from "../components/Hero.jsx";
import ServicesGrid from "../components/ServicesGrid.jsx";
import Process from "../components/Process.jsx";
import Stats from "../components/Stats.jsx";
import ContactForm from "../components/ContactForm.jsx";
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

export default function Home() {
  return (
    <>
      <SEO path="/" />
      <Hero />
      <ServicesGrid />
      <Process />
      <Stats />

      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-16" data-reveal>
        <div>
          <span className="eyebrow mb-6">Contact Us</span>
          <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight">
            <span className="text-brass">Creative project?</span> Let's have a
            productive talk.
          </h2>
          <p className="text-mute leading-relaxed mb-8">
            Whether it's a full interior fit-out, a ground-up build, or the network
            and systems behind it — tell us where you're starting from.
          </p>
          <Link to="/projects" className="btn-outline">
            See Our Projects →
          </Link>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
