import { BriefcaseBusiness } from "lucide-react";

const Loading = () => {
  return (
    <div
      className="flex min-h-[65vh] flex-col items-center justify-center bg-[#f8f6f3] px-5 py-16"
      role="status"
      aria-live="polite"
      aria-label="Loading your workspace"
    >
      <div className="flex w-full max-w-sm flex-col items-center rounded-[2rem] border border-stone-200/80 bg-white px-8 py-9 text-center shadow-xl shadow-stone-900/[0.04] sm:px-10">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span className="loading-orbit absolute inset-0 rounded-full border-[3px] border-[#795548]/10 border-t-[#795548]" />
          <span className="loading-orbit-reverse absolute inset-[10px] rounded-full border-2 border-[#d8ac8e]/20 border-b-[#bd8c6d]" />
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4e9e0] text-[#795548] shadow-sm">
            <BriefcaseBusiness size={23} aria-hidden="true" />
          </span>
          <span className="loading-indicator-dot absolute right-1 top-2 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-white" />
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#9a684d]">
          WorkTrackPro
        </p>
        <h2 className="mt-2 text-xl font-bold text-stone-900">
          Getting things ready
        </h2>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          Your workspace will be with you in just a moment.
        </p>

        <div
          className="loading-progress-track mt-7 h-1.5 w-full overflow-hidden rounded-full bg-stone-100"
          aria-hidden="true"
        >
          <span className="loading-progress-bar block h-full w-2/5 rounded-full bg-gradient-to-r from-[#795548] to-[#c99b7d]" />
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
