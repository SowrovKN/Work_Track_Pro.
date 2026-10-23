
import pic from "../../assets/2333362_310830-P8R3OL-35.jpg";
import { ArrowUpRight, BriefcaseBusiness, HeartHandshake, Sparkles } from "lucide-react";

const Job = () => {
  return (
    <section className="py-16 md:py-24" aria-labelledby="job-section-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 overflow-hidden rounded-[2rem] bg-[#f7f3ef] p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <div className="relative">
            <img
              src={pic.src}
              alt="Colleagues sharing ideas in a collaborative workplace"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl shadow-stone-900/10"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-lg sm:left-7 sm:p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4e7dc] text-[#795548]">
                <HeartHandshake size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-stone-900">Work with purpose</p>
                <p className="text-sm text-stone-500">A place for every talent</p>
              </div>
            </div>
          </div>

          <div className="pt-4 lg:pt-0">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#795548]">
              <Sparkles size={16} aria-hidden="true" />
              Opportunity belongs to everyone
            </div>
            <h2
              id="job-section-title"
              className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl"
            >
              Meaningful work.
              <span className="text-[#9a684d]"> Brighter futures.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone-600">
              Everyone deserves the chance to grow, contribute, and build a life
              they’re proud of. We champion inclusive opportunities and
              skill-building so people from every background can find their
              path to meaningful work.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-stone-200/80 bg-white/70 p-4">
                <BriefcaseBusiness
                  size={20}
                  className="mt-0.5 shrink-0 text-[#795548]"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-stone-800">More ways to work</p>
                  <p className="mt-1 text-sm leading-6 text-stone-500">
                    Explore careers, freelance work, and new ventures.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-stone-200/80 bg-white/70 p-4">
                <ArrowUpRight
                  size={20}
                  className="mt-0.5 shrink-0 text-[#795548]"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-stone-800">Room to grow</p>
                  <p className="mt-1 text-sm leading-6 text-stone-500">
                    Build skills and move toward a brighter future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Job;
