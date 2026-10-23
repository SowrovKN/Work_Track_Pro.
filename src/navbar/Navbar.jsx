"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { AuthContext } from "../components/firebase/AuthProvider";
import NavLink from "../components/navigation/NavLink";

const navigationLinkClass =
  "text-sm font-medium text-stone-600 transition hover:text-[#795548]";

const Navbar = () => {
  const { user, logOut, setUser, loading: authLoading } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  const signOut = async () => {
    setSignOutError("");
    try {
      await logOut();
      setUser(null);
      setMenuOpen(false);
    } catch (error) {
      console.error("Unable to sign out:", error);
      setSignOutError("Sign out failed. Please try again.");
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-white/90 shadow-sm shadow-stone-900/[0.03] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] w-11/12 max-w-7xl items-center justify-between gap-5">
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex shrink-0 items-center gap-3"
          aria-label="WorkTrackPro home"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#795548] text-white shadow-lg shadow-[#795548]/20 transition group-hover:-rotate-3 group-hover:scale-105">
            <BriefcaseBusiness size={21} aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight text-stone-900 sm:text-xl">
            WorkTrack<span className="text-[#9a684d]">Pro</span>
            <span className="text-[#9a684d]">.</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          <Link href="/#services" className={navigationLinkClass}>
            Features
          </Link>
          <Link href="/#workflow" className={navigationLinkClass}>
            How it works
          </Link>
          <Link href="/#blogs" className={navigationLinkClass}>
            Resources
          </Link>
          <NavLink to="/contact" className={navigationLinkClass}>
            Contact
          </NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {authLoading ? (
            <span
              aria-label="Checking account"
              className="h-10 w-28 animate-pulse rounded-xl bg-stone-100"
            />
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-[#795548] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#795548]/15 transition hover:-translate-y-0.5 hover:bg-[#674638]"
              >
                Open dashboard
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex items-center gap-2 rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-[#795548]/30 hover:bg-[#795548]/5 hover:text-[#795548]"
              >
                <LogOut size={16} aria-hidden="true" />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
              >
                Log in
              </Link>
              <Link
                href="/registration"
                className="inline-flex items-center gap-2 rounded-xl bg-[#795548] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#795548]/15 transition hover:-translate-y-0.5 hover:bg-[#674638]"
              >
                Get started
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 text-stone-700 transition hover:bg-stone-50 md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {signOutError && (
        <p role="alert" className="mx-auto w-11/12 max-w-7xl pb-3 text-sm text-red-700">
          {signOutError}
        </p>
      )}

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-stone-100 bg-white px-[5.5%] py-5 shadow-lg md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            <Link
              href="/#services"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-medium text-stone-700 hover:bg-stone-50"
            >
              Features
            </Link>
            <Link
              href="/#workflow"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-medium text-stone-700 hover:bg-stone-50"
            >
              How it works
            </Link>
            <Link
              href="/#blogs"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-medium text-stone-700 hover:bg-stone-50"
            >
              Resources
            </Link>
            <NavLink
              to="/contact"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-medium text-stone-700 hover:bg-stone-50"
            >
              Contact
            </NavLink>
            {authLoading ? (
              <div
                aria-label="Checking account"
                className="mt-3 h-11 animate-pulse rounded-xl bg-stone-100"
              />
            ) : user ? (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 font-medium text-stone-700 hover:bg-stone-50"
                >
                  Dashboard
                </NavLink>
                <button
                  type="button"
                  onClick={signOut}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-stone-200 px-4 py-3 font-semibold text-stone-700"
                >
                  <LogOut size={17} aria-hidden="true" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="rounded-xl border border-stone-200 px-4 py-3 text-center font-semibold text-stone-700"
                >
                  Log in
                </Link>
                <Link
                  href="/registration"
                  onClick={closeMenu}
                  className="rounded-xl bg-[#795548] px-4 py-3 text-center font-semibold text-white"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
