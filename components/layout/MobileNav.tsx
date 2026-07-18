"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { useCommerceCartStore } from "@/lib/commerce-cart-store";
import { useVisualViewportBottomOffset } from "@/lib/use-visual-viewport-offset";
import CartIcon from "@/components/shared/icons/CartIcon";

type IconProps = { size?: number; active?: boolean };

function HomeIcon({ size = 20, active }: IconProps) {
  if (active) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3.2a1 1 0 0 1 .64.23l8 6.5a1 1 0 0 1 .36.77V19a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1v-5h-2v5a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-8.3a1 1 0 0 1 .36-.77l8-6.5a1 1 0 0 1 .64-.23Z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 9.5V19a1 1 0 0 0 1 1h4v-5.5h2V20h4a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

function ProductsIcon({ size = 20, active }: IconProps) {
  if (active) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="2.25" />
        <rect x="13" y="3.5" width="7.5" height="7.5" rx="2.25" />
        <rect x="3.5" y="13" width="7.5" height="7.5" rx="2.25" />
        <rect x="13" y="13" width="7.5" height="7.5" rx="2.25" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="2" />
      <rect x="13" y="3.5" width="7.5" height="7.5" rx="2" />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="2" />
      <rect x="13" y="13" width="7.5" height="7.5" rx="2" />
    </svg>
  );
}

function AccountIcon({ size = 20, active }: IconProps) {
  if (active) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M12 13c-4.2 0-7.7 2.8-9 7a1 1 0 0 0 .97 1.3h16.06a1 1 0 0 0 .97-1.3c-1.3-4.2-4.8-7-9-7Z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.5-4 4-6 7.5-6s6 2 7.5 6" />
    </svg>
  );
}

const NAV = [
  { label: "Home", href: "/", icon: HomeIcon },
  // Lands on the filterable shop grid, not the category-cards page — but
  // stays highlighted across every /products/* route (category pages,
  // item pages) via activeMatch, since those are still "shopping."
  { label: "Shop", href: "/products/all", activeMatch: "/products", icon: ProductsIcon },
  { label: "Cart", href: "/cart", icon: CartIcon },
  { label: "Account", href: "/account", icon: AccountIcon },
] as const;

// Fixed bottom tab bar, mobile + tablet (hidden at xl, matching the
// breakpoint where Navbar reveals its full desktop pill — so this bar
// stays visible through iPad-sized screens, not just phones). Sits below
// the full-screen hamburger menu (z-30 vs the menu's z-40) so opening the
// menu covers it, avoiding two overlapping navigation surfaces at once.
// Each icon has an outline (inactive) and filled (active) state, matching
// the dual-state pattern used in most premium iOS/Android tab bars.
export default function MobileNav() {
  const pathname = usePathname();
  const quoteCartCount = useCartStore((s) => s.items.length);
  const commerceCartCount = useCommerceCartStore((s) => s.items.length);
  const cartCount = quoteCartCount + commerceCartCount;
  const navRef = useVisualViewportBottomOffset<HTMLElement>();

  return (
    <nav
      ref={navRef}
      className="mobile-nav-bar xl:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-border"
    >
      <div className="flex items-center h-14">
        {NAV.map(({ label, href, icon: Icon, ...rest }) => {
          const matchOn = "activeMatch" in rest ? rest.activeMatch : href;
          const isActive = matchOn === "/" ? pathname === matchOn : pathname.startsWith(matchOn);
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
              <span className="relative flex leading-none">
                <Icon active={isActive} />
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
              <span className="font-body text-[10px] leading-none tracking-wide uppercase">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
