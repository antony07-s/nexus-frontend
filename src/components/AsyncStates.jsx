export function LoadingGrid({ count = 6 }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/3] bg-charcoal-panel border border-white/10 mb-4" />
          <div className="h-4 bg-charcoal-panel w-3/4 mb-2" />
          <div className="h-3 bg-charcoal-panel w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function ErrorState({ message = "Couldn't load this content right now." }) {
  return (
    <div className="border border-red-400/30 bg-red-400/5 p-8 text-center">
      <p className="text-red-300">{message}</p>
    </div>
  );
}

export function EmptyState({ message }) {
  return <p className="text-mute">{message}</p>;
}