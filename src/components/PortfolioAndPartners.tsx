import {ArrowUpRight} from 'lucide-react';
import {useState} from 'react';
import {
  AIRLINE_PARTNERS,
  BANKING_PARTNERS,
  PORTFOLIO_CASES,
  type PortfolioCase,
  type ServiceId,
} from '../data/portfolioData';

interface PortfolioAndPartnersProps {
  onSelectService: (id: ServiceId) => void;
}

type FilterCategory = 'All' | PortfolioCase['category'];

const FILTER_OPTIONS: FilterCategory[] = ['All', 'Ticketing', 'Banking', 'Online Work'];

export default function PortfolioAndPartners({
  onSelectService,
}: PortfolioAndPartnersProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

  const visibleCases =
    activeFilter === 'All'
      ? PORTFOLIO_CASES
      : PORTFOLIO_CASES.filter((item) => item.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="border-t border-[#EFE6D8]/12 bg-[#141210] text-[#EFE6D8]"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        {/* Portfolio Header + Filter Tabs */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#EFE6D8]/14 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#D6C29F]">
              02. Service Portfolio
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#EFE6D8] sm:text-4xl text-balance">
              Proven Execution Across Travel &amp; Remittance
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter portfolio work"
            className="inline-flex w-fit max-w-full flex-wrap items-center gap-1 rounded-lg border border-[#EFE6D8]/14 bg-[#0D0C0B] p-1"
          >
            {FILTER_OPTIONS.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeFilter === category}
                onClick={() => setActiveFilter(category)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer sm:px-3.5 ${
                  activeFilter === category
                    ? 'bg-[#EFE6D8] text-[#0D0C0B]'
                    : 'text-[#B5A996] hover:text-[#EFE6D8]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Case Study Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {visibleCases.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-[#EFE6D8]/14 bg-[#0D0C0B] p-6 sm:p-7"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#A89B87]">
                  <span className="text-[#D6C29F]">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.clientContext}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums text-[#EFE6D8]">{item.metric}</span>
                </div>

                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#EFE6D8]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#C2B6A3]">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 border-t border-[#EFE6D8]/10 pt-4">
                <button
                  type="button"
                  onClick={() => onSelectService(item.serviceId)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6C29F] whitespace-nowrap shrink-0 transition-colors hover:text-[#EFE6D8] cursor-pointer"
                >
                  Inquire Similar Service
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Institutional & Carrier Network */}
        <div id="partners" className="mt-16 border-t border-[#EFE6D8]/14 pt-14">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#D6C29F]">
                03. Institutional &amp; Carrier Network
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#EFE6D8] sm:text-4xl text-balance">
                Aviation Carriers &amp; Partner Banks
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#A89B87]">
              Direct service facilitation across India&apos;s primary airlines and nationalized as
              well as private banking institutions.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Airlines */}
            <div className="rounded-xl border border-[#EFE6D8]/14 bg-[#0D0C0B] p-6">
              <p className="border-b border-[#EFE6D8]/12 pb-3 text-xs font-semibold tracking-wider text-[#D6C29F]">
                Aviation Partners
              </p>
              <div className="mt-4 divide-y divide-[#EFE6D8]/10">
                {AIRLINE_PARTNERS.map((partner) => (
                  <div
                    key={partner.name}
                    className="flex items-center justify-between gap-4 py-3.5 first:pt-1 last:pb-1"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#EFE6D8]">
                        {partner.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[#A89B87]">{partner.note}</p>
                    </div>
                    <span className="font-mono text-xs font-medium text-[#D6C29F] tabular-nums">
                      {partner.code}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Banking */}
            <div className="rounded-xl border border-[#EFE6D8]/14 bg-[#0D0C0B] p-6">
              <p className="border-b border-[#EFE6D8]/12 pb-3 text-xs font-semibold tracking-wider text-[#D6C29F]">
                Banking &amp; Remittance Network
              </p>
              <div className="mt-4 divide-y divide-[#EFE6D8]/10">
                {BANKING_PARTNERS.map((bank) => (
                  <div
                    key={bank.name}
                    className="flex items-center justify-between gap-4 py-3.5 first:pt-1 last:pb-1"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#EFE6D8]">
                        {bank.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[#A89B87]">{bank.note}</p>
                    </div>
                    <span className="font-mono text-xs font-medium text-[#D6C29F] tabular-nums">
                      {bank.code}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
