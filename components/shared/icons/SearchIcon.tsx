import { Search } from "lucide-react";

export default function SearchIcon({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return <Search size={size} aria-hidden="true" className={className} />;
}
