import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, User, ArrowLeft, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileForm from '../components/profile/ProfileForm';
import SkillsOffered from '../components/profile/SkillsOffered';
import SkillsWanted from '../components/profile/SkillsWanted';
import Toast from '../components/profile/Toast';

import { Helmet } from "react-helmet";

const Profile = () => {
    const { user, login, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [toast, setToast] = useState(null);



    const fetchProfile = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`, { headers: { 'user-email': user?.email } });
            setProfile(data);
            setError('');
        } catch {
            setError('Failed to load profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchProfile();
        }
    }, [user?.email]);

    const handleUpdateProfile = async (formData) => {
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/update`, formData, { headers: { 'user-email': user?.email } });
            setProfile(data);
            setIsEditing(false);

            if (data.name !== user.name) {
                login({ ...user, name: data.name });
            }
        } catch {
            alert('Failed to update profile.');
        }
    };

    const handleAddSkillOffered = async (skill, level, category) => {
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/add-skill-offered`, { skill, level, category }, { headers: { 'user-email': user?.email } });
            setProfile(data);
        } catch {
            alert('Failed to add skill.');
        }
    };

    const handleAddSkillWanted = async (skill, level, category) => {
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/add-skill-wanted`, { skill, level, category }, { headers: { 'user-email': user?.email } });
            setProfile(data);
        } catch {
            alert('Failed to add skill.');
        }
    };

    const showToast = useCallback((message) => {
        setToast(message);
    }, []);

    const handleRemoveSkill = async (skillName) => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/remove-skill/${encodeURIComponent(skillName)}`, { headers: { 'user-email': user?.email } });
            setProfile(data);
            showToast('Skill removed successfully');
        } catch {
            alert('Failed to remove skill.');
        }
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
                <p className="text-rose-400 mb-4 font-medium">{error}</p>
                <Link to="/" className="text-emerald-500 hover:underline font-semibold">Go back to Dashboard</Link>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950 text-slate-200' : 'bg-gray-50 text-gray-900'} font-sans selection:bg-emerald-500/30 pb-20`}>
            <Helmet>
                <title>Profile - SkillSwap</title>
                <meta name="description" content="Manage your SkillSwap profile" />
            </Helmet>
            {/* Background Effects matching Dashboard */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(52,211,153,0.1),transparent_40%)]" />
                <div className="absolute -left-10 top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px] dark:bg-emerald-500/20" />
                <div className="absolute -right-10 bottom-20 h-72 w-72 rounded-full bg-sky-500/10 blur-[100px] dark:bg-sky-500/20" />
            </div>

            {/* Profile Navbar wrapper */}
            <nav className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 mb-8">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="p-2 text-gray-500 hover:text-gray-950 hover:bg-gray-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2">
                                <ArrowLeft size={18} />
                                <span className="hidden sm:inline font-medium text-sm">Dashboard</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleTheme}
                                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 transition-colors"
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <span className="font-[Space_Grotesk] text-lg font-bold tracking-widest text-emerald-600 dark:text-emerald-300 md:hidden">
                                SWP
                            </span>
                            <div className="flex items-center gap-3 border-l border-gray-200 dark:border-white/10 pl-4">
                                <Link
                                    to="/profile"
                                    className="flex items-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md px-2 py-1"
                                >
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name || 'User'}</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="rounded-lg p-2 text-gray-500 hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 transition-colors"
                                    title="Log out"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex items-center mb-2">
                    <h1 className="font-[Space_Grotesk] text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
                </div>

                {isEditing ? (
                    <ProfileForm
                        profile={profile}
                        onSave={handleUpdateProfile}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <ProfileHeader
                        profile={profile}
                        onEditClick={() => setIsEditing(true)}
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <SkillsOffered
                        skills={profile.skillsOffered || []}
                        onAddSkill={handleAddSkillOffered}
                        onRemoveSkill={handleRemoveSkill}
                    />

                    <SkillsWanted
                        skills={profile.skillsWanted || []}
                        onAddSkill={handleAddSkillWanted}
                        onRemoveSkill={handleRemoveSkill}
                    />
                </div>
            </main>

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default Profile;
