import { useState } from "react";
import { submitContactForm } from "../api/client.js";
import Toast from "./Toast.jsx";

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
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContactForm(form);
      setToast({ message: "Message sent — we'll get back to you within one business day.", type: "success" });
      setForm(initialState);
    } catch (err) {
      setToast({
        message: err.response?.data?.error || "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm text-mute mb-1">
            Name <span className="text-brass">*</span>
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-charcoal-panel border border-white/10 px-5 py-4 text-ivory placeholder:text-mute focus:border-brass outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-mute mb-1">
            Email address <span className="text-brass">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-charcoal-panel border border-white/10 px-5 py-4 text-ivory placeholder:text-mute focus:border-brass outline-none"
          />
        </div>

        <div>
          <label htmlFor="contactNo" className="block text-sm text-mute mb-1">
            Contact No <span className="text-brass">*</span>
          </label>
          <input
            id="contactNo"
            name="contactNo"
            value={form.contactNo}
            onChange={handleChange}
            required
            className="w-full bg-charcoal-panel border border-white/10 px-5 py-4 text-ivory placeholder:text-mute focus:border-brass outline-none"
          />
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm text-mute mb-1">Budget</label>
          <input
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="w-full bg-charcoal-panel border border-white/10 px-5 py-4 text-ivory placeholder:text-mute focus:border-brass outline-none"
          />
        </div>

        <div>
          <label htmlFor="projectType" className="block text-sm text-mute mb-1">Project Type</label>
          <select
            id="projectType"
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

        <div>
          <label htmlFor="siteAddress" className="block text-sm text-mute mb-1">Site Address / Location</label>
          <input
            id="siteAddress"
            name="siteAddress"
            value={form.siteAddress}
            onChange={handleChange}
            className="w-full bg-charcoal-panel border border-white/10 px-5 py-4 text-ivory placeholder:text-mute focus:border-brass outline-none"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm text-mute mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about the project"
            className="w-full bg-charcoal-panel border border-white/10 px-5 py-4 text-ivory placeholder:text-mute focus:border-brass outline-none"
          />
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
          {submitting ? "Sending..." : "Send Message →"}
        </button>
      </form>
    </>
  );
}