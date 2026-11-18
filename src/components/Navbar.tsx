import {Menu, X} from 'lucide-react';
import {useState} from 'react';
import {BUSINESS_INFO} from '../data/portfolioData';

interface NavbarProps {
  onRequestService: () => void;
}

const NAV_LINKS = [
  {label: 'Services', href: '#services'},
  {label: 'Portfolio', href: '#portfolio'},
  {label: 'Partners', href: '#partners'},
  {label: 'Contact', href: '#contact'},
];

export default function Navbar({onRequestService}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  const handleCtaClick = () => {
    setMobileOpen(false);
    onRequestService();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#EFE6D8]/12 bg-[#0D0C0B]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 py-3.5 sm:py-4">
        <a
          href="#top"
          className="font-display text-lg sm:text-xl font-semibold tracking-tight text-[#EFE6D8] whitespace-nowrap shrink-0 transition-colors hover:text-[#D6C29F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6C29F]"
        >
          {BUSINESS_INFO.brand}
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#BFB4A2]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 border-b border-transparent py-1 transition-colors duration-150 hover:border-[#D6C29F] hover:text-[#EFE6D8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6C29F]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleCtaClick}
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-[#EFE6D8] px-4 py-2 text-xs font-semibold tracking-wide text-[#0D0C0B] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#D6C29F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6C29F] cursor-pointer"
          >
            Request Service
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#EFE6D8]/20 text-[#EFE6D8] md:hidden transition-colors hover:border-[#D6C29F] focus-visible:outline-2 focus-visible:outline-[#D6C29F] cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#EFE6D8]/12 bg-[#141210] px-6 py-4 md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="py-2 text-sm font-medium text-[#EFE6D8] transition-colors hover:text-[#D6C29F]"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleCtaClick}
              className="mt-2 w-full rounded-md bg-[#EFE6D8] px-4 py-2.5 text-xs font-semibold text-[#0D0C0B] transition-colors hover:bg-[#D6C29F] cursor-pointer"
            >
              Request Service
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
