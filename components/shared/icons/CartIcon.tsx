type IconProps = { size?: number; active?: boolean; className?: string };

// Shopping-bag cart mark shared by the desktop navbar and the mobile tab
// bar. Outline by default; `active` switches to the filled state used for
// the mobile bar's current-tab treatment.
export default function CartIcon({ size = 20, active, className }: IconProps) {
  if (active) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" fill="currentColor" />
        <path d="M3 6h18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 10a4 4 0 0 1-8 0" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
