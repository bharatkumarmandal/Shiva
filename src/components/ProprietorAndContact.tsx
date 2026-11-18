import {Check, Clock, Copy, Mail, MapPin, MessageSquare, Phone, Send} from 'lucide-react';
import {useState, type FormEvent} from 'react';
import {
  BUSINESS_INFO,
  CORE_SERVICES,
  getAutomatedWhatsAppMessage,
  getWhatsAppUrl,
  type ServiceId,
} from '../data/portfolioData';

interface ProprietorAndContactProps {
  selectedService: ServiceId;
  onSelectService: (id: ServiceId) => void;
}

const SERVICE_OPTIONS: {id: ServiceId; label: string}[] = [
  ...CORE_SERVICES.map((s) => ({id: s.id, label: `${s.title} (${s.subtitle})`})),
  {id: 'online-services', label: 'Online Services (ऑनलाइन सम्बन्धित कार्य)'},
];

export default function ProprietorAndContact({
  selectedService,
  onSelectService,
}: ProprietorAndContactProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current));
      }, 2000);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  const selectedLabel =
    SERVICE_OPTIONS.find((opt) => opt.id === selectedService)?.label ??
    'Air Ticket';

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const cleanedName = name.trim();
    const cleanedDigits = phone.replace(/\D/g, '');

    if (cleanedName.length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (cleanedDigits.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMsg('');
    const refNumber = `SFS-${String(Date.now()).slice(-6)}`;
    setSubmittedRef(refNumber);
  };

  const automatedMessage = getAutomatedWhatsAppMessage({
    serviceId: selectedService,
    name,
    phone,
    details,
  });

  const whatsappUrl = getWhatsAppUrl({
    serviceId: selectedService,
    name,
    phone,
    details,
  });

  const mailtoSubject = encodeURIComponent(
    `Service Inquiry (${selectedLabel}) — ${name.trim() || 'Client'}`
  );
  const mailtoBody = encodeURIComponent(automatedMessage);

  return (
    <section
      id="contact"
      className="border-t border-[#0D0C0B]/12 bg-[#F6F0E6] text-[#0D0C0B]"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Proprietor Profile & Direct Directory */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#6E5E49]">
                04. Proprietor &amp; Office Desk
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#0D0C0B] sm:text-4xl">
                {BUSINESS_INFO.proprietor}
              </h2>
              <p className="mt-1 text-sm font-medium text-[#4A4238]">
                {BUSINESS_INFO.role} · {BUSINESS_INFO.brand}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#4A4238]">
                Serving individuals, families, and local businesses in East Delhi with prompt
                ticketing, reliable banking remittance, and accurate digital documentation.
              </p>

              {/* Direct Contact Lines with Copy Buttons */}
              <div className="mt-8 divide-y divide-[#0D0C0B]/12 border-y border-[#0D0C0B]/12">
                {BUSINESS_INFO.phones.map((item) => (
                  <div
                    key={item.number}
                    className="flex items-center justify-between gap-3 py-3.5"
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-[#6E5E49]">{item.label}</p>
                      <a
                        href={`tel:+91${item.number}`}
                        className="mt-0.5 inline-flex items-center gap-2 font-mono text-sm font-medium text-[#0D0C0B] tabular-nums hover:underline"
                      >
                        <Phone className="h-3.5 w-3.5 shrink-0 text-[#6E5E49]" aria-hidden="true" />
                        {item.formatted}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.number, item.number)}
                      aria-label={`Copy ${item.label} number`}
                      className="inline-flex items-center gap-1 rounded-md border border-[#0D0C0B]/18 px-2.5 py-1.5 text-xs font-medium text-[#0D0C0B] whitespace-nowrap shrink-0 transition-colors hover:bg-[#0D0C0B] hover:text-[#EFE6D8] cursor-pointer"
                    >
                      {copiedKey === item.number ? (
                        <>
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                ))}

                <div className="flex items-center justify-between gap-3 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-[#6E5E49]">Official Email</p>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="mt-0.5 flex items-center gap-2 text-sm font-medium text-[#0D0C0B] hover:underline"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0 text-[#6E5E49]" aria-hidden="true" />
                      <span className="truncate">{BUSINESS_INFO.email}</span>
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('email', BUSINESS_INFO.email)}
                    aria-label="Copy email address"
                    className="inline-flex items-center gap-1 rounded-md border border-[#0D0C0B]/18 px-2.5 py-1.5 text-xs font-medium text-[#0D0C0B] whitespace-nowrap shrink-0 transition-colors hover:bg-[#0D0C0B] hover:text-[#EFE6D8] cursor-pointer"
                  >
                    {copiedKey === 'email' ? (
                      <>
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="py-3.5">
                  <p className="text-xs text-[#6E5E49]">Office Address</p>
                  <p className="mt-0.5 flex items-start gap-2 text-sm font-medium text-[#0D0C0B]">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6E5E49]" aria-hidden="true" />
                    <span>{BUSINESS_INFO.address}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Walk-in Desk Summary Card (Pure Data) */}
            <div className="mt-8 rounded-xl border border-[#0D0C0B]/14 bg-[#0D0C0B] p-4 sm:p-5 text-[#EFE6D8]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-[#D6C29F]">
                    Walk-In &amp; Remote Desk
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold text-[#EFE6D8]">
                    Ganesh Nagar, Pandav Nagar Complex
                  </p>
                </div>
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D6C29F]" aria-hidden="true" />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#B5A996]">
                Direct in-person support at Shop B-18 and remote ticket issuance via WhatsApp on{' '}
                <span className="font-mono text-[#EFE6D8] tabular-nums">
                  {BUSINESS_INFO.whatsappFormatted}
                </span>
                .
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Service Request Desk */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#0D0C0B]/15 bg-[#EFE6D8] p-5 sm:p-8">
              <div className="border-b border-[#0D0C0B]/12 pb-5">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-[#0D0C0B]">
                  Service Request &amp; Booking Desk
                </h3>
                <p className="mt-1 text-sm text-[#4A4238]">
                  Prepare your booking or transfer inquiry and dispatch directly via WhatsApp or
                  Email to V. K. Shukla.
                </p>
              </div>

              {submittedRef ? (
                <div className="mt-6 rounded-lg border border-[#0D0C0B]/18 bg-[#F6F0E6] p-5 sm:p-6">
                  <p className="font-mono text-xs font-medium text-[#6E5E49] tabular-nums">
                    Reference {submittedRef}
                  </p>
                  <h4 className="mt-2 font-display text-2xl font-semibold text-[#0D0C0B]">
                    Inquiry Ready for Dispatch
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#4A4238]">
                    Your request for{' '}
                    <span className="font-semibold text-[#0D0C0B]">{selectedLabel}</span> has been
                    prepared. Send it directly to our WhatsApp desk or email inbox for immediate
                    confirmation.
                  </p>

                  <pre className="mt-4 whitespace-pre-wrap rounded-md border border-[#0D0C0B]/12 bg-[#EFE6D8] p-3.5 font-sans text-xs leading-relaxed text-[#3A332A]">
                    {automatedMessage}
                  </pre>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-[#0D0C0B] px-5 py-2.5 text-xs font-semibold text-[#EFE6D8] whitespace-nowrap shrink-0 transition-colors hover:bg-[#24211D]"
                    >
                      <MessageSquare className="h-4 w-4" aria-hidden="true" />
                      Send on WhatsApp
                    </a>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                      className="inline-flex items-center gap-2 rounded-md border border-[#0D0C0B]/25 bg-transparent px-5 py-2.5 text-xs font-semibold text-[#0D0C0B] whitespace-nowrap shrink-0 transition-colors hover:bg-[#0D0C0B] hover:text-[#EFE6D8]"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      Send via Email
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedRef(null);
                        setName('');
                        setPhone('');
                        setDetails('');
                      }}
                      className="px-3 py-2 text-xs font-medium text-[#594F42] underline underline-offset-4 hover:text-[#0D0C0B] cursor-pointer"
                    >
                      New Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                  <div>
                    <label
                      htmlFor="service-category"
                      className="block text-xs font-semibold text-[#0D0C0B]"
                    >
                      Service Category
                    </label>
                    <select
                      id="service-category"
                      value={selectedService}
                      onChange={(e) => onSelectService(e.target.value as ServiceId)}
                      className="mt-2 w-full rounded-md border border-[#0D0C0B]/22 bg-[#F6F0E6] px-3.5 py-2.5 text-sm text-[#0D0C0B] focus:border-[#0D0C0B] focus:outline-none"
                    >
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="client-name"
                        className="block text-xs font-semibold text-[#0D0C0B]"
                      >
                        Full Name
                      </label>
                      <input
                        id="client-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                        className="mt-2 w-full rounded-md border border-[#0D0C0B]/22 bg-[#F6F0E6] px-3.5 py-2.5 text-sm text-[#0D0C0B] placeholder:text-[#7D7060] focus:border-[#0D0C0B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="client-phone"
                        className="block text-xs font-semibold text-[#0D0C0B]"
                      >
                        Mobile Number
                      </label>
                      <input
                        id="client-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        required
                        className="mt-2 w-full rounded-md border border-[#0D0C0B]/22 bg-[#F6F0E6] px-3.5 py-2.5 font-mono text-sm text-[#0D0C0B] placeholder:font-sans placeholder:text-[#7D7060] focus:border-[#0D0C0B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="service-details"
                      className="block text-xs font-semibold text-[#0D0C0B]"
                    >
                      Route, Transfer Amount, or Document Notes
                    </label>
                    <textarea
                      id="service-details"
                      rows={4}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="e.g., Delhi to Patna rail ticket for 2 passengers on 24 Nov, or SBI remittance inquiry"
                      className="mt-2 w-full rounded-md border border-[#0D0C0B]/22 bg-[#F6F0E6] px-3.5 py-2.5 text-sm text-[#0D0C0B] placeholder:text-[#7D7060] focus:border-[#0D0C0B] focus:outline-none"
                    />
                  </div>

                  <div className="rounded-md border border-[#0D0C0B]/12 bg-[#F6F0E6] p-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-semibold text-[#6E5E49]">
                        Automated WhatsApp Message Preview
                      </p>
                      <span className="font-mono text-[11px] text-[#594F42] tabular-nums">
                        To {BUSINESS_INFO.whatsappFormatted}
                      </span>
                    </div>
                    <pre className="mt-2 whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#3A332A]">
                      {automatedMessage}
                    </pre>
                  </div>

                  {errorMsg && (
                    <p role="alert" className="text-xs font-semibold text-[#8E2A20]">
                      {errorMsg}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-[#0D0C0B]/25 bg-transparent px-5 py-3 text-sm font-semibold text-[#0D0C0B] whitespace-nowrap shrink-0 transition-colors hover:bg-[#0D0C0B] hover:text-[#EFE6D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D0C0B]"
                    >
                      <MessageSquare className="h-4 w-4" aria-hidden="true" />
                      Instant WhatsApp
                    </a>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-md bg-[#0D0C0B] px-6 py-3 text-sm font-semibold text-[#EFE6D8] whitespace-nowrap shrink-0 transition-colors hover:bg-[#24211D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D0C0B] cursor-pointer"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Prepare Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
