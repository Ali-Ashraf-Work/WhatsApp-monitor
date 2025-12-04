export default function ConversationListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex-1 overflow-y-auto p-2 sm:p-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-start gap-2 sm:gap-3 bg-elegant-card rounded-lg p-2 sm:p-3 mb-2 border border-elegant animate-pulse"
        >
          {/* Avatar Skeleton */}
          <div className="bg-linear-to-br from-black-600 to-black-500 rounded-full w-10 h-10 sm:w-12 sm:h-12 shrink-0" />

          <div className="flex-1 min-w-0 space-y-2">
            {/* Name & Badge Row */}
            <div className="flex items-center gap-2">
              <div className="h-4 bg-black-600 rounded w-32" />
              {index === 0 && (
                <div className="h-4 bg-accent-rose/30 rounded-full w-8" />
              )}
            </div>

            {/* Phone Number */}
            <div className="h-3 bg-black-700 rounded w-28" />

            {/* Last Message Preview */}
            <div className="space-y-1.5">
              <div className="h-3 bg-black-700 rounded w-full" />
              <div className="h-3 bg-black-700 rounded w-3/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}