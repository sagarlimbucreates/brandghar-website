"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginForm({ next }: { next: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-12 bg-[#F7F7F7]">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#E02020]/8 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E02020]/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-[440px]"
      >
        <div className="bg-white border border-black/5 rounded-[8px] p-8 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.12),0_10px_30px_rgba(0,0,0,0.06)]">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="/medias/logo-cropped.png"
                alt="Brandghar"
                width={180}
                height={64}
                className="h-14 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <span className="block text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-[#E02020] mb-3">
              Dashboard Access
            </span>
            <h1 className="font-sans font-bold text-2xl md:text-3xl text-[#1A1A1A] leading-tight tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-[#888] text-sm font-sans">
              Sign in to continue to your dashboard
            </p>
          </div>

          {/* Error */}
          {state.error && (
            <div className="mb-5 flex items-start gap-2.5 bg-[#FFF0F0] border border-[#E02020]/20 rounded-[4px] p-3.5">
              <AlertCircle size={16} className="text-[#E02020] shrink-0 mt-0.5" />
              <p className="text-sm text-[#CC0000] font-sans">{state.error}</p>
            </div>
          )}

          {/* Form */}
          <form action={formAction} className="space-y-5">
            <input type="hidden" name="next" value={next} />

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-sans font-semibold text-[#555] uppercase tracking-[0.1em] mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888] pointer-events-none"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@thebrandghar.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] text-[#1A1A1A] text-sm font-sans placeholder:text-[#888] outline-none focus:border-[#E02020]/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(224,32,32,0.08)] transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-sans font-semibold text-[#555] uppercase tracking-[0.1em]"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-[#E02020] hover:text-[#FF3333] font-sans font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888] pointer-events-none"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3.5 bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] text-[#1A1A1A] text-sm font-sans placeholder:text-[#888] outline-none focus:border-[#E02020]/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(224,32,32,0.08)] transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#1A1A1A] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-4 h-4 bg-white border border-[#E5E5E5] rounded-[2px] accent-[#E02020] cursor-pointer"
              />
              <span className="text-xs text-[#555] font-sans">
                Remember me for 30 days
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="group w-full bg-[#E02020] text-white font-sans font-semibold py-3.5 rounded-[4px] hover:bg-[#FF3333] hover:shadow-[0_10px_30px_rgba(224,32,32,0.25)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-200 text-sm flex items-center justify-center gap-2 mt-6"
            >
              {pending ? "Signing In…" : "Sign In"}
              {!pending && (
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              )}
            </button>
          </form>

          {/* Divider + footer note */}
          <div className="mt-8 pt-6 border-t border-[#E5E5E5] text-center">
            <p className="text-xs text-[#888] font-sans">
              Brandghar staff only. Unauthorized access is prohibited.
            </p>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-[#888] hover:text-[#1A1A1A] font-sans transition-colors"
          >
            ← Back to website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
