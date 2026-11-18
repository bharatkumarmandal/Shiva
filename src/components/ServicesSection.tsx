import {ArrowRight, Bus, ChevronDown, ChevronUp, Landmark, Plane, TrainFront} from 'lucide-react';
import {useState} from 'react';
import {
  BUSINESS_INFO,
  CORE_SERVICES,
  ONLINE_SERVICES,
  type ServiceId,
} from '../data/portfolioData';

interface ServicesSectionProps {
  selectedService: ServiceId;
  onSelectService: (id: ServiceId) => void;
}

const SERVICE_ICONS: Record<Exclude<ServiceId, 'online-services'>, typeof Plane> = {
  'air-ticket': Plane,
  'rail-ticket': TrainFront,
  'money-transfer': Landmark,
  'bus-ticket': Bus,
};

export default function ServicesSection({
  selectedService,
  onSelectService,
}: ServicesSectionProps) {
  const [onlineExpanded, setOnlineExpanded] = useState(true);

  return (
    <section
      id="services"
      className="border-t border-[#0D0C0B]/10 bg-[#EFE6D8] text-[#0D0C0B]"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="flex flex-col justify-between gap-4 border-b border-[#0D0C0B]/14 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#6E5E49]">
              01. Core Capabilities
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#0D0C0B] sm:text-4xl text-balance">
              Four Pillars of Travel &amp; Financial Service
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#4A4238]">
            Structured around our four-desk service architecture—delivering confirmed reservations
            and verified bank transfers with transparent turnaround times.
          </p>
        </div>

        {/* 4-Column Service Grid */}
        <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-xl border border-[#0D0C0B]/15 bg-[#F6F0E6] sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_SERVICES.map((service, index) => {
            const Icon =
              SERVICE_ICONS[service.id as Exclude<ServiceId, 'online-services'>];
            const isSelected = selectedService === service.id;

            return (
              <article
                key={service.id}
                className={`flex flex-col justify-between p-5 sm:p-6 transition-colors duration-150 border-[#0D0C0B]/12 ${
                  index < 3 ? 'border-b lg:border-b-0' : ''
                } ${index < 2 ? 'sm:border-b' : 'sm:border-b-0'} ${
                  index % 2 === 0 ? 'sm:border-r lg:border-r-0' : ''
                } ${index < 3 ? 'lg:border-r' : ''} ${
                  isSelected ? 'bg-[#0D0C0B] text-[#EFE6D8]' : 'hover:bg-[#EAE0CF]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`font-mono text-xs font-medium tabular-nums ${
                        isSelected ? 'text-[#D6C29F]' : 'text-[#6E5E49]'
                      }`}
                    >
                      {service.index}. {service.subtitle}
                    </span>
                    <Icon
                      className={`h-4 w-4 shrink-0 ${
                        isSelected ? 'text-[#D6C29F]' : 'text-[#0D0C0B]'
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  <h3
                    className={`mt-4 font-display text-2xl font-semibold tracking-tight ${
                      isSelected ? 'text-[#EFE6D8]' : 'text-[#0D0C0B]'
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      isSelected ? 'text-[#C2B6A3]' : 'text-[#4A4238]'
                    }`}
                  >
                    {service.summary}
                  </p>

                  <ul
                    className={`mt-5 space-y-1.5 border-t pt-4 text-xs ${
                      isSelected
                        ? 'border-[#EFE6D8]/14 text-[#D6C29F]'
                        : 'border-[#0D0C0B]/10 text-[#4A4238]'
                    }`}
                  >
                    {service.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 pt-4">
                  <span
                    className={`text-xs font-mono tabular-nums ${
                      isSelected ? 'text-[#A89B87]' : 'text-[#6E5E49]'
                    }`}
                  >
                    {isSelected ? 'Selected' : service.turnaround}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.id)}
                    className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#EFE6D8] text-[#0D0C0B] hover:bg-[#D6C29F]'
                        : 'bg-[#0D0C0B] text-[#EFE6D8] hover:bg-[#24211D]'
                    }`}
                  >
                    Request
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Signature Full-Width Banner Directly Below the 4 Columns */}
        <div className="mt-6 rounded-xl bg-[#0D0C0B] text-[#EFE6D8]">
          <div className="flex flex-col items-start justify-between gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-8 sm:py-6">
            <div>
              <p className="text-base font-semibold tracking-wide text-[#EFE6D8] sm:text-xl">
                {BUSINESS_INFO.hindiBanner}
              </p>
              <p className="mt-1 text-xs text-[#C2B6A3]">
                {BUSINESS_INFO.hindiTranslation}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setOnlineExpanded((prev) => !prev)}
                aria-expanded={onlineExpanded}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#EFE6D8]/22 px-3.5 py-2 text-xs font-medium text-[#EFE6D8] whitespace-nowrap shrink-0 transition-colors hover:border-[#D6C29F] hover:text-[#D6C29F] cursor-pointer"
              >
                {onlineExpanded ? 'Hide Scope' : 'View Scope'}
                {onlineExpanded ? (
                  <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={() => onSelectService('online-services')}
                className="inline-flex items-center gap-1.5 rounded-md bg-[#EFE6D8] px-4 py-2 text-xs font-semibold text-[#0D0C0B] whitespace-nowrap shrink-0 transition-colors hover:bg-[#D6C29F] cursor-pointer"
              >
                Request Online Work
              </button>
            </div>
          </div>

          {onlineExpanded && (
            <div className="grid grid-cols-1 gap-6 border-t border-[#EFE6D8]/12 px-5 py-6 sm:grid-cols-2 lg:grid-cols-4 sm:px-8">
              {ONLINE_SERVICES.map((item, idx) => (
                <div key={item.title}>
                  <p className="font-mono text-xs text-[#D6C29F] tabular-nums">
                    0{idx + 1}
                  </p>
                  <h4 className="mt-1 text-sm font-semibold text-[#EFE6D8]">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#A89B87]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
