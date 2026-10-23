"use client";

/* eslint react/prop-types: off */
import { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  FileSpreadsheet,
  Home,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import NavLink from "../../components/navigation/NavLink";
import { AuthContext } from "../../components/firebase/AuthProvider";
import Loading from "../../screens/loading/Loading";
import Error from "../../screens/Error/Error";

const navigationByRole = {
  employee: [
    { label: "Work sheet", href: "/dashboard/worksheet", icon: FileSpreadsheet },
    { label: "Payment history", href: "/dashboard/paymentHistory", icon: CreditCard },
  ],
  hr: [
    { label: "Employee list", href: "/dashboard/empList", icon: Users },
    { label: "Team progress", href: "/dashboard/progress", icon: BarChart3 },
  ],
  admin: [
    { label: "All employees", href: "/dashboard/allEmployee", icon: Users },
    { label: "Payroll", href: "/dashboard/payroll", icon: Wallet },
  ],
};

const pageTitles = {
  "/dashboard": "Your overview",
  "/dashboard/worksheet": "Work sheet",
  "/dashboard/paymentHistory": "Payment history",
  "/dashboard/empList": "Employee list",
  "/dashboard/progress": "Team progress",
  "/dashboard/allEmployee": "All employees",
  "/dashboard/payroll": "Payroll",
};

const DashLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    data: employee = {},
    isPending,
    error,
  } = useQuery({
    queryKey: ["user", user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getUser/${encodeURIComponent(user.email)}`
      );
      if (!res.ok) throw new Error("Unable to load your workspace profile.");
      return res.json();
    },
  });

  if (isPending) return <Loading />;
  if (error) return <Error />;

  const roleLinks = navigationByRole[employee.role] || [];
  const displayName = employee.name || user?.displayName || "Welcome";
  const initials = displayName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const pageTitle = pageTitles[pathname] || "Workspace";

  const renderNavLink = ({ label, href, icon: Icon }, mobile = false) => (
    <NavLink
      key={href}
      to={href}
      end={href === "/dashboard"}
      onClick={mobile ? () => setMobileMenuOpen(false) : undefined}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-white text-[#795548] shadow-sm"
            : "text-stone-300 hover:translate-x-0.5 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      <Icon size={18} aria-hidden="true" />
      <span className="flex-1">{label}</span>
      <ChevronRight
        size={15}
        aria-hidden="true"
        className="opacity-0 transition group-aria-[current=page]:opacity-60"
      />
    </NavLink>
  );

  const renderSidebarContent = (mobile = false) => (
    <>
      

      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
        Workspace
      </p>
      <nav aria-label="Dashboard navigation" className="flex flex-col gap-1.5">
        {renderNavLink(
          { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
          mobile
        )}
        {roleLinks.map((item) => renderNavLink(item, mobile))}
      </nav>

      <p className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
        Quick links
      </p>
      <nav aria-label="Quick links" className="flex flex-col gap-1.5">
        {renderNavLink({ label: "Home", href: "/", icon: Home }, mobile)}
        {renderNavLink(
          { label: "Contact support", href: "/contact", icon: MessageCircle },
          mobile
        )}
      </nav>

      <div className="mt-auto pt-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
          <p className="text-sm font-semibold text-white">Need a hand?</p>
          <p className="mt-1 text-xs leading-5 text-stone-400">
            Our team is here to help you stay on track.
          </p>
          <Link
            href="/contact"
            onClick={mobile ? () => setMobileMenuOpen(false) : undefined}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#e6c2a8] transition hover:text-white"
          >
            Contact support
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d8ac8e] text-sm font-bold text-[#3b2821]">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-white">
              {displayName}
            </span>
            <span className="block truncate text-xs capitalize text-stone-400">
              {employee.role || "Team member"}
            </span>
          </span>
          <CircleUserRound
            size={17}
            className="shrink-0 text-stone-400"
            aria-hidden="true"
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f7f5f2] md:flex">
      <aside className="sticky top-[76px] hidden h-[calc(100vh-76px)] max-h-[calc(100dvh-76px)] w-[300px] shrink-0 flex-col overflow-y-auto bg-[#2c211c] px-10 py-7 md:flex">
        {renderSidebarContent()}
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-stone-950/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside
            id="dashboard-mobile-navigation"
            className="dashboard-drawer-enter absolute inset-y-0 left-0 flex max-h-dvh w-[min(85vw,300px)] flex-col overflow-y-auto bg-[#2c211c] px-5 py-7 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-lg text-stone-300 hover:bg-white/10 hover:text-white"
            >
              <X size={19} />
            </button>
            {renderSidebarContent(true)}
          </aside>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex min-h-[76px] items-center justify-between gap-4 border-b border-stone-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-7 lg:pl-10 lg:pr-14">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open dashboard navigation"
              aria-expanded={mobileMenuOpen}
              aria-controls="dashboard-mobile-navigation"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-stone-200 text-stone-700 transition hover:border-[#795548]/30 hover:bg-[#795548]/5 md:hidden"
            >
              <Menu size={19} aria-hidden="true" />
            </button>
            <div className="min-w-0">
              
              <h1 className="truncate text-lg font-bold text-stone-900 sm:text-xl">
                {pageTitle}
              </h1>
            </div>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="text-right">
              <span className="block text-sm font-semibold text-stone-800">
                {displayName}
              </span>
              <span className="block text-xs capitalize text-stone-500">
                {employee.role || "Team member"}
              </span>
            </span>
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#ead9ce] text-sm font-bold text-[#795548] shadow-sm ring-1 ring-stone-200">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </span>
          </div>
        </header>
        <main className="dashboard-page-enter p-4 sm:p-7 lg:pl-10 lg:pr-14">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashLayout;
