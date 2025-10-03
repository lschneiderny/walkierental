"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import CartButton from "@/components/CartButton";
import LoginModal from "@/components/LoginModal";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const pathname = usePathname();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isDropdownOpen = (id: string) => openDropdowns.includes(id);

  const isActive = (href: string) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        <nav className="bg-white dark:bg-gray-900 rounded-lg shadow-sm shadow-gray-300/20 dark:shadow-gray-700/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-2 no-underline">
                  <Image
                    src="https://7eeuu4wend.ufs.sh/f/hytIev0arWPe7HYbKt58nlvh0qWXKtCLQzmT6w239gbfxkoF"
                    alt="WalkieRentals Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    WalkieRentals
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center">
                <ul className="flex items-center gap-2 p-0 text-base">
                  
                  {/* Packages Link - Primary */}
                  <li className="relative">
                    <Link
                      href="/packages"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                        hover:bg-gray-100 dark:hover:bg-gray-800
                        ${
                          isActive("/packages")
                            ? "text-[color:var(--primary)]"
                            : "text-gray-700 dark:text-gray-300"
                        }
                      `}
                    >
                      Packages
                    </Link>
                  </li>

                  {/* Equipment Link */}
                  <li className="relative">
                    <Link
                      href="/rentals"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                        hover:bg-gray-100 dark:hover:bg-gray-800
                        ${
                          isActive("/rentals")
                            ? "text-[color:var(--primary)]"
                            : "text-gray-700 dark:text-gray-300"
                        }
                      `}
                    >
                      Equipment
                    </Link>
                  </li>

                  {/* Quote Link */}
                  <li className="relative">
                    <Link
                      href="/quote"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                        hover:bg-gray-100 dark:hover:bg-gray-800
                        ${
                          isActive("/quote")
                            ? "text-[color:var(--primary)]"
                            : "text-gray-700 dark:text-gray-300"
                        }
                      `}
                    >
                      Request Quote
                    </Link>
                  </li>


                  {/* Admin Link (if admin) */}
                  {isAdmin && (
                    <li>
                      <Link
                        href="/admin"
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                          hover:bg-gray-100 dark:hover:bg-gray-800
                          ${
                            isActive("/admin")
                              ? "text-[color:var(--primary)]"
                              : "text-gray-700 dark:text-gray-300"
                          }
                        `}
                      >
                        Admin
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-4">
                <CartButton />

                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>

                {/* Login/Logout Button */}
                {session?.user ? (
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="hidden md:inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[color:var(--primary)] hover:bg-[color:var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--primary)]"
                  >
                    Sign out
                  </button>
                ) : (
                  <button
                    onClick={() => setLoginModalOpen(true)}
                    className="hidden md:inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[color:var(--primary)] hover:bg-[color:var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--primary)]"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
              <ul className="px-2 pt-2 pb-3 space-y-1">
                {/* Mobile Packages Link - Primary */}
                <li>
                  <Link
                    href="/packages"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Packages
                  </Link>
                </li>

                {/* Mobile Equipment Link */}
                <li>
                  <Link
                    href="/rentals"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Equipment
                  </Link>
                </li>

                {/* Mobile Quote Link */}
                <li>
                  <Link
                    href="/quote"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Request Quote
                  </Link>
                </li>


                {/* Mobile Admin Link (if admin) */}
                {isAdmin && (
                  <li>
                    <Link
                      href="/admin"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  </li>
                )}

                {/* Mobile Login/Logout */}
                <li className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  {session?.user ? (
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Sign out
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setLoginModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Login
                    </button>
                  )}
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
}
