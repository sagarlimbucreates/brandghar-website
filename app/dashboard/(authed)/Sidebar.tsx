"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { resolveIcon } from "../lib/icons";

// Serializable subset of MenuNode that can cross the server/client boundary.
export type SerializedMenuNode = {
  id: string;
  key: string;
  label: string;
  href: string;
  iconName: string;
  children: SerializedMenuNode[];
};

export default function Sidebar({ menus }: { menus: SerializedMenuNode[] }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "#") return false;
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const hasActiveDescendant = (node: SerializedMenuNode): boolean => {
    if (isActive(node.href)) return true;
    return node.children.some(hasActiveDescendant);
  };

  return (
    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
      {menus.map((node) => (
        <MenuEntry
          key={node.id}
          node={node}
          isActive={isActive}
          initiallyOpen={hasActiveDescendant(node)}
        />
      ))}
    </nav>
  );
}

function MenuEntry({
  node,
  isActive,
  initiallyOpen,
}: {
  node: SerializedMenuNode;
  isActive: (href: string) => boolean;
  initiallyOpen: boolean;
}) {
  const Icon = resolveIcon(node.iconName);
  const hasChildren = node.children.length > 0;
  const [open, setOpen] = useState(initiallyOpen);

  const linkClasses = (active: boolean) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-sm font-sans transition-colors ${
      active
        ? "bg-[#FFF0F0] text-[#E02020] font-semibold"
        : "text-[#555] hover:bg-[#F7F7F7] hover:text-[#1A1A1A]"
    }`;

  if (!hasChildren) {
    return (
      <Link href={node.href} className={linkClasses(isActive(node.href))}>
        <Icon size={16} className="shrink-0" />
        {node.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-sm font-sans transition-colors ${
          initiallyOpen
            ? "text-[#1A1A1A] font-semibold"
            : "text-[#555] hover:bg-[#F7F7F7] hover:text-[#1A1A1A]"
        }`}
      >
        <Icon size={16} className="shrink-0" />
        <span className="flex-1 text-left">{node.label}</span>
        <ChevronDown
          size={14}
          className={`shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="mt-1 ml-4 pl-3 border-l border-[#E5E5E5] space-y-1">
          {node.children.map((child) => (
            <MenuEntry
              key={child.id}
              node={child}
              isActive={isActive}
              initiallyOpen={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
