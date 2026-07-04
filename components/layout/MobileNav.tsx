"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";

function HomeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h5v-6h2v6h5a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

function ProductsIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}

function CartIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function AccountIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.5-4 4-6 7.5-6s6 2 7.5 6" />
    </svg>
  );
}

const NAV = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Products", href: "/products", icon: ProductsIcon },
  { label: "Cart", href: "/quote", icon: CartIcon },
  { label: "Account", href: "/account", icon: AccountIcon },
] as const;

// Fixed bottom tab bar, mobile only. Sits below the full-screen hamburger
// menu (z-30 vs the menu's z-40) so opening the menu covers it, avoiding
// two overlapping navigation surfaces at once.
export default function MobileNav() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.items.length);

  return (
    <nav className="mobile-nav-bar md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center h-14">
        {NAV.map(({ label, href, icon: Icon }) => {
          const isActive = href === "/" ? pathname === href : pathname.startsWith(href);
          const isCart = label === "Cart";
          return (
            <Link
              key={label}
              href={href}
              aria-label={isCart && cartCount > 0 ? `Cart, ${cartCount} items` : label}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex-1 flex flex-col items-center justify-center gap-1 pt-2 pb-2.5 transition-colors duration-200
                          ${isActive ? "text-accent" : "text-text-secondary hover:text-text-primary"}`}
            >
              <span className="relative">
                <Icon />
                {isCart && cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1.5 min-w-3.75 h-3.75 px-0.75 rounded-full
                               bg-accent text-white text-[9px] font-bold flex items-center justify-center
                               tabular-nums"
                    aria-hidden="true"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </span>
              <span className="font-body text-[10px] tracking-wide uppercase">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
