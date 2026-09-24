import { useState } from 'react';
import { X } from 'lucide-react';


const categories = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Design',
    'DevOps',
    'Programming',
    'General'
];

const AddSkillModal = ({ title, onClose, onSubmit }) => {
    const [skill, setSkill] = useState('');
    const [level, setLevel] = useState('Beginner');
    const [category, setCategory] = useState('General');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-xl dark:shadow-emerald-500/10 transition-all">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
                    <button onClick={onClose} className="rounded-lg p-1 text-gray-400 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-gray-600 dark:text-slate-400">Skill Name</label>
                        <input
                            type="text"
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            placeholder="e.g. React, UI/UX Design"
                            className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-gray-600 dark:text-slate-400">Level</label>
                        <div className="flex gap-2">
                            {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                                <button
                                    key={lvl}
                                    onClick={() => setLevel(lvl)}
                                    className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition-all duration-200 ${
                                        level === lvl
                                            ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                            : 'border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700/50'
                                    }`}
                                >
                                    {lvl}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-gray-600 dark:text-slate-400">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-800/50 p-3 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition appearance-none"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800/50 py-3 text-sm font-semibold text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onSubmit(skill, level, category)}
                            disabled={!skill.trim()}
                            className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-sky-400 py-3 text-sm font-bold text-white dark:text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Add Skill
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSkillModal;
