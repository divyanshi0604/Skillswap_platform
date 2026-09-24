import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

const SkillSearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const timerRef = useRef(null);

    useEffect(() => {
        // Debounce: wait 300ms after user stops typing
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            onSearch(query.trim());
        }, 300);

        return () => clearTimeout(timerRef.current);
    }, [query]);

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <div className="relative w-full max-w-xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400" />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills, categories..."
                className="w-full rounded-xl border border-gray-200 bg-white/60 dark:border-white/10 dark:bg-slate-800/60 py-3 pl-11 pr-10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition backdrop-blur-sm"
            />
            {query && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white transition"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
};

export default SkillSearchBar;
