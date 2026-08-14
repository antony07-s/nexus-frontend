export default function AboutUs() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24" data-reveal>
      <SEO title="About Us" path="/about-us" />
      <span className="eyebrow mb-6">About Us</span>
      <h1 className="font-display text-5xl mb-10 max-w-2xl">
        Your Vision. <span className="text-brass">Our Mission.</span>
      </h1>
      <p className="text-mute leading-relaxed text-lg mb-6">
        Nexus Design &amp; Built entered the industry to close a gap we kept seeing: design
        teams and IT teams working in isolation, handing a finished space over to whoever
        wired it up last. We build both under one roof, so the systems that run a space are
        planned in from day one, not bolted on afterward.
      </p>
      <p className="text-mute leading-relaxed text-lg">
        Our team of interior designers, architects, consultants and engineers works from a
        single brief and a single timeline, giving clients one point of accountability for
        the whole project — from the first floor plan to the last line of configuration.
      </p>
    </section>
  );
}
import SEO from "../components/SEO.jsx";
