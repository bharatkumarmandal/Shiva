import {ArrowUpRight, Bus, Landmark, Mail, MapPin, MessageCircle, Phone, Plane, TrainFront} from 'lucide-react';
import {
  BUSINESS_INFO,
  CORE_SERVICES,
  getWhatsAppUrl,
  type ServiceId,
} from '../data/portfolioData';

interface HeroProps {
  onRequestService: (serviceId?: ServiceId) => void;
}

const CARD_ICONS: Record<Exclude<ServiceId, 'online-services'>, typeof Plane> = {
  'air-ticket': Plane,
  'rail-ticket': TrainFront,
  'money-transfer': Landmark,
  'bus-ticket': Bus,
};

export default function Hero({onRequestService}: HeroProps) {
  return (
    <section id="top" className="bg-[#0D0C0B] text-[#EFE6D8] overflow-x-clip">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-14 lg:py-18">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Typographic Masthead */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-xs font-medium tracking-wider text-[#D6C29F]">
                <span>{BUSINESS_INFO.invocation}</span>
                <span className="mx-2 text-[#EFE6D8]/35" aria-hidden="true">
                  ·
                </span>
                <span>{BUSINESS_INFO.proprietor}, Proprietor</span>
                <span className="mx-2 text-[#EFE6D8]/35" aria-hidden="true">
                  ·
                </span>
                <span>Delhi-92</span>
              </p>

              <h1 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,4.25rem)] font-semibold leading-[1.04] tracking-tight text-[#EFE6D8] text-balance">
                {BUSINESS_INFO.brand}
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#C2B6A3] sm:text-base md:text-[17px]">
                Authorized travel ticketing across air, rail, and intercity coach networks paired
                with verified domestic bank remittances and complete online documentation services in
                East Delhi.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => onRequestService()}
                className="inline-flex items-center gap-2 rounded-md bg-[#EFE6D8] px-5 py-3 text-sm font-semibold text-[#0D0C0B] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#D6C29F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6C29F] cursor-pointer"
              >
                Book a Service
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href={getWhatsAppUrl({serviceId: 'air-ticket'})}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[#D6C29F]/35 px-4 py-3 text-sm font-medium text-[#EFE6D8] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#D6C29F] hover:bg-[#191613] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6C29F]"
              >
                <MessageCircle className="h-4 w-4 text-[#D6C29F]" aria-hidden="true" />
                WhatsApp Desk
              </a>

              <a
                href={`tel:+91${BUSINESS_INFO.whatsapp}`}
                className="inline-flex items-center gap-2 border-b border-[#D6C29F]/40 py-2 text-sm font-medium text-[#EFE6D8] whitespace-nowrap shrink-0 tabular-nums transition-colors duration-150 hover:border-[#D6C29F] hover:text-[#D6C29F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6C29F]"
              >
                <Phone className="h-4 w-4 text-[#D6C29F]" aria-hidden="true" />
                {BUSINESS_INFO.whatsappFormatted}
              </a>
            </div>
          </div>

          {/* Right Executive Data Card (Pure Typography & Interactive Data Layout) */}
          <div className="lg:col-span-6">
            <div className="flex h-full flex-col justify-between rounded-xl border border-[#D6C29F]/28 bg-gradient-to-br from-[#191613] via-[#13110F] to-[#0D0C0B] p-5 sm:p-7">
              {/* Card Header Row: Proprietor, Invocation, Direct Numbers */}
              <div className="flex flex-col justify-between gap-4 border-b border-[#EFE6D8]/12 pb-5 sm:flex-row sm:items-start">
                <div>
                  <p className="text-[11px] font-medium tracking-wider text-[#D6C29F]">
                    {BUSINESS_INFO.invocation}
                  </p>
                  <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-[#EFE6D8]">
                    {BUSINESS_INFO.proprietor}
                  </p>
                  <p className="mt-0.5 text-xs text-[#A89B87]">
                    {BUSINESS_INFO.role}
                  </p>
                </div>

                <div className="space-y-1 font-mono text-xs tabular-nums sm:text-right">
                  {BUSINESS_INFO.phones.map((phone) => (
                    <a
                      key={phone.number}
                      href={`tel:+91${phone.number}`}
                      className="block text-[#EFE6D8] transition-colors hover:text-[#D6C29F]"
                    >
                      <span className="text-[#8F826E] mr-2">
                        {phone.label === 'WhatsApp & Direct' ? 'WA' : 'M'}
                      </span>
                      {phone.formatted}
                    </a>
                  ))}
                </div>
              </div>

              {/* Card Centerpiece: Brand Masthead & Interactive 4-Column Service Grid */}
              <div className="my-5">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="text-xs font-medium tracking-wider text-[#D6C29F]">
                    Executive Service Directory
                  </span>
                  <span className="text-xs text-[#8F826E]">Select a desk</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {CORE_SERVICES.map((svc) => {
                    const Icon =
                      CARD_ICONS[svc.id as Exclude<ServiceId, 'online-services'>];
                    return (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => onRequestService(svc.id)}
                        className="group flex flex-col items-start justify-between rounded-lg border border-[#EFE6D8]/14 bg-[#0D0C0B]/80 p-3 text-left transition-colors duration-150 hover:border-[#D6C29F] hover:bg-[#EFE6D8] focus-visible:outline-2 focus-visible:outline-[#D6C29F] cursor-pointer"
                      >
                        <Icon
                          className="h-4 w-4 text-[#D6C29F] transition-colors group-hover:text-[#0D0C0B]"
                          aria-hidden="true"
                        />
                        <div className="mt-3 w-full">
                          <p className="text-xs font-semibold text-[#EFE6D8] transition-colors group-hover:text-[#0D0C0B]">
                            {svc.title}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-[#A89B87] transition-colors group-hover:text-[#4A4238]">
                            {svc.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card Bottom Banner & Office Coordinates */}
              <div className="space-y-3 border-t border-[#EFE6D8]/12 pt-4">
                <button
                  type="button"
                  onClick={() => onRequestService('online-services')}
                  className="flex w-full items-center justify-between gap-3 rounded-lg bg-[#EFE6D8] px-4 py-2.5 text-left transition-colors duration-150 hover:bg-[#D6C29F] cursor-pointer"
                >
                  <span className="text-xs font-semibold text-[#0D0C0B] sm:text-sm">
                    {BUSINESS_INFO.hindiBanner}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#0D0C0B]" aria-hidden="true" />
                </button>

                <div className="flex flex-col gap-1.5 text-xs text-[#B5A996] sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-start gap-1.5 min-w-0">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D6C29F]" aria-hidden="true" />
                    <span className="break-words">{BUSINESS_INFO.address}</span>
                  </span>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="flex items-center gap-1.5 text-[#D6C29F] hover:text-[#EFE6D8] min-w-0 break-all sm:break-normal sm:shrink-0"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{BUSINESS_INFO.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Executive Proof Strip Below Split */}
        <div className="mt-10 grid grid-cols-1 gap-6 border-t border-[#EFE6D8]/14 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-[#A89B87]">Core Service Pillars</p>
            <p className="mt-1 font-display text-2xl font-semibold text-[#EFE6D8] tabular-nums">
              04 Divisions
            </p>
          </div>
          <div>
            <p className="text-xs text-[#A89B87]">Banking Network</p>
            <p className="mt-1 font-display text-2xl font-semibold text-[#EFE6D8]">
              SBI · ICICI · Axis · UBI
            </p>
          </div>
          <div>
            <p className="text-xs text-[#A89B87]">Direct Desk Lines</p>
            <p className="mt-1 font-display text-2xl font-semibold text-[#EFE6D8] tabular-nums">
              97183 92779
            </p>
          </div>
          <div>
            <p className="text-xs text-[#A89B87]">Complex Location</p>
            <p className="mt-1 font-display text-2xl font-semibold text-[#EFE6D8]">
              B-18, Ganesh Nagar
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
