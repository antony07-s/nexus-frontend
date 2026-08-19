import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      role="alert"
      className={`fixed bottom-6 right-6 z-[100] max-w-sm px-5 py-4 border shadow-lg flex items-start gap-3 animate-[fadeIn_0.2s_ease-out] ${
        isSuccess
          ? "bg-charcoal-panel border-brass/40 text-ivory"
          : "bg-charcoal-panel border-red-400/40 text-ivory"
      }`}
    >
      <span className={`text-lg leading-none ${isSuccess ? "text-brass" : "text-red-400"}`}>
        {isSuccess ? "✓" : "✕"}
      </span>
      <p className="text-sm leading-relaxed flex-1">{message}</p>
      <button onClick={onClose} aria-label="Dismiss" className="text-mute hover:text-ivory text-sm">
        ✕
      </button>
    </div>
  );
}