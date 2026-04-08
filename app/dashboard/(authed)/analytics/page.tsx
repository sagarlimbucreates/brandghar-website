import { requirePermission } from "../../lib/rbac";

export default async function AnalyticsPage() {
  await requirePermission("analytics.view");

  return (
    <div>
      <div className="mb-8">
        <span className="block text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-[#E02020] mb-2">
          Insights
        </span>
        <h1 className="text-2xl md:text-3xl font-sans font-bold text-[#1A1A1A] leading-tight tracking-tight">
          Analytics
        </h1>
        <p className="text-sm text-[#888] font-sans mt-2">
          Traffic, conversions, and campaign performance.
        </p>
      </div>

      <div className="bg-white border border-[#E5E5E5] rounded-[8px] p-8">
        <p className="text-sm text-[#888] font-sans">
          (Placeholder — charts and reports would go here.)
        </p>
      </div>
    </div>
  );
}
