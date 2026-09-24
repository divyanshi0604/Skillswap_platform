import { useState } from 'react';
import { MapPin, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import RequestButton from './RequestButton';
import ExchangeRequestModal from './ExchangeRequestModal';

const levelColors = {
    Advanced: 'bg-teal-50 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400',
    Intermediate: 'bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400',
    Beginner: 'bg-gray-100 dark:bg-slate-500/20 text-gray-600 dark:text-slate-400',
};

const MarketplaceSkillCard = ({ skill, onRequest, currentUserSkills = [] }) => {
    const user = skill.userId;
    const userName = user?.name || 'Unknown User';
    const userLocation = user?.location || '';
    const badgeClass = levelColors[skill.level] || levelColors.Beginner;
    const [modalOpen, setModalOpen] = useState(false);

    // If user document is missing (deleted), render a minimal card without crashing
    if (!user) {
        return (
            <div className="group relative flex flex-col rounded-2xl border border-gray-200 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 p-5 shadow-sm backdrop-blur-xl">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-500 mb-3">{skill.category || 'General'}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{skill.title}</h3>
                <span className={`text-xs px-2.5 py-0.5 rounded-full w-fit mb-3 ${badgeClass}`}>{skill.level}</span>
            </div>
        );
    }

    const handleModalSubmit = async (skillId, offeredSkill) => {
        await onRequest(skillId, offeredSkill);
    };

    return (
        <div className="group relative flex flex-col rounded-2xl border border-gray-200 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1">
            {/* Category Tag */}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-500 mb-3">
                {skill.category || 'General'}
            </span>

            {/* Skill Title + Level */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{skill.title}</h3>
            <span className={`text-xs px-2.5 py-0.5 rounded-full w-fit mb-3 ${badgeClass}`}>
                {skill.level}
            </span>

            {/* Description */}
            {skill.description && (
                <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 line-clamp-2">{skill.description}</p>
            )}

            {/* Divider */}
            <div className="mt-auto border-t border-gray-100 dark:border-white/5 pt-4">
                {/* User Info */}
                <Link to={`/user/${user._id || user}`} className="flex items-center gap-3 mb-4 p-2 -ml-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group/user">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-400 to-sky-400 text-white dark:text-slate-950 transition-transform group-hover/user:scale-105">
                        <UserIcon size={16} strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover/user:text-emerald-600 dark:group-hover/user:text-emerald-400 transition-colors">{userName}</p>
                        {userLocation && (
                            <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
                                <MapPin size={11} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                                <span className="truncate">{userLocation}</span>
                            </p>
                        )}
                    </div>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <RequestButton onRequest={() => setModalOpen(true)} />
                </div>
            </div>

            {/* Exchange Modal */}
            {modalOpen && (
                <ExchangeRequestModal
                    skill={skill}
                    mySkills={currentUserSkills}
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleModalSubmit}
                />
            )}
        </div>
    );
};

export default MarketplaceSkillCard;
