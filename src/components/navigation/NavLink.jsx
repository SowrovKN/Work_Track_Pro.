"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ to, end = false, className = "", children, ...props }) {
  const pathname = usePathname();
  const isActive = end
    ? pathname === to
    : pathname === to || pathname.startsWith(`${to}/`);
  const resolvedClassName =
    typeof className === "function" ? className({ isActive }) : className;

  return (
    <Link
      href={to}
      className={resolvedClassName}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}
    </Link>
  );
}
