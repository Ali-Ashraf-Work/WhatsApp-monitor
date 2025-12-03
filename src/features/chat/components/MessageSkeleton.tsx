export default function MessageSkeleton() {
    return (
        <div className="flex flex-col gap-4 p-4 animate-pulse">
            {/* Incoming message skeleton */}
            <div className="flex w-full justify-start">
                <div className="flex flex-col max-w-[75%] items-start">
                    <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
                    <div className="rounded-2xl rounded-tl-none px-4 py-2 bg-gray-100 h-10 w-48"></div>
                    <div className="h-3 w-12 bg-gray-200 rounded mt-1"></div>
                </div>
            </div>

            {/* Outgoing message skeleton */}
            <div className="flex w-full justify-end">
                <div className="flex flex-col max-w-[75%] items-end">
                    <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
                    <div className="rounded-2xl rounded-tr-none px-4 py-2 bg-gray-200 h-16 w-64"></div>
                    <div className="h-3 w-12 bg-gray-200 rounded mt-1"></div>
                </div>
            </div>

            {/* Incoming message skeleton */}
            <div className="flex w-full justify-start">
                <div className="flex flex-col max-w-[75%] items-start">
                    <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
                    <div className="rounded-2xl rounded-tl-none px-4 py-2 bg-gray-100 h-24 w-56"></div>
                    <div className="h-3 w-12 bg-gray-200 rounded mt-1"></div>
                </div>
            </div>
        </div>
    );
}
