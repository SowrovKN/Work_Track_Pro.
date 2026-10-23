"use client";

import { useContext } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AuthContext } from "../../components/firebase/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const displayName = user?.displayName || "WorkTrackPro member";
  const initials = displayName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const createdAt = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <div className="mx-auto max-w-6xl">
      <section className="dashboard-card-enter relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#563b30] via-[#795548] to-[#9a684d] px-6 py-8 text-white shadow-xl shadow-[#795548]/15 sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-3 -top-12 -z-10 h-52 w-52 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 right-1/3 -z-10 h-48 w-48 rounded-full bg-[#d8ac8e]/15 blur-3xl" />
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-[#f0d9c9]">
          <Sparkles size={16} aria-hidden="true" />
          Your personal workspace
        </div>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Good to have you here, {displayName.split(" ")[0]}.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
          Your work, people, and progress come together here. Take a moment to
          make sure your account details are up to date.
        </p>
      </section>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1.35fr_0.8fr]">
        <section className="dashboard-card-enter rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-400">
                Account details
              </p>
              <h3 className="mt-2 text-xl font-bold text-stone-900">
                Your profile
              </h3>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              Active account
            </span>
          </div>

          <div className="mt-7 flex flex-col gap-5 border-b border-stone-100 pb-7 sm:flex-row sm:items-center">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[1.6rem] bg-[#f0e5dd] text-2xl font-bold text-[#795548] ring-4 ring-[#f8f4f0]">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={`${displayName}'s profile`}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div className="min-w-0">
              <h4 className="truncate text-xl font-bold text-stone-900">
                {displayName}
              </h4>
              <p className="mt-1 text-sm text-stone-500">
                WorkTrackPro team member
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#f7f3ef] px-2.5 py-1.5 text-xs font-medium text-[#795548]">
                <BadgeCheck size={14} aria-hidden="true" />
                {user?.emailVerified ? "Email verified" : "Workspace account"}
              </span>
            </div>
          </div>

          <dl className="grid gap-5 pt-6 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-500">
                <Mail size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs font-medium text-stone-400">Email address</dt>
                <dd className="mt-1 break-all text-sm font-semibold text-stone-800">
                  {user?.email || "Not available"}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-500">
                <CalendarDays size={18} aria-hidden="true" />
              </span>
              <div>
                <dt className="text-xs font-medium text-stone-400">Member since</dt>
                <dd className="mt-1 text-sm font-semibold text-stone-800">
                  {createdAt}
                </dd>
              </div>
            </div>
          </dl>
        </section>

        <aside className="dashboard-card-enter flex flex-col rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm sm:p-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <ShieldCheck size={23} aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-xl font-bold text-stone-900">
            Your workspace is ready
          </h3>
          <p className="mt-2 text-sm leading-7 text-stone-500">
            Use the menu to access the tools available to your team. Your
            workspace keeps everything organized in one place.
          </p>
          <div className="mt-6 rounded-2xl bg-[#f8f5f2] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
              Account status
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-stone-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Signed in and secure
            </p>
          </div>
          <p className="mt-auto pt-6 text-xs leading-5 text-stone-400">
            Keep your sign-in details private and contact your administrator if
            you need help.
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Profile;
