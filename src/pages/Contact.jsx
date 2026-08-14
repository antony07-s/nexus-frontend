import ContactForm from "../components/ContactForm.jsx";
import SEO from "../components/SEO.jsx";

export default function Contact() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24" data-reveal>
      <SEO title="Contact Us" path="/contact-us" />
      <span className="eyebrow mb-6">Contact Us</span>
      <h1 className="font-display text-5xl mb-10 max-w-2xl">
        Creative project? Let's have a productive talk.
      </h1>
      <div className="max-w-xl">
        <ContactForm />
      </div>
    </section>
  );
}
