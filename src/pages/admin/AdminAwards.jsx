import { useEffect, useState } from "react";
import { getAwards, createAward, updateAward, deleteAward } from "../../api/client.js";
import AdminNav from "../../components/AdminNav.jsx";

const emptyForm = { title: "", subtitle: "", year: new Date().getFullYear(), order: 1 };

export default function AdminAwards() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    getAwards()
      .then((res) => setAwards(res.data.data))
      .catch(() => setError("Failed to load awards."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startEdit = (a) => {
    setEditingId(a._id);
    setForm({ title: a.title, subtitle: a.subtitle || "", year: a.year, order: a.order || 1 });
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
      if (editingId) await updateAward(editingId, form);
      else await createAward(form);
      cancelEdit();
      load();
    } catch {
      setError("Save failed — check your fields and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this award?")) return;
    try {
      await deleteAward(id);
      load();
    } catch {
      setError("Delete failed.");
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16">
      <AdminNav />
      <h1 className="font-display text-3xl mb-10">Admin · Awards</h1>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 mb-16 border border-white/10 p-6">
        <h2 className="sm:col-span-2 font-display text-xl mb-2">
          {editingId ? "Edit award" : "Add new award"}
        </h2>
        <input placeholder="Title" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="sm:col-span-2 bg-charcoal-panel border border-white/10 px-3 py-2" required />
        <input placeholder="Subtitle" value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          className="sm:col-span-2 bg-charcoal-panel border border-white/10 px-3 py-2" />
        <input placeholder="Year" type="number" value={form.year}
          onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
          className="bg-charcoal-panel border border-white/10 px-3 py-2" />
        <input placeholder="Order" type="number" value={form.order}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          className="bg-charcoal-panel border border-white/10 px-3 py-2" />
        <div className="sm:col-span-2 flex gap-3">
          <button type="submit" disabled={saving}
            className="bg-brass text-charcoal px-5 py-2 font-medium disabled:opacity-50">
            {saving ? "Saving..." : editingId ? "Save changes" : "Add award"}
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
          {awards.map((a) => (
            <div key={a._id} className="flex justify-between items-center border border-white/10 px-4 py-3">
              <div>
                <p className="font-medium">{a.title}</p>
                <p className="text-mute text-sm">{a.subtitle} · {a.year}</p>
              </div>
              <div className="flex gap-4 text-sm">
                <button onClick={() => startEdit(a)} className="underline">Edit</button>
                <button onClick={() => handleDelete(a._id)} className="underline text-red-300">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}