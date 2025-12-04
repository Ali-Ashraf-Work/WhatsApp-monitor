export default function MessageSkeleton() {
    return (
        <div className="flex flex-col gap-4 p-4 sm:p-6 bg-elegant-subtle animate-pulse">
            {/* Incoming message skeleton */}
            <div className="flex w-full justify-start">
                <div className="flex flex-col max-w-[75%] items-start">
                    <div className="h-3 w-20 bg-black-600 rounded mb-1"></div>
                    <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-elegant-card border border-elegant h-12 w-48"></div>
                    <div className="h-3 w-12 bg-black-700 rounded mt-1"></div>
                </div>
            </div>

            {/* Outgoing message skeleton */}
            <div className="flex w-full justify-end">
                <div className="flex flex-col max-w-[75%] items-end">
                    <div className="h-3 w-20 bg-black-600 rounded mb-1"></div>
                    <div className="rounded-2xl rounded-tr-none px-4 py-3 bg-elegant-elevated border border-accent-purple/30 h-16 w-64"></div>
                    <div className="h-3 w-12 bg-black-700 rounded mt-1"></div>
                </div>
            </div>

            {/* Incoming message skeleton */}
            <div className="flex w-full justify-start">
                <div className="flex flex-col max-w-[75%] items-start">
                    <div className="h-3 w-20 bg-black-600 rounded mb-1"></div>
                    <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-elegant-card border border-elegant h-20 w-56"></div>
                    <div className="h-3 w-12 bg-black-700 rounded mt-1"></div>
                </div>
            </div>

            {/* Outgoing message skeleton */}
            <div className="flex w-full justify-end">
                <div className="flex flex-col max-w-[75%] items-end">
                    <div className="h-3 w-20 bg-black-600 rounded mb-1"></div>
                    <div className="rounded-2xl rounded-tr-none px-4 py-3 bg-elegant-elevated border border-accent-purple/30 h-14 w-52"></div>
                    <div className="h-3 w-12 bg-black-700 rounded mt-1"></div>
                </div>
            </div>
        </div>
    );
}
