"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import CartButton from "@/components/CartButton";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));
  const base = "px-3 py-2 rounded-md text-sm font-medium";
  const classes = active
    ? `${base} bg-black/5 dark:bg-white/10`
    : `${base} hover:bg-black/5 dark:hover:bg-white/10`;
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
};

export default function Header() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/10 dark:border-white/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-semibold">WalkieRentals</Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/rentals">Rentals</NavLink>
            <NavLink href="/packages">Packages</NavLink>
            <NavLink href="/accessories">Accessories</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <CartButton />
          {isAdmin && <NavLink href="/admin">Admin</NavLink>}
          {session?.user ? (
            <button
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </button>
          ) : (
            <button
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
