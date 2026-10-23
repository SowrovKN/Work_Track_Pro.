import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesCombined,
  ClipboardCheck,
  UsersRound,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Bring your team together",
    description:
      "Give everyone a clear place to find their people, responsibilities, and shared priorities.",
    icon: UsersRound,
    tone: "bg-[#f4e8df] text-[#795548]",
  },
  {
    number: "02",
    title: "Make the work visible",
    description:
      "Log day-to-day tasks and hours so progress is easy to understand and keep up to date.",
    icon: ClipboardCheck,
    tone: "bg-[#e8f0e8] text-emerald-800",
  },
  {
    number: "03",
    title: "Move forward with clarity",
    description:
      "Use shared progress and payroll views to keep everyone informed about what comes next.",
    icon: ChartNoAxesCombined,
    tone: "bg-[#f7efd9] text-[#8d6b22]",
  },
];

const Workflow = () => {
  return (
    <section
      id="workflow"
      className="relative isolate my-12 overflow-hidden rounded-[2rem] bg-[#f8f5f1] px-5 py-16 sm:px-8 md:my-16 md:py-20 lg:px-12"
      aria-labelledby="workflow-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 -z-10 h-80 w-80 rounded-full bg-[#ead9ce]/70 blur-3xl"
      />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center" data-aos="fade-up">
          <span className="inline-flex items-center rounded-full border border-[#e6d7cc] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#795548]">
            A calmer way to work
          </span>
          <h2
            id="workflow-title"
            className="mt-5 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"
          >
            From busywork to{" "}
            <span className="text-[#9a684d]">better flow.</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            Keep the everyday essentials connected with one simple rhythm your
            whole team can follow.
          </p>
        </div>

        <div className="relative mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          <div
            aria-hidden="true"
            className="workflow-connector absolute left-[17%] right-[17%] top-10 hidden border-t-2 border-dashed border-[#d8c2b3] md:block"
          />
          {steps.map(({ number, title, description, icon: Icon, tone }, index) => (
            <article
              key={number}
              data-aos="fade-up"
              data-aos-delay={index * 120}
              className="workflow-card relative rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.16em] text-stone-400">
                  STEP {number}
                </span>
                <span
                  className={`workflow-icon relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl ${tone}`}
                >
                  <Icon size={24} aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-7 text-lg font-bold text-stone-900">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-9 text-center" data-aos="fade-up">
          <Link
            href="/registration"
            className="inline-flex items-center gap-2 rounded-xl bg-[#795548] px-5 py-3 font-semibold text-white shadow-lg shadow-[#795548]/15 transition duration-200 hover:-translate-y-0.5 hover:bg-[#674638] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#795548]"
          >
            Build your better workday
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
