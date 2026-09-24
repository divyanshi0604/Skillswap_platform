import { MapPin, User as UserIcon, Layers, BookOpen } from 'lucide-react';

const ProfileHeader = ({ profile, onEditClick }) => {
    const offeredCount = profile.skillsOffered?.length || 0;
    const wantedCount = profile.skillsWanted?.length || 0;

    return (
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 p-8 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex items-center gap-6">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-400 to-sky-400 text-white dark:text-slate-950 shadow-lg">
                    <UserIcon size={40} strokeWidth={2.5} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{profile.name}</h1>
                    <p className="text-gray-600 dark:text-slate-400 mb-3">{profile.email}</p>

                    {/* Location Badge */}
                    <div className="flex flex-wrap gap-3 mb-3">
                        {profile.location && (
                            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-slate-700/40 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-200 dark:border-white/5">
                                <span className="text-base leading-none">📍</span>
                                {profile.location}
                            </div>
                        )}
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <Layers size={13} className="text-emerald-600 dark:text-emerald-400" />
                            <span>Skills Offered: <span className="text-gray-900 dark:text-white font-semibold">{offeredCount}</span></span>
                        </div>
                        <span className="text-gray-300 dark:text-slate-600">|</span>
                        <div className="flex items-center gap-1.5">
                            <BookOpen size={13} className="text-sky-600 dark:text-sky-400" />
                            <span>Skills Wanted: <span className="text-gray-900 dark:text-white font-semibold">{wantedCount}</span></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-auto md:max-w-xs text-left md:text-right">
                {profile.bio ? (
                    <p className="text-sm text-gray-700 dark:text-slate-300 italic mb-4">"{profile.bio}"</p>
                ) : (
                    <p className="text-sm text-gray-400 dark:text-slate-500 italic mb-4">No bio added yet.</p>
                )}

                <button
                    onClick={onEditClick}
                    className="w-full md:w-auto rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800/80 px-5 py-2.5 font-medium text-gray-700 dark:text-slate-200 shadow-sm backdrop-blur-md transition hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default ProfileHeader;
