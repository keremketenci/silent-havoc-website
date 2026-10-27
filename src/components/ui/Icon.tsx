import { icons, type IconName } from "@/data/icons";

interface IconProps {
  name: IconName;
  className?: string;
  alt?: string;
}

export function Icon({ name, className, alt }: IconProps) {
  // Small static SVGs: next/image adds no benefit here
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={icons[name]} alt={alt ?? name} className={className} />;
}
