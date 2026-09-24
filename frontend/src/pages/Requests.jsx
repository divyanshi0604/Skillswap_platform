import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, CheckCircle, Inbox, Loader2, LogOut, Moon, Sun, X } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import RequestsTabs from '../components/RequestsTabs';
import IncomingRequestCard from '../components/IncomingRequestCard';
import OutgoingRequestCard from '../components/OutgoingRequestCard';
import { Helmet } from "react-helmet";

const Requests = () => {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();

    const [activeTab, setActiveTab] = useState('incoming');
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [outgoingRequests, setOutgoingRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updatingId, setUpdatingId] = useState(null);
    const [toast, setToast] = useState(null);



    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchRequests = useCallback(async () => {
        if (!user?.email) return;

        try {
            setLoading(true);
            setError('');

            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/requests`, { headers: { 'user-email': user?.email } });
            setIncomingRequests(data?.incomingRequests || []);
            setOutgoingRequests(data?.outgoingRequests || []);
        } catch {
            setError('Failed to load requests. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [user?.email]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const handleUpdateStatus = async (requestId, status) => {
        try {
            setUpdatingId(requestId);

            const { data } = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/requests/${requestId}`,
                { status },
                { headers: { 'user-email': user?.email } }
            );

            setIncomingRequests((prev) =>
                prev.map((request) => (request._id === requestId ? { ...request, status: data.status } : request))
            );
            setOutgoingRequests((prev) =>
                prev.map((request) => (request._id === requestId ? { ...request, status: data.status } : request))
            );

            const actionLabel = status === 'accepted' ? 'accepted' : 'rejected';
            showToast(`Request ${actionLabel} successfully.`, 'success');
        } catch (err) {
            const message = err?.response?.data?.message || 'Failed to update request status.';
            showToast(message, 'error');
        } finally {
            setUpdatingId(null);
        }
    };

    const currentRequests = activeTab === 'incoming' ? incomingRequests : outgoingRequests;

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950 text-slate-200' : 'bg-gray-50 text-gray-900'} font-sans selection:bg-emerald-500/30 pb-20`}>
            <Helmet>
                <title>Requests - SkillSwap</title>
                <meta name="description" content="Manage your SkillSwap requests" />
            </Helmet>
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(52,211,153,0.1),transparent_40%)]" />
                <div className="absolute -left-10 top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px] dark:bg-emerald-500/20" />
                <div className="absolute -right-10 bottom-20 h-72 w-72 rounded-full bg-sky-500/10 blur-[100px] dark:bg-sky-500/20" />
            </div>

            <nav className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 mb-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="flex items-center gap-2 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-950 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white">
                                <ArrowLeft size={18} />
                                <span className="hidden text-sm font-medium sm:inline">Dashboard</span>
                            </Link>
                            <div className="hidden items-center gap-2 border-l border-gray-200 pl-4 dark:border-white/10 sm:flex">
                                <Inbox size={18} className="text-emerald-600 dark:text-emerald-400" />
                                <span className="font-[Space_Grotesk] text-lg font-bold tracking-wider text-gray-900 dark:text-white">Requests</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleTheme}
                                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10"
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <div className="flex items-center gap-3 border-l border-gray-200 pl-4 dark:border-white/10">
                                <Link 
                                    to="/profile" 
                                    className="flex items-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md px-2 py-1"
                                >
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name || 'User'}</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
                                    title="Log out"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="mb-1 font-[Space_Grotesk] text-3xl font-bold text-gray-900 dark:text-white">Request Management</h1>
                        <p className="text-gray-600 dark:text-slate-400">Review incoming requests and track outgoing request statuses.</p>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60">
                    <RequestsTabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        incomingCount={incomingRequests.length}
                        outgoingCount={outgoingRequests.length}
                    />
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 size={32} className="animate-spin text-emerald-600 dark:text-emerald-400" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/30 py-16 dark:border-white/10 dark:bg-slate-900/30">
                        <AlertCircle size={36} className="mb-3 text-rose-600 dark:text-rose-400" />
                        <p className="mb-2 text-rose-600 dark:text-rose-400">{error}</p>
                        <button
                            onClick={fetchRequests}
                            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
                            Try Again
                        </button>
                    </div>
                ) : currentRequests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/30 py-16 dark:border-white/10 dark:bg-slate-900/30">
                        <Inbox size={36} className="mb-3 text-gray-400 dark:text-slate-600" />
                        <p className="mb-1 text-gray-700 dark:text-slate-300">
                            {activeTab === 'incoming' ? 'No incoming requests yet.' : 'No outgoing requests yet.'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-slate-500">
                            {activeTab === 'incoming' ? 'New requests from other users will appear here.' : 'Requests you send from marketplace will appear here.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {activeTab === 'incoming'
                            ? incomingRequests.map((request) => (
                                <IncomingRequestCard
                                    key={request._id}
                                    request={request}
                                    onUpdateStatus={handleUpdateStatus}
                                    isUpdating={updatingId === request._id}
                                />
                            ))
                            : outgoingRequests.map((request) => (
                                <OutgoingRequestCard key={request._id} request={request} />
                            ))}
                    </div>
                )}
            </main>

            {toast && (
                <div className={`fixed bottom-6 right-6 z-200 flex items-center gap-3 rounded-xl border px-5 py-3.5 shadow-2xl backdrop-blur-xl animate-slide-up ${toast.type === 'error'
                        ? 'border-rose-500/20 bg-white dark:bg-slate-900/95'
                        : 'border-emerald-500/20 bg-white dark:bg-slate-900/95'
                    }`}>
                    <CheckCircle
                        size={18}
                        className={`shrink-0 ${toast.type === 'error' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-slate-200">{toast.message}</span>
                    <button
                        onClick={() => setToast(null)}
                        className="ml-2 rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 dark:text-slate-500 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                        <X size={14} />
                    </button>
                </div>
            )}

            <style>{`
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Requests;