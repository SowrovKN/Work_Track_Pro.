"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Check } from "lucide-react";
import heroImage from "../../assets/19874.jpg";

const Banner = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-[#fbf8f5] via-white to-[#f4ece6]">
      <div className="mx-auto grid w-11/12 max-w-7xl items-center gap-12 py-16 md:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ead9ce] bg-white/80 px-4 py-2 text-sm font-semibold text-[#795548] shadow-sm">
            <BriefcaseBusiness size={16} aria-hidden="true" />
            A better way to work together
          </div>
          <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-stone-900 sm:text-6xl">
            Make work
            <span className="block text-[#9a684d]">flow beautifully.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-stone-600">
            Bring your people, tasks, and progress into one calm, easy-to-use
            workspace. Less busywork, more meaningful work.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/registration"
              className="inline-flex items-center gap-2 rounded-xl bg-[#795548] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#795548]/20 transition hover:-translate-y-0.5 hover:bg-[#674638]"
            >
              Get started
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              href="#services"
              className="rounded-xl px-5 py-3.5 font-semibold text-stone-700 transition hover:bg-white"
            >
              Explore features
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-stone-500">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e8f2e8] text-emerald-700">
              <Check size={14} aria-hidden="true" />
            </span>
            Simple tools for happier, more productive teams
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
          <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-[#ead9ce]/70 blur-2xl" />
          <Image
            src={heroImage}
            alt="A team collaborating around a shared workspace"
            priority
            sizes="(max-width: 1024px) 92vw, 44vw"
            className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl shadow-stone-900/15"
          />
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-stone-100 bg-white p-4 shadow-xl sm:left-7 sm:p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4e7dc] text-[#795548]">
              <BriefcaseBusiness size={21} aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold text-stone-900">Your team, in sync</p>
              <p className="text-sm text-stone-500">Everything in one place</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
