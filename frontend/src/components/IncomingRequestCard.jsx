import { Check, MapPin, X } from 'lucide-react';
import StatusBadge from './StatusBadge';
import ContactSection from './ContactSection';

const LEVEL_STYLES = {
    Advanced: 'bg-teal-50 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400',
    Intermediate: 'bg-amber-50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    Beginner: 'bg-gray-100 text-gray-600 dark:bg-slate-500/20 dark:text-slate-400'
};

const IncomingRequestCard = ({ request, onUpdateStatus, isUpdating }) => {
    const senderName = request?.senderId?.name || 'Unknown sender';
    const senderLocation = request?.senderId?.location;
    const skillTitle = request?.skillId?.title || 'Skill';
    const skillLevel = request?.skillId?.level || 'Beginner';
    const offeredName = request?.offeredSkill?.name;
    const offeredLevel = request?.offeredSkill?.level || 'Beginner';
    const levelBadgeClass = LEVEL_STYLES[skillLevel] || LEVEL_STYLES.Beginner;
    const offeredBadgeClass = LEVEL_STYLES[offeredLevel] || LEVEL_STYLES.Beginner;
    const isPending = request?.status === 'pending';
    const disableActions = !isPending || isUpdating;

    return (
        <div className="group relative rounded-2xl border border-gray-200 bg-white/60 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-white/10 dark:bg-slate-900/60">
            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">{senderName}</p>
                    {senderLocation && (
                        <p className="mt-1 flex items-center gap-1 text-sm text-gray-500 dark:text-slate-400">
                            <MapPin size={13} className="text-emerald-600 dark:text-emerald-400" />
                            <span>{senderLocation}</span>
                        </p>
                    )}
                </div>
                <StatusBadge status={request.status} />
            </div>

            <div className="mb-4 space-y-3">
                {/* Requested skill */}
                <div className="rounded-xl border border-gray-100 bg-white/80 p-4 dark:border-white/5 dark:bg-slate-800/50">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-500">Wants to Learn</p>
                    <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{skillTitle}</p>
                    <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${levelBadgeClass}`}>
                        {skillLevel}
                    </span>
                </div>
                {/* Offered skill */}
                {offeredName && (
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-500">Offers in Return</p>
                        <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{offeredName}</p>
                        <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${offeredBadgeClass}`}>
                            {offeredLevel}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onUpdateStatus(request._id, 'accepted')}
                    disabled={disableActions}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-500/90 dark:hover:bg-emerald-500"
                >
                    <Check size={15} />
                    Accept
                </button>
                <button
                    onClick={() => onUpdateStatus(request._id, 'rejected')}
                    disabled={disableActions}
                    className="flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
                >
                    <X size={15} />
                    Reject
                </button>
            </div>

            {request.status === 'accepted' && (
                <ContactSection contact={request.senderId} partnerLabel="Connect with" />
            )}
        </div>
    );
};

export default IncomingRequestCard;