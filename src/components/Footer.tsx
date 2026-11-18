import {BUSINESS_INFO} from '../data/portfolioData';

export default function Footer() {
  return (
    <footer className="border-t border-[#EFE6D8]/12 bg-[#0D0C0B] text-[#EFE6D8]">
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:gap-8">
        <div>
          <p className="font-display text-xl font-semibold text-[#EFE6D8]">
            {BUSINESS_INFO.brand}
          </p>
          <p className="mt-1 text-xs text-[#A89B87]">
            {BUSINESS_INFO.proprietor} · {BUSINESS_INFO.address}
          </p>
        </div>

        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#B5A996]"
        >
          <a href="#services" className="hover:text-[#EFE6D8] transition-colors">
            Services
          </a>
          <a href="#portfolio" className="hover:text-[#EFE6D8] transition-colors">
            Portfolio
          </a>
          <a href="#partners" className="hover:text-[#EFE6D8] transition-colors">
            Partners
          </a>
          <a href="#contact" className="hover:text-[#EFE6D8] transition-colors">
            Contact
          </a>
        </nav>

        <p className="text-xs text-[#8F826E]">
          © {new Date().getFullYear()} {BUSINESS_INFO.brand}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
