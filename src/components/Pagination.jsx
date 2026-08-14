export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  return (
    <nav className="mt-12 flex items-center justify-center gap-3" aria-label="Pagination">
      <button className="btn-outline px-4 py-2 disabled:opacity-40" disabled={page === 1} onClick={() => onChange(page - 1)}>Previous</button>
      <span className="text-sm text-mute" aria-live="polite">Page {page} of {pages}</span>
      <button className="btn-outline px-4 py-2 disabled:opacity-40" disabled={page === pages} onClick={() => onChange(page + 1)}>Next</button>
    </nav>
  );
}
