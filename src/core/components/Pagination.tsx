import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function Pagination({
    page,
    setPage,
    limit,
    total,
    disabled,
}: {
    page: number;
    setPage: (page: number) => void;
    limit: number;
    total: number;
    disabled?: boolean;
}) {
    const totalPages = Math.ceil(total / limit);
    const isFirstPage = page === 1;
    const isLastPage = page === totalPages;

    return (
        <div className="flex items-center justify-center md:justify-between px-4 py-5 flex-col md:flex-row bg-white border-b border-gray-200 w-full flex-wrap">
            <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">
                    Page <span className="font-semibold text-gray-900">{page}</span> of{" "}
                    <span className="font-semibold text-gray-900">{totalPages}</span>
                </p>
                <span className="text-xs text-gray-400">
                    ({total} total)
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={isFirstPage || disabled}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isFirstPage || disabled
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-brand-primary-100 text-gray-700 hover:bg-brand-primary-200 cursor-pointer"
                        }`}
                >
                    <BiChevronLeft className="w-4 h-4" />
                    Previous
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={isLastPage || disabled}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isLastPage || disabled
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-brand-primary-100 text-gray-700 hover:bg-brand-primary-200 cursor-pointer"
                        }`}
                >
                    Next
                    <BiChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
