export default function AgentCardSkeleton() {
  return (
    <div className="group relative overflow-hidden border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        {/* Avatar skeleton */}
        <div className="shrink-0">
          <div className="h-12 w-12 rounded-full bg-linear-to-br from-gray-200 to-gray-300 animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
        </div>

        {/* Delete button skeleton */}
        <div className="h-9 w-9 rounded-lg bg-gray-100 animate-pulse" />
      </div>
    </div>
  );
}
