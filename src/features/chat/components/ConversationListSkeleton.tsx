export default function ConversationListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="bg-linear-to-tl from-white to-gray-50 shadow-inner border-s border-gray-100 overflow-y-auto h-screen p-3">
      <div className="overflow-y-auto">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex items-start gap-3 bg-white rounded p-3 mb-3 shadow-sm border border-gray-100 animate-pulse"
          >
            {/* Avatar Skeleton */}
            <div className="bg-gray-200 rounded-full w-12 h-12 shrink-0" />

            <div className="flex-1 min-w-0 space-y-3">
              {/* Name & Badge Row */}
              <div className="flex items-center gap-2">
                <div className="h-5 bg-gray-200 rounded w-32" />
                {index === 0 && (
                  <div className="h-5 bg-gray-200 rounded-full w-8" />
                )}
              </div>

              {/* Phone Number */}
              <div className="h-4 bg-gray-200 rounded w-36" />

              {/* Last Message Preview */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}