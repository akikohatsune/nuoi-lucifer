"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/member", label: "Member" },
  { href: "/donate", label: "Donate" },
  { href: "/blog", label: "List" },
  { href: "/changelog", label: "Changelog" },
  { href: "/help", label: "Help" },
  { href: "/admin", label: "Login" },
];

export default function NavMenu() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const details = detailsRef.current;
    if (details?.open) {
      details.open = false;
    }
  }, [pathname]);

  const closeMenu = () => {
    const details = detailsRef.current;
    if (details?.open) {
      details.open = false;
    }
  };

  return (
    <details className="nav-menu" ref={detailsRef}>
      <summary>
        <i className="fa-solid fa-bars" aria-hidden="true" />
        <span>Menu</span>
      </summary>
      <nav className="nav-links">
        {links.map((link) => (
          <Link href={link.href} key={link.href} onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
