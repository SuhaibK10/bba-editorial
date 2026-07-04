// Shared industry list: icons + copy used by the home section
// and the /industries page. Keep labels in sync with data/products.ts.

export type Industry = {
  label: string;
  desc: string;
  icon: React.ReactNode;
};

const iconProps = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const industryList: Industry[] = [
  {
    label: "Telecom",
    desc: "Handset stands, live-demo units and charging stations for telecom retail, from flagship stores to multi-brand outlets.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: "Banking & Insurance",
    desc: "Literature holders, rate boards and queue displays for branches that need durable, professional presentation.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
  },
  {
    label: "Pharma & Healthcare",
    desc: "Counter displays and dispensers for pharmacies, clinics and hospital receptions. Easy to clean, built to last.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    label: "FMCG",
    desc: "POP displays, shelf risers and floor units engineered to drive impulse purchase at scale across distribution networks.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    label: "Cosmetics & Beauty",
    desc: "Premium acrylic testers, tiered risers and counter units that match the finish of the products they carry.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    label: "Hospitality",
    desc: "Menu stands, signage and charging stations for hotels, restaurants and lounges.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Automobile",
    desc: "Showroom displays, accessory stands and dealership signage built for high-footfall floors.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Electronics",
    desc: "Live-demo units, security stands and branded displays for consumer electronics retail.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    label: "Retail",
    desc: "End-caps, floor towers and counter units for supermarkets, department stores and franchise chains.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    label: "Education",
    desc: "Notice boards, literature racks and signage for schools, universities and coaching institutes.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    label: "Real Estate",
    desc: "Brochure stands, scale-model cases and site-office displays for developers and brokers.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Government",
    desc: "Public-information displays, notice systems and signage for departments and public-sector offices.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <line x1="12" y1="2" x2="12" y2="6" />
        <path d="M3 10h18v2H3z" />
        <rect x="4" y="12" width="3" height="8" />
        <rect x="10.5" y="12" width="3" height="8" />
        <rect x="17" y="12" width="3" height="8" />
        <path d="M2 20h20v2H2z" />
      </svg>
    ),
  },
  {
    label: "Petroleum",
    desc: "Weather-proof blow-moulded signage and forecourt displays for fuel-station networks.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M12 2c-4 4-6 7-6 10a6 6 0 0012 0c0-3-2-6-6-10z" />
      </svg>
    ),
  },
];
