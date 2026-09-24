import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, MapPin, User as UserIcon, Sun, Moon, Briefcase, GraduationCap, CheckCircle, X } from 'lucide-react';
import SkillCard from '../components/profile/SkillCard';
import ExchangeRequestModal from '../components/marketplace/ExchangeRequestModal';
import { Helmet } from "react-helmet";

const PublicProfile = () => {
    const { userId } = useParams();
    const { user } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [mySkills, setMySkills] = useState([]);
    const [marketplaceSkills, setMarketplaceSkills] = useState([]);
    const [modalSkill, setModalSkill] = useState(null);
    const [toast, setToast] = useState(null);


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, { headers: { 'user-email': user?.email } });
                setProfile(data);
                setError('');
            } catch {
                setError('Failed to load user profile. They might not exist.');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchProfile();
        }
    }, [userId, user?.email]);

    // Fetch marketplace Skill docs for this profile user (to get proper _id)
    useEffect(() => {
        if (!userId) return;
        axios.get(`${import.meta.env.VITE_API_URL}/api/skills?userId=${userId}&limit=50`, { headers: { 'user-email': user?.email } })
            .then(({ data }) => setMarketplaceSkills(data.skills || []))
            .catch(() => { });
    }, [userId, user?.email]);

    // Fetch current user's offered skills for the exchange modal
    useEffect(() => {
        if (!user?.email) return;
        axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`, { headers: { 'user-email': user?.email } })
            .then(({ data }) => setMySkills(data.skillsOffered || []))
            .catch(() => { });
    }, [user?.email]);

    const handleRequest = async (skillId, offeredSkill) => {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/requests`, { skillId, offeredSkill }, { headers: { 'user-email': user?.email } });
        setToast('Request sent successfully!');
        setTimeout(() => setToast(null), 3000);
    };

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
                <p className="text-rose-400 mb-4 font-medium">{error || 'User not found'}</p>
                <Link to="/marketplace" className="text-emerald-500 hover:underline font-semibold">Back to Marketplace</Link>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950 text-slate-200' : 'bg-gray-50 text-gray-900'} font-sans selection:bg-emerald-500/30 pb-20`}>
            <Helmet>
                <title>{profile.name}'s Profile - SkillSwap</title>
                <meta name="description" content={`View ${profile.name}'s profile on SkillSwap. See their offered and wanted skills, and request an exchange!`} />
            </Helmet>
            {/* Background Effects */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(52,211,153,0.1),transparent_40%)]" />
                <div className="absolute -left-10 top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px] dark:bg-emerald-500/20" />
                <div className="absolute -right-10 bottom-20 h-72 w-72 rounded-full bg-sky-500/10 blur-[100px] dark:bg-sky-500/20" />
            </div>

            {/* Navbar wrapper */}
            <nav className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 mb-8">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/marketplace" className="p-2 text-gray-500 hover:text-gray-950 hover:bg-gray-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2">
                                <ArrowLeft size={18} />
                                <span className="hidden sm:inline font-medium text-sm">Marketplace</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleTheme}
                                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 transition-colors"
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <div className="flex items-center gap-3 border-l border-gray-200 dark:border-white/10 pl-4">
                                <Link
                                    to="/profile"
                                    className="flex items-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md px-2 py-1"
                                >
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name || 'User'}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header Profile Info */}
                <div className="rounded-2xl border border-gray-200/50 bg-white/40 p-8 shadow-sm backdrop-blur-xl dark:border-white/5 dark:bg-slate-900/40">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-linear-to-tr from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/20">
                            <UserIcon size={40} strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{profile.name}</h1>
                            {profile.location && (
                                <p className="flex items-center gap-1.5 text-gray-600 dark:text-slate-400 mb-4">
                                    <MapPin size={16} className="text-emerald-500" />
                                    {profile.location}
                                </p>
                            )}
                            <p className="text-gray-700 dark:text-slate-300 max-w-2xl leading-relaxed">
                                {profile.bio ? profile.bio : "This user hasn't written a bio yet."}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-slate-400">
                                <span className="font-medium bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                    Member since {new Date(profile.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    {/* Skills Offered */}
                    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 p-6 shadow-sm backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                                <Briefcase size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Skills Offered</h2>
                                <p className="text-sm text-gray-500 dark:text-slate-400">What {profile.name.split(' ')[0]} can teach</p>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {profile.skillsOffered && profile.skillsOffered.length > 0 ? (
                                profile.skillsOffered.map((skill, idx) => {
                                    // Find the matching Skill marketplace document
                                    const mSkill = marketplaceSkills.find(
                                        s => s.title.toLowerCase() === skill.name.toLowerCase()
                                    );
                                    return (
                                        <div key={idx} className="relative">
                                            <SkillCard skill={skill} colorTone="emerald" />
                                            {mSkill && user?._id !== userId && (
                                                <button
                                                    onClick={() => setModalSkill(mSkill)}
                                                    className="mt-2 w-full flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600 transition"
                                                >
                                                    Request Skill
                                                </button>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-full py-8 text-center border border-dashed border-gray-300 dark:border-white/10 rounded-xl bg-gray-50/50 dark:bg-slate-800/30">
                                    <p className="text-gray-500 dark:text-slate-400">No skills offered yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills Wanted */}
                    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 p-6 shadow-sm backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-sky-100 dark:bg-sky-500/20 rounded-lg text-sky-600 dark:text-sky-400">
                                <GraduationCap size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Skills Wanted</h2>
                                <p className="text-sm text-gray-500 dark:text-slate-400">What {profile.name.split(' ')[0]} wants to learn</p>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {profile.skillsWanted && profile.skillsWanted.length > 0 ? (
                                profile.skillsWanted.map((skill, idx) => (
                                    <SkillCard key={idx} skill={skill} colorTone="sky" />
                                ))
                            ) : (
                                <div className="col-span-full py-8 text-center border border-dashed border-gray-300 dark:border-white/10 rounded-xl bg-gray-50/50 dark:bg-slate-800/30">
                                    <p className="text-gray-500 dark:text-slate-400">No requested skills yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Exchange Request Modal */}
            {modalSkill && (
                <ExchangeRequestModal
                    skill={modalSkill}
                    mySkills={mySkills}
                    onClose={() => setModalSkill(null)}
                    onSubmit={handleRequest}
                />
            )}

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-6 right-6 z-200 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-white dark:bg-slate-900/95 px-5 py-3.5 shadow-2xl backdrop-blur-xl animate-fade-in">
                    <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="text-sm font-medium text-gray-900 dark:text-slate-200">{toast}</span>
                    <button
                        onClick={() => setToast(null)}
                        className="ml-2 rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default PublicProfile;
