export type ServiceId =
  | 'air-ticket'
  | 'rail-ticket'
  | 'money-transfer'
  | 'bus-ticket'
  | 'online-services';

export interface CoreService {
  id: ServiceId;
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  turnaround: string;
}

export interface PortfolioCase {
  id: string;
  category: 'Ticketing' | 'Banking' | 'Online Work';
  serviceId: ServiceId;
  title: string;
  clientContext: string;
  metric: string;
  description: string;
}

export interface PartnerItem {
  name: string;
  code: string;
  note: string;
}

export const BUSINESS_INFO = {
  invocation: 'Shree Ganesh',
  brand: 'Shiva Financial Solution',
  proprietor: 'V. K. Shukla',
  role: 'Proprietor & Financial Travel Consultant',
  hindiBanner: 'ऑनलाइन सम्बन्धित कार्य किये जाते है',
  hindiTranslation: 'All Online & Digital Documentation Services Undertaken',
  address: 'B-18, Ganesh Nagar, Pandav Nagar Complex, Delhi-92',
  email: 'shivatravelsagency@gmail.com',
  whatsapp: '9718392779',
  whatsappFormatted: '+91 97183 92779',
  phones: [
    {label: 'WhatsApp & Direct', number: '9718392779', formatted: '+91 97183 92779'},
    {label: 'Mobile Line 1', number: '8851002683', formatted: '+91 88510 02683'},
    {label: 'Mobile Line 2', number: '9810228721', formatted: '+91 98102 28721'},
  ],
};

export const CORE_SERVICES: CoreService[] = [
  {
    id: 'air-ticket',
    index: '01',
    title: 'Air Ticket',
    subtitle: 'Domestic & International',
    summary:
      'Confirmed flight reservations, fare comparisons, group itineraries, and instant e-ticket issuance across leading domestic and international carriers.',
    highlights: ['Air India & Air India Express', 'IndiGo & SpiceJet', 'Rescheduling & Baggage Desk'],
    turnaround: '10–15 min issuance',
  },
  {
    id: 'rail-ticket',
    index: '02',
    title: 'Rail Ticket',
    subtitle: 'IRCTC & Tatkal Desk',
    summary:
      'Priority railway reservations for Rajdhani, Shatabdi, Vande Bharat, and Express routes including sleeper, AC classes, and Tatkal assistance.',
    highlights: ['Confirmed & Tatkal Bookings', 'PNR Status & Route Planning', 'Senior Citizen & Family Quotas'],
    turnaround: 'Same-session confirmation',
  },
  {
    id: 'money-transfer',
    index: '03',
    title: 'Money Transfer',
    subtitle: 'Domestic Bank Remittance',
    summary:
      'Fast, verified domestic money transfers to any Indian bank account with immediate transaction receipts and transparent fee structures.',
    highlights: ['SBI, ICICI, Axis & Union Bank', 'IMPS & NEFT Instant Settlement', 'Verified Receipt Printing'],
    turnaround: 'Instant IMPS credit',
  },
  {
    id: 'bus-ticket',
    index: '04',
    title: 'Bus Ticket',
    subtitle: 'Intercity Coach Network',
    summary:
      'Comfortable overnight sleeper, Volvo AC, and state roadways coach bookings connecting Delhi-NCR to North and Central India destinations.',
    highlights: ['AC Sleeper & Seater Coaches', 'Boarding Point Guidance', 'Direct Operator Coordination'],
    turnaround: 'Immediate seat lock',
  },
];

export const ONLINE_SERVICES = [
  {
    title: 'PAN & Aadhaar Documentation',
    detail: 'New PAN applications, corrections, and Aadhaar-linked portal updates.',
  },
  {
    title: 'Utility Bills & Recharge',
    detail: 'Electricity, water, DTH, FASTag, and postpaid settlements with printed slips.',
  },
  {
    title: 'Passport & Government Forms',
    detail: 'Online appointment scheduling, application drafting, and document scanning.',
  },
  {
    title: 'E-Governance & Certificates',
    detail: 'Income, domicile, exam registration, and digital verification submissions.',
  },
];

export const PORTFOLIO_CASES: PortfolioCase[] = [
  {
    id: 'case-air-01',
    category: 'Ticketing',
    serviceId: 'air-ticket',
    title: 'Multi-Sector Corporate & Family Air Itineraries',
    clientContext: 'Delhi to Mumbai, Bengaluru & Gulf Corridors',
    metric: '15 min average turnaround',
    description:
      'Coordinated round-trip and connecting flight bookings with fare-lock protection, seat selection, and zero-error passenger manifest handling.',
  },
  {
    id: 'case-rail-02',
    category: 'Ticketing',
    serviceId: 'rail-ticket',
    title: 'Peak-Season & Festival Rail Logistics',
    clientContext: 'UP, Bihar & Pan-India Express Corridors',
    metric: 'Same-day PNR issuance',
    description:
      'Structured route alternatives, alternate boarding stations, and Tatkal window execution to keep family and workforce travel on schedule.',
  },
  {
    id: 'case-bank-03',
    category: 'Banking',
    serviceId: 'money-transfer',
    title: 'High-Trust Domestic Remittance Desk',
    clientContext: 'SBI, ICICI, Axis & Union Bank Accounts',
    metric: '100% receipt transparency',
    description:
      'Walk-in instant IMPS and NEFT transfers for East Delhi residents and local traders requiring reliable cross-bank settlement and physical confirmation slips.',
  },
  {
    id: 'case-online-04',
    category: 'Online Work',
    serviceId: 'online-services',
    title: 'End-to-End Online Portal & Citizen Services',
    clientContext: 'Ganesh Nagar & Pandav Nagar Complex',
    metric: 'Single-visit completion',
    description:
      'Complete digital form preparation, PDF formatting, fee payment, and acknowledgment printing under one roof without portal errors.',
  },
];

export const AIRLINE_PARTNERS: PartnerItem[] = [
  {name: 'Air India', code: 'AI', note: 'Full-service domestic & international'},
  {name: 'IndiGo', code: '6E', note: 'High-frequency domestic network'},
  {name: 'SpiceJet', code: 'SG', note: 'Regional & metro corridors'},
  {name: 'GoFirst / Akasa', code: 'QP', note: 'Value trunk route carriers'},
];

export const BANKING_PARTNERS: PartnerItem[] = [
  {name: 'State Bank of India', code: 'SBI', note: 'Nationwide branch & IMPS support'},
  {name: 'ICICI Bank', code: 'ICICI', note: 'Real-time domestic remittance'},
  {name: 'Axis Bank', code: 'AXIS', note: 'Express NEFT & account credit'},
  {name: 'Union Bank of India', code: 'UBI', note: 'Direct public-sector transfers'},
];

const WHATSAPP_SERVICE_INTROS: Record<ServiceId, string> = {
  'air-ticket':
    'I would like to book an Air Ticket (Domestic / International) and check available fares.',
  'rail-ticket':
    'I need assistance with a Rail Ticket (IRCTC / Tatkal) reservation.',
  'money-transfer':
    'I would like to inquire about a Domestic Money Transfer (IMPS / NEFT).',
  'bus-ticket':
    'I would like to book an Intercity Bus Ticket (Volvo / Sleeper / AC Coach).',
  'online-services':
    'I need assistance with Online Documentation Services (ऑनलाइन सम्बन्धित कार्य).',
};

export function getAutomatedWhatsAppMessage(params: {
  serviceId: ServiceId;
  name?: string;
  phone?: string;
  details?: string;
}): string {
  const serviceTitle =
    params.serviceId === 'online-services'
      ? 'Online Services (ऑनलाइन सम्बन्धित कार्य)'
      : CORE_SERVICES.find((s) => s.id === params.serviceId)?.title ?? 'Service Inquiry';

  const lines = [
    `Namaste ${BUSINESS_INFO.proprietor} Ji (${BUSINESS_INFO.brand}),`,
    WHATSAPP_SERVICE_INTROS[params.serviceId],
    `Service: ${serviceTitle}`,
  ];

  if (params.name?.trim()) {
    lines.push(`Name: ${params.name.trim()}`);
  }
  if (params.phone?.trim()) {
    lines.push(`Phone: ${params.phone.trim()}`);
  }
  if (params.details?.trim()) {
    lines.push(`Details: ${params.details.trim()}`);
  }

  lines.push('Please let me know the next steps. Thank you.');
  return lines.join('\n');
}

export function getWhatsAppUrl(params: {
  serviceId: ServiceId;
  name?: string;
  phone?: string;
  details?: string;
}): string {
  const message = getAutomatedWhatsAppMessage(params);
  return `https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
}

