import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  backHref,
  actions,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  backHref?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-xs text-[#888] hover:text-[#1A1A1A] font-sans mb-3 transition-colors"
          >
            <ArrowLeft size={12} /> Back
          </Link>
        )}
        {eyebrow && (
          <span className="block text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-[#E02020] mb-2">
            {eyebrow}
          </span>
        )}
        <h1 className="text-2xl md:text-3xl font-sans font-bold text-[#1A1A1A] leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-[#888] font-sans mt-2">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border border-[#E5E5E5] rounded-[8px] ${className}`}
    >
      {children}
    </div>
  );
}

export function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  disabled,
  name,
  value,
  formAction,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md";
  disabled?: boolean;
  name?: string;
  value?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formAction?: any;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-1.5 font-sans font-semibold rounded-[4px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
  };
  const variants = {
    primary:
      "bg-[#E02020] text-white hover:bg-[#FF3333] hover:shadow-[0_6px_20px_rgba(224,32,32,0.2)]",
    secondary:
      "bg-white border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#E02020]/30 hover:text-[#E02020]",
    danger:
      "bg-white border border-[#E02020]/30 text-[#E02020] hover:bg-[#FFF0F0]",
    ghost:
      "text-[#555] hover:text-[#E02020] hover:bg-[#F7F7F7]",
  };

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      name={name}
      value={value}
      formAction={formAction}
      className={cls}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
  helpText,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-sans font-semibold text-[#555] uppercase tracking-[0.1em] mb-2"
      >
        {label}
        {required && <span className="text-[#E02020] ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] text-[#1A1A1A] text-sm font-sans placeholder:text-[#888] outline-none focus:border-[#E02020]/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(224,32,32,0.08)] transition-all duration-200"
      />
      {helpText && (
        <p className="text-xs text-[#888] font-sans mt-1.5">{helpText}</p>
      )}
    </div>
  );
}

export function Select({
  label,
  name,
  defaultValue,
  required,
  options,
  helpText,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
  helpText?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-sans font-semibold text-[#555] uppercase tracking-[0.1em] mb-2"
      >
        {label}
        {required && <span className="text-[#E02020] ml-0.5">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full px-4 py-2.5 bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] text-[#1A1A1A] text-sm font-sans outline-none focus:border-[#E02020]/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(224,32,32,0.08)] transition-all duration-200"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {helpText && (
        <p className="text-xs text-[#888] font-sans mt-1.5">{helpText}</p>
      )}
    </div>
  );
}

export function Checkbox({
  label,
  name,
  defaultChecked,
  value = "on",
  helpText,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
  value?: string;
  helpText?: string;
}) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer select-none">
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="w-4 h-4 mt-0.5 bg-white border border-[#E5E5E5] rounded-[2px] accent-[#E02020] cursor-pointer shrink-0"
      />
      <div>
        <span className="text-sm text-[#1A1A1A] font-sans">{label}</span>
        {helpText && (
          <p className="text-xs text-[#888] font-sans mt-0.5">{helpText}</p>
        )}
      </div>
    </label>
  );
}

export function TableHeader({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-[#F7F7F7] border-b border-[#E5E5E5]">
      <tr>{children}</tr>
    </thead>
  );
}

export function Th({ children }: { children: ReactNode }) {
  return (
    <th className="text-left text-xs font-sans font-semibold uppercase tracking-[0.1em] text-[#555] px-6 py-3">
      {children}
    </th>
  );
}

export function Td({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-6 py-4 text-sm font-sans text-[#555] ${className}`}>
      {children}
    </td>
  );
}

export function Badge({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: "accent" | "success" | "muted";
}) {
  const tones = {
    accent: "bg-[#E02020]/10 text-[#E02020]",
    success: "bg-[#0A7A0A]/10 text-[#0A7A0A]",
    muted: "bg-[#E5E5E5] text-[#555]",
  };
  return (
    <span
      className={`inline-block ${tones[tone]} px-2.5 py-1 rounded-[4px] text-xs font-semibold font-sans`}
    >
      {children}
    </span>
  );
}

export function FormAlert({
  error,
  success,
}: {
  error?: string;
  success?: string;
}) {
  if (!error && !success) return null;
  if (error) {
    return (
      <div className="mb-5 bg-[#FFF0F0] border border-[#E02020]/20 rounded-[4px] p-3.5">
        <p className="text-sm text-[#CC0000] font-sans">{error}</p>
      </div>
    );
  }
  return (
    <div className="mb-5 bg-[#0A7A0A]/5 border border-[#0A7A0A]/20 rounded-[4px] p-3.5">
      <p className="text-sm text-[#0A7A0A] font-sans">{success}</p>
    </div>
  );
}
