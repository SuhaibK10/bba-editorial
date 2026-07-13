import { Heart } from "lucide-react";

export default function HeartIcon({
  size = 16,
  filled = false,
  className,
}: {
  size?: number;
  filled?: boolean;
  className?: string;
}) {
  return (
    <Heart
      size={size}
      fill={filled ? "currentColor" : "none"}
      aria-hidden="true"
      className={className}
    />
  );
}
