import { useState } from "react";
import { submitContactForm } from "../api/client.js";

const initialState = {
  name: "",
  email: "",
  contactNo: "",
  budget: "",
  projectType: "Residential",
  siteAddress: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ state: "idle", error: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", error: "" });
    try {
      await submitContactForm(form);
      setStatus({ state: "success", error: "" });
      setForm(initialState);
    } catch (err) {
      setStatus({
        state: "error",
        error: err.response?.data?.error || "Something went wrong. Please try again.",
      });
    }
  };

  if (status.state === "success") {
    return (
      <div className="bg-charcoal-panel border border-brass/40 p-10 text-center">
        <h3 className="font-display text-2xl text-brass mb-2">Message sent.</h3>
        <p className="text-mute">We'll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name *"
        required
        className="w-full bg-charcoal-panel border border-white/10 px-5 py-4 text-ivory placeholder:text-mute focus:border-brass outline-none"
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email address *"
        required
        className="w-full bg-charcoal-panel border border-white/10 px-5 py-4 text-ivory placeholder:text-mute focus:border-brass outline-none"
      />
      <input
        name="contactNo"
        value={form.contactNo}
        onChange={handleChange}
        placeholder="Contact No *"
        required
        className="w-full bg-charcoal-panel border border-white/10 px-5 py-4 text-ivory placeholder:text-mute focus:border-brass outline-none"
      />
      <input
        name="budget"
        value={form.budget}
        onChange={handleChange}
        placeholder="Budget"
        className="w-full bg-charcoal-panel border border-white/10 px-5 py-4 text-ivory placeholder:text-mute focus:border-brass outline-none"
      />
      <div>
        <label className="block text-sm text-mute mb-2">Project Type</label>
        <select
          name="projectType"
          value={form.projectType}
          onChange={handleChange}
          className="w-full bg-charcoal-panel border border-white/10 px-5 py-4 text-ivory focus:border-brass outline-none"
        >
          <option>Residential</option>
          <option>Commercial</option>
          <option>Renovation</option>
          <option>IT / Technology</option>
          <option>Other</option>
        </select>
      </div>
      <input
        name="siteAddress"
        value={form.siteAddress}
        onChange={handleChange}
        placeholder="Site Address / Location"
        className="w-full bg-charcoal-panel border border-white/10 px-5 py-4 text-ivory placeholder:text-mute focus:border-brass outline-none"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Tell us about the project"
        rows={4}
        className="w-full bg-charcoal-panel border border-white/10 px-5 py-4 text-ivory placeholder:text-mute focus:border-brass outline-none"
      />

      {status.state === "error" && (
        <p className="text-red-400 text-sm">{status.error}</p>
      )}

      <button type="submit" disabled={status.state === "loading"} className="btn-primary w-full justify-center">
        {status.state === "loading" ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
}
