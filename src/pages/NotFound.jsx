import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-8 text-center">
      <SEO title="Page Not Found" />
      <span className="font-display text-brass text-7xl mb-4">404</span>
      <h1 className="font-display text-3xl mb-4">This page doesn't exist.</h1>
      <p className="text-mute mb-8 max-w-md">
        The page you're looking for may have moved or never existed. Let's get you back on track.
      </p>
      <Link to="/" className="btn-primary">
        Back to Home →
      </Link>
    </section>
  );
}