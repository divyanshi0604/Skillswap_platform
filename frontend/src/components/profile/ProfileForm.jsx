import { useState } from 'react';

const ProfileForm = ({ profile, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: profile.name || '',
        bio: profile.bio || '',
        location: profile.location || '',
        phone: profile.phone || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="rounded-2xl border border-emerald-500/20 bg-white/80 dark:bg-slate-900/80 p-8 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Edit Profile Details</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-600 dark:text-slate-300">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-800 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-600 dark:text-slate-300">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. San Francisco, Remote"
                        className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-800 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-600 dark:text-slate-300">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-800 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                    />
                    <p className="mt-1 text-xs text-gray-400 dark:text-slate-500">Shared only with users whose skill requests you accept.</p>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-600 dark:text-slate-300">Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Tell the community about yourself..."
                        className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-800 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition resize-none"
                    ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/10">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-xl px-5 py-2.5 font-medium text-gray-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-sky-400 px-6 py-2.5 font-semibold text-white dark:text-slate-950 shadow-sm transition hover:brightness-110"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;
