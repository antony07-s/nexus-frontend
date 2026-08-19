import { useEffect, useState } from "react";
import { getServices, createService, updateService, deleteService } from "../../api/client.js";
import AdminNav from "../../components/AdminNav.jsx";

const emptyForm = {
  title: "", slug: "", order: 1, category: "design-build",
  shortDescription: "", fullDescription: "", offeringsText: "", image: "",
};

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    getServices()
      .then((res) => setServices(res.data.data))
      .catch(() => setError("Failed to load services."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startEdit = (s) => {
    setEditingId(s._id);
    setForm({
      title: s.title, slug: s.slug, order: s.order || 1, category: s.category,
      shortDescription: s.shortDescription || "", fullDescription: s.fullDescription || "",
      offeringsText: (s.offerings || []).join(", "), image: s.image || "",
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
    const payload = {
      ...form,
      offerings: form.offeringsText.split(",").map((s) => s.trim()).filter(Boolean),
    };
    delete payload.offeringsText;
    try {
      if (editingId) await updateService(editingId, payload);
      else await createService(payload);
      cancelEdit();
      load();
    } catch {
      setError("Save failed — check your fields and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;
    try {
      await deleteService(id);
      load();
    } catch {
      setError("Delete failed.");
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16">
      <AdminNav />
      <h1 className="font-display text-3xl mb-10">Admin · Services</h1>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 mb-16 border border-white/10 p-6">
        <h2 className="sm:col-span-2 font-display text-xl mb-2">
          {editingId ? "Edit service" : "Add new service"}
        </h2>
        <input placeholder="Title" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="bg-charcoal-panel border border-white/10 px-3 py-2" required />
        <input placeholder="Slug" value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="bg-charcoal-panel border border-white/10 px-3 py-2" required />
        <input placeholder="Order (number)" type="number" value={form.order}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          className="bg-charcoal-panel border border-white/10 px-3 py-2" />
        <input placeholder="Category (e.g. design-build, technology)" value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="bg-charcoal-panel border border-white/10 px-3 py-2" />
        <input placeholder="Image URL" value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="sm:col-span-2 bg-charcoal-panel border border-white/10 px-3 py-2" />
        <textarea placeholder="Short description" value={form.shortDescription}
          onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
          className="sm:col-span-2 bg-charcoal-panel border border-white/10 px-3 py-2" rows={2} />
        <textarea placeholder="Full description" value={form.fullDescription}
          onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
          className="sm:col-span-2 bg-charcoal-panel border border-white/10 px-3 py-2" rows={3} />
        <input placeholder="Offerings, comma separated" value={form.offeringsText}
          onChange={(e) => setForm({ ...form, offeringsText: e.target.value })}
          className="sm:col-span-2 bg-charcoal-panel border border-white/10 px-3 py-2" />
        <div className="sm:col-span-2 flex gap-3">
          <button type="submit" disabled={saving}
            className="bg-brass text-charcoal px-5 py-2 font-medium disabled:opacity-50">
            {saving ? "Saving..." : editingId ? "Save changes" : "Add service"}
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
          {services.map((s) => (
            <div key={s._id} className="flex justify-between items-center border border-white/10 px-4 py-3">
              <div>
                <p className="font-medium">{s.title}</p>
                <p className="text-mute text-sm">{s.category} · order {s.order} · {s.slug}</p>
              </div>
              <div className="flex gap-4 text-sm">
                <button onClick={() => startEdit(s)} className="underline">Edit</button>
                <button onClick={() => handleDelete(s._id)} className="underline text-red-300">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}