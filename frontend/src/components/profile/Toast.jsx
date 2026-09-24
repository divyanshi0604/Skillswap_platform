import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const variants = {
    success: {
        border: 'border-emerald-500/20',
        bg: 'bg-white dark:bg-slate-900/95',
        shadow: 'shadow-emerald-500/10',
        text: 'text-emerald-600 dark:text-emerald-400',
        iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
        Icon: CheckCircle
    },
    error: {
        border: 'border-rose-500/20',
        bg: 'bg-white dark:bg-slate-900/95',
        shadow: 'shadow-rose-500/10',
        text: 'text-rose-600 dark:text-rose-400',
        iconBg: 'bg-rose-50 dark:bg-rose-500/10',
        Icon: AlertCircle
    }
};

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
    const [visible, setVisible] = useState(false);
    const v = variants[type] || variants.success;
    const Icon = v.Icon;

    useEffect(() => {
        const showTimer = setTimeout(() => setVisible(true), 10);
        const hideTimer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300);
        }, duration);
        return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
    }, [duration, onClose]);

    return (
        <div
            className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 rounded-xl border ${v.border} ${v.bg} px-5 py-3.5 shadow-2xl ${v.shadow} backdrop-blur-xl transition-all duration-300 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
        >
            <div className={`p-1.5 rounded-full ${v.iconBg}`}>
                <Icon size={18} className={`${v.text} shrink-0`} />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-slate-200">{message}</span>
            <button
                onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
                className="ml-2 rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-slate-500 dark:hover:bg-white/10 transition-colors"
            >
                <X size={14} />
            </button>
        </div>
    );
};

export default Toast;
