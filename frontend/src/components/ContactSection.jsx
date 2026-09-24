import { useState } from 'react';
import { Mail, Phone, Copy, CheckCheck, MessageCircle } from 'lucide-react';

// Prepend +91 if the number doesn't already have a country code
const normalizePhone = (phone) => {
    const digits = phone.replace(/\D/g, '');
    // Already has country code (91XXXXXXXXXX or +91...)
    if (phone.trim().startsWith('+')) return phone.trim();
    if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
    // 10-digit Indian number — add +91
    return `+91 ${phone.trim()}`;
};

// Strip everything except digits for WhatsApp URL
const sanitizePhone = (phone) => normalizePhone(phone).replace(/\D/g, '');


const CopyButton = ({ text, label, successLabel }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // clipboard unavailable — silently fail
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 active:scale-95 dark:border-emerald-500/30 dark:bg-slate-800 dark:text-emerald-400 dark:hover:bg-emerald-500/10"
        >
            {copied ? (
                <>
                    <CheckCheck size={13} className="text-emerald-500" />
                    {successLabel}
                </>
            ) : (
                <>
                    <Copy size={13} />
                    {label}
                </>
            )}
        </button>
    );
};

const ContactSection = ({ contact, partnerLabel = 'Connect with' }) => {
    if (!contact) return null;

    const { name, email, phone } = contact;
    const hasPhone = phone && phone.trim().length > 0;
    const displayPhone = hasPhone ? normalizePhone(phone) : '';
    const sanitizedPhone = hasPhone ? sanitizePhone(phone) : '';
    const whatsappUrl = `https://wa.me/${sanitizedPhone}`;

    return (
        <div className="mt-4 animate-fade-in rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 transition-all duration-300 ease-out dark:border-emerald-500/20 dark:bg-emerald-500/5">
            {/* Success banner */}
            <div className="mb-4 rounded-lg border border-emerald-300/60 bg-emerald-100/60 px-4 py-3 dark:border-emerald-500/30 dark:bg-emerald-500/10">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                    🎉 Request Accepted!
                </p>
                <p className="mt-0.5 text-xs text-emerald-600 dark:text-emerald-500">
                    {partnerLabel}{' '}
                    <span className="font-semibold">{name}</span> — you can now start learning together.
                </p>
            </div>

            {/* Contact rows */}
            <div className="space-y-3 mb-4">
                {/* Email row */}
                {email && (
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300 min-w-0">
                            <Mail size={14} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                            <a
                                href={`mailto:${email}`}
                                className="break-all text-emerald-700 hover:underline dark:text-emerald-400"
                            >
                                {email}
                            </a>
                        </div>
                        <CopyButton text={email} label="Copy Email" successLabel="Copied!" />
                    </div>
                )}

                {/* Phone row */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    {hasPhone ? (
                        <>
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                                <Phone size={14} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                                <span>{displayPhone}</span>
                            </div>
                            <CopyButton text={displayPhone} label="Copy Phone" successLabel="Copied!" />
                        </>
                    ) : (
                        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-slate-500">
                            <Phone size={13} className="shrink-0" />
                            <span>Phone number not provided</span>
                        </div>
                    )}
                </div>
            </div>

            {/* WhatsApp button */}
            {hasPhone && (
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110 active:scale-95"
                >
                    <MessageCircle size={13} />
                    Chat on WhatsApp
                </a>
            )}
        </div>
    );
};

export default ContactSection;
