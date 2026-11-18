import {Check, Copy, ExternalLink, MessageCircle, X} from 'lucide-react';
import {useEffect, useState} from 'react';
import {
  BUSINESS_INFO,
  CORE_SERVICES,
  getAutomatedWhatsAppMessage,
  getWhatsAppUrl,
  type ServiceId,
} from '../data/portfolioData';

interface WhatsAppWidgetProps {
  selectedService: ServiceId;
  onSelectService: (id: ServiceId) => void;
}

const SERVICE_CHOICES: {id: ServiceId; label: string}[] = [
  ...CORE_SERVICES.map((s) => ({id: s.id, label: s.title})),
  {id: 'online-services', label: 'Online Work'},
];

export default function WhatsAppWidget({
  selectedService,
  onSelectService,
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const automatedMessage = getAutomatedWhatsAppMessage({
    serviceId: selectedService,
    name,
    details,
  });

  const whatsappHref = getWhatsAppUrl({
    serviceId: selectedService,
    name,
    details,
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(automatedMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Automated WhatsApp Message Desk"
          className="mb-3 w-[calc(100vw-2rem)] max-w-sm rounded-xl border border-[#D6C29F]/35 bg-[#141210] p-4 text-[#EFE6D8] shadow-2xl sm:p-5"
        >
          <div className="flex items-start justify-between gap-3 border-b border-[#EFE6D8]/12 pb-3">
            <div>
              <p className="text-xs font-medium text-[#D6C29F]">
                WhatsApp Direct Desk
              </p>
              <h3 className="mt-0.5 font-display text-xl font-semibold text-[#EFE6D8]">
                {BUSINESS_INFO.proprietor}
              </h3>
              <p className="font-mono text-[11px] text-[#A89B87] tabular-nums">
                {BUSINESS_INFO.whatsappFormatted}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp composer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#EFE6D8]/18 text-[#EFE6D8] transition-colors hover:bg-[#EFE6D8] hover:text-[#0D0C0B] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3.5 space-y-3">
            <div>
              <p className="text-[11px] font-semibold text-[#C2B6A3]">
                Select Service
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {SERVICE_CHOICES.map((choice) => (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => onSelectService(choice.id)}
                    className={`rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      selectedService === choice.id
                        ? 'bg-[#EFE6D8] text-[#0D0C0B]'
                        : 'border border-[#EFE6D8]/16 bg-[#0D0C0B] text-[#C2B6A3] hover:border-[#D6C29F] hover:text-[#EFE6D8]'
                    }`}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                aria-label="Your name"
                className="w-full rounded-md border border-[#EFE6D8]/18 bg-[#0D0C0B] px-3 py-2 text-xs text-[#EFE6D8] placeholder:text-[#8F826E] focus:border-[#D6C29F] focus:outline-none"
              />
              <input
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Route / date / note"
                aria-label="Route, date, or note"
                className="w-full rounded-md border border-[#EFE6D8]/18 bg-[#0D0C0B] px-3 py-2 text-xs text-[#EFE6D8] placeholder:text-[#8F826E] focus:border-[#D6C29F] focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold text-[#D6C29F]">
                  Automated Message Preview
                </p>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#B5A996] hover:text-[#EFE6D8] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" aria-hidden="true" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="mt-1.5 max-h-32 overflow-y-auto whitespace-pre-wrap rounded-md border border-[#EFE6D8]/12 bg-[#0D0C0B] p-2.5 font-sans text-xs leading-relaxed text-[#C2B6A3]">
                {automatedMessage}
              </pre>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#EFE6D8] px-4 py-2.5 text-xs font-semibold text-[#0D0C0B] whitespace-nowrap transition-colors hover:bg-[#D6C29F]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Send Automated WhatsApp
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Open automated WhatsApp message composer"
        className="ml-auto flex h-11 items-center gap-2 rounded-lg border border-[#D6C29F]/45 bg-[#0D0C0B] px-4 text-xs font-semibold text-[#EFE6D8] shadow-lg whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#EFE6D8] hover:text-[#0D0C0B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6C29F] cursor-pointer"
      >
        <MessageCircle className="h-4 w-4 text-[#D6C29F]" aria-hidden="true" />
        <span>WhatsApp</span>
      </button>
    </div>
  );
}
