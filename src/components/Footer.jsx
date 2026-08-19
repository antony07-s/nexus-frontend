import { Link } from "react-router-dom";
import nexusLogo from "../assets/nexuslogo.png";

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/5 pt-16 pb-8 px-8 mt-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        <div>
          <img src={nexusLogo} alt="Nexus Design & Built" className="h-16 w-auto object-contain rounded-md p-1 mb-4" />
          <p className="text-mute text-sm leading-relaxed">
            Nexus Design &amp; Built delivers end-to-end interior design, architecture, consulting
            and IT solutions — one team, from concept to code.
          </p>
        </div>

        <div>
          <h4 className="font-display text-ivory text-lg mb-4">Explore</h4>
          <ul className="space-y-2 text-mute text-sm">
            <li><Link to="/services" className="hover:text-brass">Services</Link></li>
            <li><Link to="/projects" className="hover:text-brass">Projects</Link></li>
            <li><Link to="/awards" className="hover:text-brass">Awards</Link></li>
            <li><Link to="/blog" className="hover:text-brass">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-ivory text-lg mb-4">Services</h4>
          <ul className="space-y-2 text-mute text-sm">
            <li>Interior Design</li>
            <li>Architecture</li>
            <li>Consulting</li>
            <li>IT &amp; Technology</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-ivory text-lg mb-4">Contact</h4>
          <ul className="space-y-2 text-mute text-sm">
            <li>Phone: +919790965755</li>
            <li>Email: info@nexusdesignbuilt.com</li>
            <li>India</li>
          </ul>
          <Link to="/contact-us" className="btn-primary mt-4 text-sm px-5 py-2.5">
            Contact Us →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-mute">
        <span>
  &copy; {new Date().getFullYear()} Nexus Design &amp; Built. All rights reserved.{" "}
  <Link to="/admin/login" className="text-mute/40 hover:text-mute">·</Link>
</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-brass">Facebook</a>
          <a href="#" className="hover:text-brass">Instagram</a>
          <a href="#" className="hover:text-brass">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
