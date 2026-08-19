import { Link } from "react-router-dom";
import nexusLogo from "../assets/nexuslogo.png";
import LocationToggle from "./LocationToggle.jsx";

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
            <li><Link to="/services#interior" className="hover:text-brass">Interior Design</Link></li>
            <li><Link to="/services#architecture" className="hover:text-brass">Architecture</Link></li>
            <li><Link to="/services#consulting" className="hover:text-brass">Consulting</Link></li>
            <li><Link to="/services#it" className="hover:text-brass">IT &amp; Technology</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-ivory text-lg mb-4">Contact</h4>
          <LocationToggle
            indiaAddress="15, Vasantha Nagar, Wireless Road, Airport, Tiruchirappalli, 620007 (Beside BG Naidu Sweets)"
            indiaPhone="+919790965755"
            malaysiaAddress="239A3, Jalan Sultan Azlan Shah, Sentul, 52100 Kuala Lumpur, Malaysia"
          />
          <p className="text-mute text-sm mt-3">Email: info@nexusdesignbuilt.com</p>
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
