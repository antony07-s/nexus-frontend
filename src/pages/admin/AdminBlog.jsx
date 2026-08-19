import { useEffect, useState } from "react";
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "../../api/client.js";
import AdminNav from "../../components/AdminNav.jsx";

const emptyForm = { title: "", slug: "", excerpt: "", content: "", tagsText: "", coverImage: "" };

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    getBlogPosts({ limit: 100 })
      .then((res) => setPosts(res.data.data))
      .catch(() => setError("Failed to load blog posts."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startEdit = (p) => {
    setEditingId(p._id);
    setForm({
      title: p.title, slug: p.slug, excerpt: p.excerpt || "", content: p.content || "",
      tagsText: (p.tags || []).join(", "), coverImage: p.coverImage || "",
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
      tags: form.tagsText.split(",").map((s) => s.trim()).filter(Boolean),
    };
    delete payload.tagsText;
    try {
      if (editingId) await updateBlogPost(editingId, payload);
      else await createBlogPost(payload);
      cancelEdit();
      load();
    } catch {
      setError("Save failed — check your fields and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this post?")) return;
    try {
      await deleteBlogPost(id);
      load();
    } catch {
      setError("Delete failed.");
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16">
      <AdminNav />
      <h1 className="font-display text-3xl mb-10">Admin · Blog</h1>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 mb-16 border border-white/10 p-6">
        <h2 className="sm:col-span-2 font-display text-xl mb-2">
          {editingId ? "Edit post" : "Add new post"}
        </h2>
        <input placeholder="Title" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="bg-charcoal-panel border border-white/10 px-3 py-2" required />
        <input placeholder="Slug" value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="bg-charcoal-panel border border-white/10 px-3 py-2" required />
        <input placeholder="Cover image URL" value={form.coverImage}
          onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
          className="sm:col-span-2 bg-charcoal-panel border border-white/10 px-3 py-2" />
        <textarea placeholder="Excerpt" value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          className="sm:col-span-2 bg-charcoal-panel border border-white/10 px-3 py-2" rows={2} />
        <textarea placeholder="Full content" value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="sm:col-span-2 bg-charcoal-panel border border-white/10 px-3 py-2" rows={4} />
        <input placeholder="Tags, comma separated" value={form.tagsText}
          onChange={(e) => setForm({ ...form, tagsText: e.target.value })}
          className="sm:col-span-2 bg-charcoal-panel border border-white/10 px-3 py-2" />
        <div className="sm:col-span-2 flex gap-3">
          <button type="submit" disabled={saving}
            className="bg-brass text-charcoal px-5 py-2 font-medium disabled:opacity-50">
            {saving ? "Saving..." : editingId ? "Save changes" : "Add post"}
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
          {posts.map((p) => (
            <div key={p._id} className="flex justify-between items-center border border-white/10 px-4 py-3">
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-mute text-sm">{(p.tags || []).join(", ")} · {p.slug}</p>
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