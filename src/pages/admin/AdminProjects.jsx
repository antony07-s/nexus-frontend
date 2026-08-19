import { useEffect, useState } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "../../api/client.js";
import { useAuth } from "../../context/AuthContext.jsx";
import AdminNav from "../../components/AdminNav.jsx";

const emptyForm = {
  title: "", slug: "", client: "", location: "", category: "Interior",
  coverImage: "", description: "", year: new Date().getFullYear(), featured: false,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    getProjects({ limit: 100 })
      .then((res) => setProjects(res.data.data))
      .catch(() => setError("Failed to load projects."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startEdit = (p) => {
    setEditingId(p._id);
    setForm({
      title: p.title, slug: p.slug, client: p.client || "", location: p.location || "",
      category: p.category, coverImage: p.coverImage, description: p.description || "",
      year: p.year || "", featured: !!p.featured,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await updateProject(editingId, form);
      } else {
        await createProject(form);
      }
      cancelEdit();
      load();
    } catch {
      setError("Save failed — check your fields and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      load();
    } catch {
      setError("Delete failed.");
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16">
      <AdminNav />
      <h1 className="font-display text-3xl mb-10">Admin · Projects</h1>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 mb-16 border border-white/10 p-6">
        <h2 className="sm:col-span-2 font-display text-xl mb-2">
          {editingId ? "Edit project" : "Add new project"}
        </h2>
        <input placeholder="Title" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="bg-charcoal-panel border border-white/10 px-3 py-2" required />
        <input placeholder="Slug (url-friendly-id)" value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="bg-charcoal-panel border border-white/10 px-3 py-2" required />
        <input placeholder="Client" value={form.client}
          onChange={(e) => setForm({ ...form, client: e.target.value })}
          className="bg-charcoal-panel border border-white/10 px-3 py-2" />
        <input placeholder="Location" value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="bg-charcoal-panel border border-white/10 px-3 py-2" />
        <select value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="bg-charcoal-panel border border-white/10 px-3 py-2">
          {["Interior", "Architecture", "Consulting", "IT", "Residential", "Commercial"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input placeholder="Year" type="number" value={form.year}
          onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
          className="bg-charcoal-panel border border-white/10 px-3 py-2" />
        <input placeholder="Cover image URL" value={form.coverImage}
          onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
          className="sm:col-span-2 bg-charcoal-panel border border-white/10 px-3 py-2" required />
        <textarea placeholder="Description" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="sm:col-span-2 bg-charcoal-panel border border-white/10 px-3 py-2" rows={3} />
        <label className="flex items-center gap-2 text-sm text-mute">
          <input type="checkbox" checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
          Featured
        </label>
        <div className="sm:col-span-2 flex gap-3">
          <button type="submit" disabled={saving}
            className="bg-brass text-charcoal px-5 py-2 font-medium disabled:opacity-50">
            {saving ? "Saving..." : editingId ? "Save changes" : "Add project"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="px-5 py-2 border border-white/10">
              Cancel
            </button>
          )}
        </div>
        {error && <p className="sm:col-span-2 text-red-300 text-sm" role="alert">{error}</p>}
      </form>

      {loading ? (
        <p className="text-mute">Loading...</p>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p._id} className="flex justify-between items-center border border-white/10 px-4 py-3">
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-mute text-sm">{p.category} · {p.year} · {p.slug}</p>
              </div>
              <div className="flex gap-4 text-sm">
                <button onClick={() => startEdit(p)} className="underline">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="underline text-red-300">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}