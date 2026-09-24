import { useState } from 'react';
import { Send, Check, Loader2 } from 'lucide-react';

const RequestButton = ({ onRequest }) => {
    const [state, setState] = useState('idle'); // idle | loading | sent | error

    const handleClick = async () => {
        if (state === 'loading' || state === 'sent') return;
        setState('loading');
        try {
            await onRequest();
            setState('sent');
        } catch (err) {
            const msg = err?.response?.data?.message || '';
            if (msg.includes('already requested')) {
                setState('sent');
            } else {
                setState('error');
                setTimeout(() => setState('idle'), 2000);
            }
        }
    };

    if (state === 'sent') {
        return (
            <button
                disabled
                className="flex items-center gap-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 cursor-default"
            >
                <Check size={14} />
                Requested
            </button>
        );
    }

    if (state === 'loading') {
        return (
            <button
                disabled
                className="flex items-center gap-1.5 rounded-lg bg-gray-100 dark:bg-slate-700/50 px-3 py-2 text-xs font-medium text-gray-500 dark:text-slate-400 border border-gray-200 dark:border-white/10 cursor-wait"
            >
                <Loader2 size={14} className="animate-spin" />
                Sending...
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-500/20 dark:to-sky-500/20 px-3 py-2 text-xs font-semibold text-white dark:text-white border border-emerald-500/20 dark:border-emerald-500/20 hover:from-emerald-600 hover:to-emerald-700 dark:hover:from-emerald-500/30 dark:hover:to-sky-500/30 transition-all duration-200"
        >
            <Send size={14} />
            Request Skill
        </button>
    );
};

export default RequestButton;
