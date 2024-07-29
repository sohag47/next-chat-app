import { Button } from "@nextui-org/react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  exact?: boolean;
  children: ReactNode;
  className?: string;
} & LinkProps;

export const NavLink = ({
  href,
  exact = false,
  children,
  className = "",
}: NavLinkProps) => {
  const pathname = usePathname();
  const active = "shadow text-light bg-foreground dark:bg-primary";
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    className += active;
  }

  return (
    <Button as={Link} className={className} href={href} variant="bordered">
      {children}
    </Button>
  );
};
