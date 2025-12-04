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
        <div className="flex items-center justify-center md:justify-between px-2 sm:px-4 py-3 sm:py-4 flex-col md:flex-row bg-elegant-card border-t border-elegant-purple w-full flex-wrap gap-2">
            <div className="flex items-center gap-2">
                <p className="text-xs sm:text-sm text-text-secondary">
                    Page <span className="font-semibold text-accent-purple">{page}</span> of{" "}
                    <span className="font-semibold text-accent-purple">{totalPages}</span>
                </p>
                <span className="text-xs text-text-muted">
                    ({total} total)
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={isFirstPage || disabled}
                    className={`flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${isFirstPage || disabled
                            ? "bg-black-700 text-text-muted cursor-not-allowed opacity-50"
                            : "bg-accent-purple text-text-primary hover-elegant shadow-elegant-purple cursor-pointer"
                        }`}
                >
                    <BiChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={isLastPage || disabled}
                    className={`flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${isLastPage || disabled
                            ? "bg-black-700 text-text-muted cursor-not-allowed opacity-50"
                            : "bg-accent-purple text-text-primary hover-elegant shadow-elegant-purple cursor-pointer"
                        }`}
                >
                    <span className="hidden sm:inline">Next</span>
                    <BiChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
