const STATUS_STYLES = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    accepted: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    rejected: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
};

const StatusBadge = ({ status = 'pending' }) => {
    const normalizedStatus = status.toLowerCase();
    const badgeClass = STATUS_STYLES[normalizedStatus] || STATUS_STYLES.pending;
    const label = normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1);

    return (
        <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${badgeClass}`}>
            {label}
        </span>
    );
};

export default StatusBadge;