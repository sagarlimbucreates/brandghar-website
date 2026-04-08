import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { requireUser } from "../lib/rbac";
import { getMenuTreeForUser, type MenuNode } from "../lib/menus";
import { logoutAction } from "../login/actions";
import Sidebar, { type SerializedMenuNode } from "./Sidebar";

function serialize(node: MenuNode): SerializedMenuNode {
  return {
    id: node.id,
    key: node.key,
    label: node.label,
    href: node.href,
    iconName: node.iconName,
    children: node.children.map(serialize),
  };
}

export default async function AuthedDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  const menuTree = await getMenuTreeForUser(user.permissions);
  const serialized = menuTree.map(serialize);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:w-[260px] flex-col bg-white border-r border-[#E5E5E5] shadow-[0_0_30px_rgba(0,0,0,0.04)]">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-[#E5E5E5]">
          <Link href="/dashboard" className="inline-block">
            <Image
              src="/medias/logo-cropped.png"
              alt="Brandghar"
              width={140}
              height={44}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Nav */}
        <Sidebar menus={serialized} />

        {/* User + Logout */}
        <div className="border-t border-[#E5E5E5] p-4">
          <Link
            href="/dashboard/account"
            className="flex items-center gap-3 mb-3 -mx-2 px-2 py-2 rounded-[4px] hover:bg-[#F7F7F7] transition-colors group"
          >
            <div className="w-9 h-9 bg-[#E02020]/10 text-[#E02020] rounded-full flex items-center justify-center font-sans font-bold text-sm shrink-0">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-sans font-semibold text-[#1A1A1A] truncate group-hover:text-[#E02020] transition-colors">
                {user.fullName}
              </p>
              <p className="text-xs text-[#888] font-sans truncate">
                {user.roleName.replace("_", " ")}
              </p>
            </div>
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-sans font-medium text-[#555] hover:text-[#E02020] border border-[#E5E5E5] hover:border-[#E02020]/30 rounded-[4px] transition-colors"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">{children}</main>
    </div>
  );
}
