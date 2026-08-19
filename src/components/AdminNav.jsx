import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminNav() {
  const { username, logout } = useAuth();
  const linkClass = ({ isActive }) =>
    `px-3 py-1 text-sm ${isActive ? "text-brass" : "text-mute hover:text-ivory"}`;

  return (
    <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-4">
      <nav className="flex gap-2">
        <NavLink to="/admin/projects" className={linkClass}>Projects</NavLink>
        <NavLink to="/admin/services" className={linkClass}>Services</NavLink>
        <NavLink to="/admin/awards" className={linkClass}>Awards</NavLink>
        <NavLink to="/admin/blog" className={linkClass}>Blog</NavLink>
      </nav>
      <div className="text-sm text-mute">
        {username} · <button onClick={logout} className="underline">Log out</button>
      </div>
    </div>
  );
}