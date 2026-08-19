import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import nexusLogo from "../assets/nexuslogo.png";

const links = [
  { to: "/", label: "Nexus" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/awards", label: "Awards" },
  { to: "/about-us", label: "About Us" },
  { to: "/blog", label: "Blog" },
  { to: "/contact-us", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Topbar */}
      <div className="hidden md:flex bg-black border-b border-white/5 text-xs text-mute px-8 py-2 justify-between items-center">
        <span>Opening time: Mon–Fri 09:00 – 18:00</span>
        <div className="flex items-center gap-6">
          <span>Email: info@nexusdesignbuilt.com</span>
          <span>Phone: +919790965755</span>
          <div className="flex items-center gap-3 text-ivory">
            <a href="#" aria-label="Facebook" className="hover:text-brass">FB</a>
            <a href="#" aria-label="Instagram" className="hover:text-brass">IG</a>
            <a href="#" aria-label="LinkedIn" className="hover:text-brass">LN</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-charcoal-soft/95 backdrop-blur border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
  <img src={nexusLogo} alt="Nexus Design & Built" className="h-14 w-auto object-contain rounded-md p-1" />
</Link>

        <div className="hidden lg:flex items-center gap-8 font-body text-sm uppercase tracking-wide">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `hover:text-brass transition-colors ${isActive ? "text-brass" : "text-ivory/90"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <button
          className="lg:hidden text-ivory"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="w-6 h-px bg-ivory mb-1.5" />
          <div className="w-6 h-px bg-ivory mb-1.5" />
          <div className="w-6 h-px bg-ivory" />
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-charcoal-soft border-b border-white/5 px-8 py-6 flex flex-col gap-4 text-sm uppercase tracking-wide">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-ivory/90 hover:text-brass">
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
