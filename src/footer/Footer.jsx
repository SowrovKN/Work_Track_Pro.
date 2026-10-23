"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Check, Mail } from "lucide-react";
import { AuthContext } from "../components/firebase/AuthProvider";

const Footer = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#201a17] text-stone-300">
      <div className="mx-auto w-11/12 max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 py-14 md:grid-cols-2 md:items-start lg:grid-cols-[1.2fr_0.7fr_0.7fr_1.4fr] lg:gap-10 lg:py-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#795548] text-white">
                <BriefcaseBusiness size={21} aria-hidden="true" />
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                WorkTrack<span className="text-[#c99b7d]">Pro</span>
                <span className="text-[#c99b7d]">.</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-stone-400">
              Thoughtful tools to bring your people, projects, and progress
              together.
            </p>
          </div>

          <nav aria-label="Explore">
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Explore
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <Link className="transition hover:text-white" href="/#services">
                  Features
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href="/#workflow">
                  How it works
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href="/#blogs">
                  Resources
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Account">
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Your workspace
            </h2>
            <ul className="space-y-3 text-sm">
              {authLoading ? (
                <li
                  aria-label="Checking account"
                  className="h-4 w-28 animate-pulse rounded bg-white/10"
                />
              ) : user ? (
                <>
                  <li>
                    <Link
                      className="transition hover:text-white"
                      href="/dashboard"
                    >
                      Open dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition hover:text-white"
                      href="/dashboard"
                    >
                      Your profile
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className="transition hover:text-white" href="/login">
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition hover:text-white"
                      href="/registration"
                    >
                      Create an account
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <div>
            <h2 className="text-lg font-semibold text-white">
              A little more focus in your inbox.
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-400">
              Occasional product tips and updates. No noise.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="mt-5 flex flex-col gap-3 sm:flex-row"
            >
              <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 focus-within:border-[#c99b7d]">
                <Mail size={17} className="shrink-0 text-stone-400" aria-hidden="true" />
                <span className="sr-only">Email address</span>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={subscribed}
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-stone-500 disabled:opacity-60 border-0 focus:border-0 focus:outline-none focus:ring-0"
                />
              </label>
              <button
                type="submit"
                disabled={subscribed}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c99b7d] px-5 py-3 text-sm font-semibold text-[#201a17] transition hover:bg-[#d9b39b] disabled:cursor-default disabled:opacity-80"
              >
                {subscribed ? (
                  <>
                    <Check size={17} aria-hidden="true" />
                    You&apos;re in
                  </>
                ) : (
                  <>
                    Join us
                    <ArrowRight size={16} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WorkTrackPro. Built for better work.</p>
          <p>Make work flow beautifully.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
