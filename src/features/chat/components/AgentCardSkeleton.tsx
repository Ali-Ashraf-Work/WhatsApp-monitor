export default function AgentCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-elegant-card border border-elegant p-3 animate-pulse">
      <div className="flex items-center gap-3">
        {/* Avatar skeleton */}
        <div className="shrink-0">
          <div className="h-10 w-10 rounded-full bg-linear-to-br from-black-600 to-black-500" />
        </div>

        {/* Content skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-black-600 rounded" />
          <div className="h-3 w-24 bg-black-700 rounded" />
        </div>

        {/* Delete button skeleton */}
        <div className="h-8 w-8 rounded-lg bg-black-600" />
      </div>
    </div>
  );
}
