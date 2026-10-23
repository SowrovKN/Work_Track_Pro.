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
  Upload,
  UserRound,
  UsersRound,
} from "lucide-react";
import { AuthContext } from "../../components/firebase/AuthProvider";
import { imgURL } from "../../utils/utils";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const fieldClass =
  "w-full rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#a67c66] focus:bg-white focus:ring-4 focus:ring-[#795548]/10";

const Registration = () => {
  const { creatUser, profile, setUser, google } = useContext(AuthContext);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoName, setPhotoName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const form = event.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value;
    const password = form.password.value;
    const account = form.account.value;
    const salary = form.salary.value;
    const role = form.role.value;
    const designation = form.designation.value;
    const photo = form.photo.files[0];

    if (password.length < 6 || !/[A-Z]/.test(password) || !/[\W]/.test(password)) {
      await Swal.fire({
        icon: "error",
        title: "Choose a stronger password",
        text: "Use at least 6 characters, including an uppercase letter and a symbol.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const photoUrl = await imgURL(photo);
      const credential = await creatUser(email, password);
      await profile(name, photoUrl);
      const userData = {
        name,
        email,
        password,
        account,
        salary,
        verified: false,
        role,
        designation,
        photoUrl,
        fired: false,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${encodeURIComponent(email)}`,
        userData
      );
      setUser({
        ...credential.user,
        displayName: name,
        photoURL: photoUrl,
      });
      await Swal.fire({
        icon: "success",
        title: "Your workspace is ready",
        text: "Your WorkTrackPro account has been created.",
        timer: 1600,
        showConfirmButton: false,
      });
      router.push("/");
    } catch (error) {
      console.error("Unable to create account:", error);
      await Swal.fire({
        icon: "error",
        title: "Unable to create your account",
        text:
          error?.response?.data?.message ||
          "Please check your details and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const googleRegister = async () => {
    setIsSubmitting(true);
    try {
      const credential = await google();
      const userData = {
        email: credential.user.email,
        name: credential.user.displayName,
        account: 8786876677,
        salary: 20000,
        designation: "web developer",
        verified: false,
        role: "employee",
        fired: false,
        photoURL: credential.user.photoURL,
      };
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${encodeURIComponent(credential.user.email)}`,
        userData
      );
      setUser(credential.user);
      await Swal.fire({
        icon: "success",
        title: "Welcome to WorkTrackPro",
        timer: 1400,
        showConfirmButton: false,
      });
      router.push("/");
    } catch (error) {
      console.error("Unable to register with Google:", error);
      await Swal.fire({
        icon: "error",
        title: "Google sign-up failed",
        text: "Please try again or create an account with your email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-76px)] w-11/12 max-w-7xl items-center py-8 sm:py-12">
      <div className="grid w-full overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white shadow-2xl shadow-stone-900/[0.07] xl:grid-cols-[0.72fr_1.28fr]">
        <aside className="relative hidden overflow-hidden bg-gradient-to-br from-[#2c211c] via-[#563b30] to-[#795548] p-10 text-white xl:flex xl:flex-col xl:justify-between">
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
              Make room for better work
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight">
              Start your next
              <span className="block text-[#e2bda2]">chapter here.</span>
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
              Create your account and bring your workday into one clear,
              connected workspace.
            </p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.07] p-5">
              <p className="text-sm font-semibold text-white">
                Built around your team
              </p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                People, progress, and everyday tasks—together at last.
              </p>
              <div className="mt-4 flex items-center gap-2">
                {[0, 1, 2, 3].map((item) => (
                  <span
                    key={item}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#563b30] bg-[#d8ac8e] text-[#563b30]"
                  >
                    {item === 3 ? (
                      <span className="text-xs font-bold">+</span>
                    ) : (
                      <UserRound size={14} aria-hidden="true" />
                    )}
                  </span>
                ))}
                <span className="ml-1 text-xs text-white/60">
                  One team. One workspace.
                </span>
              </div>
            </div>
          </div>

          <p className="relative text-xs text-white/45">
            Make work flow beautifully.
          </p>
        </aside>

        <section className="px-5 py-8 sm:px-9 sm:py-10 lg:px-12 xl:px-14">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/"
              className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#795548] xl:hidden"
            >
              <BriefcaseBusiness size={19} aria-hidden="true" />
              WorkTrackPro.
            </Link>
            <p className="text-sm font-semibold text-[#9a684d]">
              Let&apos;s get you set up
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Create your account
            </h2>
            <p className="mt-3 text-sm leading-6 text-stone-500">
              A few details to get your workspace ready.
            </p>

            <form onSubmit={handleSubmit} className="mt-7">
              <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="register-name"
                    className="mb-2 block text-sm font-semibold text-stone-700"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    id="register-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    className={fieldClass}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="register-email"
                    className="mb-2 block text-sm font-semibold text-stone-700"
                  >
                    Email address
                  </label>
                  <span className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50/60 px-3.5 transition focus-within:border-[#a67c66] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#795548]/10">
                    <Mail size={17} className="shrink-0 text-stone-400" aria-hidden="true" />
                    <input
                      type="email"
                      id="register-email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:outline-none focus:ring-0"
                      required
                    />
                  </span>
                </div>
                <div>
                  <label
                    htmlFor="register-password"
                    className="mb-2 block text-sm font-semibold text-stone-700"
                  >
                    Password
                  </label>
                  <span className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50/60 px-3.5 transition focus-within:border-[#a67c66] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#795548]/10">
                    <LockKeyhole size={17} className="shrink-0 text-stone-400" aria-hidden="true" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="register-password"
                      name="password"
                      autoComplete="new-password"
                      placeholder="Create a strong password"
                      className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:outline-none focus:ring-0"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="shrink-0 text-stone-400 transition hover:text-stone-700"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </span>
                  <p className="mt-1.5 text-xs text-stone-400">
                    6+ characters, an uppercase letter, and a symbol.
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="register-account"
                    className="mb-2 block text-sm font-semibold text-stone-700"
                  >
                    Bank account number
                  </label>
                  <input
                    type="number"
                    id="register-account"
                    name="account"
                    placeholder="Enter account number"
                    className={fieldClass}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="register-salary"
                    className="mb-2 block text-sm font-semibold text-stone-700"
                  >
                    Monthly salary
                  </label>
                  <input
                    type="number"
                    id="register-salary"
                    name="salary"
                    min="0"
                    placeholder="Enter your salary"
                    className={fieldClass}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="register-designation"
                    className="mb-2 block text-sm font-semibold text-stone-700"
                  >
                    Designation
                  </label>
                  <select
                    name="designation"
                    id="register-designation"
                    className={`${fieldClass} appearance-none`}
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select your designation
                    </option>
                    <option value="Sales Assistant">Sales Assistant</option>
                    <option value="Social Media executive">
                      Social Media executive
                    </option>
                    <option value="Digital Marketer">Digital Marketer</option>
                    <option value="Web Developer">Web Developer</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="register-role"
                    className="mb-2 block text-sm font-semibold text-stone-700"
                  >
                    Team role
                  </label>
                  <select
                    name="role"
                    id="register-role"
                    className={`${fieldClass} appearance-none`}
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    <option value="employee">Employee</option>
                    <option value="hr">HR</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="register-photo"
                    className="mb-2 block text-sm font-semibold text-stone-700"
                  >
                    Profile photo
                  </label>
                  <label
                    htmlFor="register-photo"
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-stone-300 bg-stone-50/60 px-4 py-3 transition hover:border-[#a67c66] hover:bg-[#faf7f4]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0e5dd] text-[#795548]">
                      <Upload size={18} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-stone-700">
                        {photoName || "Choose an image to upload"}
                      </span>
                      <span className="mt-0.5 block text-xs text-stone-400">
                        JPG, PNG, or WebP
                      </span>
                    </span>
                    <input
                      type="file"
                      id="register-photo"
                      name="photo"
                      accept="image/*"
                      required
                      className="sr-only"
                      onChange={(event) =>
                        setPhotoName(event.target.files?.[0]?.name || "")
                      }
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#795548] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#795548]/15 transition hover:-translate-y-0.5 hover:bg-[#674638] disabled:cursor-wait disabled:opacity-70"
              >
                {isSubmitting ? "Creating your account..." : "Create account"}
                {!isSubmitting && <ArrowRight size={17} aria-hidden="true" />}
              </button>
            </form>

            <div className="my-5 flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-stone-400">
              <span className="h-px flex-1 bg-stone-200" />
              or sign up with
              <span className="h-px flex-1 bg-stone-200" />
            </div>

            <button
              type="button"
              onClick={googleRegister}
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-300 hover:bg-stone-50 disabled:cursor-wait disabled:opacity-60"
            >
              <FaGoogle aria-hidden="true" className="text-[#4285f4]" />
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-stone-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-[#795548] underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-stone-400">
              <Check size={13} aria-hidden="true" />
              Your details help personalize your workspace.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Registration;
