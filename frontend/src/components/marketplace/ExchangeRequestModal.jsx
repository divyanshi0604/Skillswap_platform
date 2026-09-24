import { useState } from 'react';
import { X, BookOpen, ArrowRight, Send, AlertCircle } from 'lucide-react';

const LEVEL_STYLES = {
    Advanced: 'bg-teal-50 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400',
    Intermediate: 'bg-amber-50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    Beginner: 'bg-gray-100 text-gray-600 dark:bg-slate-500/20 dark:text-slate-400',
};

const ExchangeRequestModal = ({ skill, mySkills = [], onClose, onSubmit }) => {
    const [selectedSkillIdx, setSelectedSkillIdx] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const hasMySkills = mySkills.length > 0;
    const selectedSkill = selectedSkillIdx !== '' ? mySkills[parseInt(selectedSkillIdx)] : null;

    const handleSubmit = async () => {
        if (!selectedSkill) return;
        setSubmitting(true);
        try {
            await onSubmit(skill._id, { name: selectedSkill.name, level: selectedSkill.level });
            onClose();
        } catch {
            // error handled by parent
        } finally {
            setSubmitting(false);
        }
    };

    return (
        // Backdrop
        <div
            className="fixed inset-0 z-300 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900 animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/10 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <Send size={18} className="text-emerald-600 dark:text-emerald-400" />
                        <h2 className="text-base font-bold text-gray-900 dark:text-white">Propose a Skill Exchange</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    {/* Skill to Learn (read-only) */}
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-500">
                            Skill You Want to Learn
                        </p>
                        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-white/10 dark:bg-slate-800/60">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-500/20">
                                <BookOpen size={16} className="text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">{skill.title}</p>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${LEVEL_STYLES[skill.level] || LEVEL_STYLES.Beginner}`}>
                                    {skill.level}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Arrow separator */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-px flex-1 bg-gray-100 dark:bg-white/10" />
                        <ArrowRight size={16} className="shrink-0 text-gray-400 dark:text-slate-500" />
                        <div className="h-px flex-1 bg-gray-100 dark:bg-white/10" />
                    </div>

                    {/* Skill to Offer */}
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-500">
                            Skill You Offer in Return
                        </p>
                        {hasMySkills ? (
                            <select
                                value={selectedSkillIdx}
                                onChange={(e) => setSelectedSkillIdx(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                            >
                                <option value="">— Select a skill to offer —</option>
                                {mySkills.map((s, i) => (
                                    <option key={i} value={i}>
                                        {s.name} ({s.level || 'Beginner'})
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
                                <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                                <p className="text-sm text-amber-700 dark:text-amber-400">
                                    You haven't added any skills to offer yet.{' '}
                                    <a href="/profile" className="font-semibold underline hover:text-amber-600">
                                        Go to your Profile
                                    </a>{' '}
                                    to add skills first.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Preview of selected skill */}
                    {selectedSkill && (
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 dark:border-emerald-500/20 dark:bg-emerald-500/5 text-sm text-emerald-700 dark:text-emerald-400">
                            You are offering <span className="font-semibold">{selectedSkill.name}</span>{' '}
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${LEVEL_STYLES[selectedSkill.level] || LEVEL_STYLES.Beginner}`}>
                                {selectedSkill.level}
                            </span>{' '}
                            in exchange for <span className="font-semibold">{skill.title}</span>.
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-gray-100 dark:border-white/10 px-6 py-4">
                    <button
                        onClick={onClose}
                        className="rounded-xl px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-white/10 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedSkill || submitting || !hasMySkills}
                        className="flex items-center gap-2 rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 dark:from-emerald-400 dark:to-sky-400 dark:text-slate-950"
                    >
                        <Send size={14} />
                        {submitting ? 'Sending…' : 'Send Request'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExchangeRequestModal;
