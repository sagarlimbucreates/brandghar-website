import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { requireUser } from "../lib/rbac";
import { getAccessibleLeafMenus } from "../lib/menus";

type SearchParams = Promise<{ denied?: string }>;

// Fixed order of cards shown on the dashboard home.
// Keys must match `menus.key` rows in the DB.
const QUICK_LINK_KEYS = [
  "users",
  "team",
  "contact",
  "blog_posts",
  "leads",
  "analytics",
] as const;

export default async function DashboardHome({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { denied } = await searchParams;
  const user = await requireUser();

  const allowedLeaves = await getAccessibleLeafMenus(user.permissions);
  const allowedByKey = new Map(allowedLeaves.map((m) => [m.key, m]));

  // Preserve the order defined in QUICK_LINK_KEYS; drop any the user can't access.
  const quickLinks = QUICK_LINK_KEYS.map((key) => allowedByKey.get(key)).filter(
    (m): m is NonNullable<typeof m> => m !== undefined
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="block text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-[#E02020] mb-2">
          Dashboard
        </span>
        <h1 className="text-2xl md:text-3xl font-sans font-bold text-[#1A1A1A] leading-tight tracking-tight">
          Welcome back, {user.fullName.split(" ")[0]}.
        </h1>
        <p className="text-sm text-[#888] font-sans mt-2">
          Signed in as <span className="font-medium text-[#555]">{user.email}</span>
          {" · "}
          Role: <span className="font-medium text-[#555]">{user.roleName.replace("_", " ")}</span>
        </p>
      </div>

      {/* Denied banner */}
      {denied && (
        <div className="mb-8 flex items-start gap-3 bg-[#FFF0F0] border border-[#E02020]/20 rounded-[4px] p-4">
          <ShieldAlert size={18} className="text-[#E02020] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-sans font-semibold text-[#CC0000]">
              Access denied
            </p>
            <p className="text-xs font-sans text-[#888] mt-0.5">
              Your role doesn&apos;t have the{" "}
              <code className="font-mono text-[#CC0000]">{denied}</code> permission.
              Contact a super admin if you need access.
            </p>
          </div>
        </div>
      )}

      {/* Quick links */}
      <div>
        <h2 className="text-xs font-sans font-semibold text-[#555] uppercase tracking-[0.1em] mb-4">
          Quick Links
        </h2>
        {quickLinks.length === 0 ? (
          <p className="text-sm text-[#888] font-sans">
            None of the shortcut links are available to your role yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {quickLinks.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group bg-white border border-[#E5E5E5] rounded-[8px] p-6 hover:border-[#E02020]/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-200"
              >
                <div className="w-11 h-11 bg-[#E02020]/10 rounded-[4px] flex items-center justify-center mb-4">
                  <item.icon size={20} className="text-[#E02020]" />
                </div>
                <h3 className="font-sans font-bold text-[#1A1A1A] text-base mb-1">
                  {item.label}
                </h3>
                <div className="inline-flex items-center gap-1.5 text-xs text-[#E02020] font-sans font-semibold group-hover:gap-2.5 transition-all duration-200">
                  Open
                  <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
