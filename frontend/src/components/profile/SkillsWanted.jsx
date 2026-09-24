import { useState } from 'react';
import { Plus } from 'lucide-react';
import SkillCard from './SkillCard';
import AddSkillModal from './AddSkillModal';

const SkillsWanted = ({ skills, onAddSkill, onRemoveSkill }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAdd = (skillName, level, category) => {
        onAddSkill(skillName, level, category);
        setIsModalOpen(false);
    };

    return (
        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 p-6 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Skills Wanted</h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Skills you want to learn</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 px-3 py-2 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-colors border border-sky-200 dark:border-sky-500/20"
                >
                    <Plus size={16} />
                    Add Skill
                </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                {skills.length > 0 ? (
                    skills.map((skill, idx) => (
                        <SkillCard
                            key={idx}
                            skill={skill}
                            onDelete={onRemoveSkill}
                            colorTone="sky"
                        />
                    ))
                ) : (
                    <div className="col-span-full py-8 text-center border border-dashed border-gray-300 dark:border-white/10 rounded-xl bg-gray-50/50 dark:bg-slate-800/30">
                        <p className="text-gray-500 dark:text-slate-400 mb-2">You haven't requested any skills to learn yet.</p>
                        <button onClick={() => setIsModalOpen(true)} className="text-sm text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium">Add a desired skill</button>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <AddSkillModal
                    title="Add a Skill Wanted"
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAdd}
                />
            )}
        </div>
    );
};

export default SkillsWanted;
