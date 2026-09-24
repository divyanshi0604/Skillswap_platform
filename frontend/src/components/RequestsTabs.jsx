const RequestsTabs = ({ activeTab, onTabChange, incomingCount, outgoingCount }) => {
    return (
        <div className="flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-slate-800/80">
            <button
                onClick={() => onTabChange('incoming')}
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors ${
                    activeTab === 'incoming'
                        ? 'bg-white text-emerald-600 shadow dark:bg-slate-700 dark:text-emerald-400'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
            >
                Incoming ({incomingCount})
            </button>
            <button
                onClick={() => onTabChange('outgoing')}
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors ${
                    activeTab === 'outgoing'
                        ? 'bg-white text-sky-600 shadow dark:bg-slate-700 dark:text-sky-400'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
            >
                Outgoing ({outgoingCount})
            </button>
        </div>
    );
};

export default RequestsTabs;