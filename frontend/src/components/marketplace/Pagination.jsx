import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    // Build page numbers to show (max 5 visible)
    const getPages = () => {
        const pages = [];
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + 4);
        start = Math.max(1, end - 4);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pages = getPages();

    return (
        <div className="flex items-center justify-center gap-1.5 pt-8">
            {/* Prev */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-lg border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-slate-800/60 px-3 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 transition hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Page Numbers */}
            {pages[0] > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="rounded-lg border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-slate-800/60 px-3 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 transition hover:bg-gray-50 dark:hover:bg-slate-700"
                    >
                        1
                    </button>
                    {pages[0] > 2 && (
                        <span className="px-1.5 text-gray-400 dark:text-slate-500">…</span>
                    )}
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                        page === currentPage
                            ? 'border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                            : 'border-gray-200 dark:border-white/10 bg-white/60 dark:bg-slate-800/60 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                >
                    {page}
                </button>
            ))}

            {pages[pages.length - 1] < totalPages && (
                <>
                    {pages[pages.length - 1] < totalPages - 1 && (
                        <span className="px-1.5 text-gray-400 dark:text-slate-500">…</span>
                    )}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="rounded-lg border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-slate-800/60 px-3 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 transition hover:bg-gray-50 dark:hover:bg-slate-700"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {/* Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 rounded-lg border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-slate-800/60 px-3 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 transition hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default Pagination;
