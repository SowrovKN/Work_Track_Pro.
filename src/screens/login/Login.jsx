"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UsersRound,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../components/firebase/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const { login, google, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkAccountIsActive = async (email) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/getUser/${encodeURIComponent(email)}`
    );
    if (response.data?.fired) {
      await Swal.fire({
        icon: "error",
        title: "Account unavailable",
        text: "Your account has been disabled. Please contact your administrator.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const form = event.currentTarget;
      const email = form.email.value;
      const password = form.password.value;
      if (!(await checkAccountIsActive(email))) return;

      const credential = await login(email, password);
      setUser(credential.user);
      await Swal.fire({
        icon: "success",
        title: "Welcome back",
        text: "You are now signed in to WorkTrackPro.",
        timer: 1400,
        showConfirmButton: false,
      });
      router.push("/");
    } catch (error) {
      console.error("Unable to sign in:", error);
      await Swal.fire({
        icon: "error",
        title: "Unable to sign in",
        text:
          error?.response?.data?.message ||
          "Check your email and password, then try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const googleLogin = async () => {
    setIsSubmitting(true);
    try {
      const credential = await google();
      if (!(await checkAccountIsActive(credential.user.email))) return;
      setUser(credential.user);
      await Swal.fire({
        icon: "success",
        title: "Welcome to WorkTrackPro",
        timer: 1400,
        showConfirmButton: false,
      });
      router.push("/");
    } catch (error) {
      console.error("Unable to sign in with Google:", error);
      await Swal.fire({
        icon: "error",
        title: "Google sign-in failed",
        text: "Please try again or use your email and password.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-76px)] w-11/12 max-w-6xl items-center py-10 sm:py-14">
      <div className="grid w-full overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white shadow-2xl shadow-stone-900/[0.07] lg:min-h-[610px] lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden bg-gradient-to-br from-[#2c211c] via-[#563b30] to-[#795548] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="pointer-events-none absolute -right-28 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-[#d8ac8e]/10 blur-3xl" />
          <Link href="/" className="relative inline-flex w-fit items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#f0d9c9]">
              <BriefcaseBusiness size={21} aria-hidden="true" />
            </span>
            <span className="text-lg font-bold tracking-tight">
              WorkTrack<span className="text-[#e2bda2]">Pro.</span>
            </span>
          </Link>

          <div className="relative py-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-2 text-xs font-semibold text-[#f0d9c9]">
              <UsersRound size={15} aria-hidden="true" />
              Your team, in sync
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
              Good work
              <span className="block text-[#e2bda2]">starts together.</span>
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
              Your people, tasks, and progress—all in one thoughtful
              workspace.
            </p>
            <div className="mt-8 flex flex-col gap-3 text-sm text-white/80">
              {[
                "A clear view of your workday",
                "Tools that keep teams connected",
                "Progress you can feel good about",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[#e2bda2]">
                    <Check size={13} aria-hidden="true" />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <p className="relative text-xs text-white/45">
            Make work flow beautifully.
          </p>
        </aside>

        <section className="flex items-center justify-center px-6 py-9 sm:px-10 sm:py-12 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#795548] lg:hidden"
            >
              <BriefcaseBusiness size={19} aria-hidden="true" />
              WorkTrackPro.
            </Link>
            <p className="text-sm font-semibold text-[#9a684d]">
              Welcome back
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Sign in to your account
            </h2>
            <p className="mt-3 text-sm leading-6 text-stone-500">
              Pick up where you left off. Your workspace is ready.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-semibold text-stone-700"
                >
                  Email address
                </label>
                <span className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50/60 px-4 transition focus-within:border-[#a67c66] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#795548]/10">
                  <Mail size={18} className="shrink-0 text-stone-400" aria-hidden="true" />
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    className="min-w-0 flex-1 border-0 bg-transparent py-3.5 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:outline-none focus:ring-0"
                    required
                  />
                </span>
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="mb-2 block text-sm font-semibold text-stone-700"
                >
                  Password
                </label>
                <span className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50/60 px-4 transition focus-within:border-[#a67c66] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#795548]/10">
                  <LockKeyhole size={18} className="shrink-0 text-stone-400" aria-hidden="true" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="login-password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="min-w-0 flex-1 border-0 bg-transparent py-3.5 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:outline-none focus:ring-0"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="shrink-0 text-stone-400 transition hover:text-stone-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#795548] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#795548]/15 transition hover:-translate-y-0.5 hover:bg-[#674638] disabled:cursor-wait disabled:opacity-70"
              >
                {isSubmitting ? "Signing you in..." : "Sign in"}
                {!isSubmitting && <ArrowRight size={17} aria-hidden="true" />}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-stone-400">
              <span className="h-px flex-1 bg-stone-200" />
              or continue with
              <span className="h-px flex-1 bg-stone-200" />
            </div>

            <button
              type="button"
              onClick={googleLogin}
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-stone-200 bg-white px-5 py-3.5 text-sm font-semibold text-stone-700 transition hover:border-stone-300 hover:bg-stone-50 disabled:cursor-wait disabled:opacity-60"
            >
              <FaGoogle aria-hidden="true" className="text-[#4285f4]" />
              Continue with Google
            </button>

            <p className="mt-7 text-center text-sm text-stone-500">
              New to WorkTrackPro?{" "}
              <Link
                href="/registration"
                className="font-bold text-[#795548] underline-offset-4 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
