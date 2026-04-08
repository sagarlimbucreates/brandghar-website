import "server-only";
import { asc, eq } from "drizzle-orm";
import { db, menus } from "@/db";
import { resolveIcon, type IconName } from "./icons";
import type { LucideIcon } from "lucide-react";

export type ResolvedMenuItem = {
  id: string;
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
  iconName: string;
  requiredGroup: string | null;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type MenuNode = ResolvedMenuItem & {
  children: MenuNode[];
};

export async function getAllMenus(): Promise<ResolvedMenuItem[]> {
  const rows = await db
    .select()
    .from(menus)
    .orderBy(asc(menus.sortOrder));

  return rows.map((m) => ({
    id: m.id,
    key: m.key,
    label: m.label,
    href: m.href,
    icon: resolveIcon(m.icon),
    iconName: m.icon,
    requiredGroup: m.requiredGroup,
    parentId: m.parentId,
    sortOrder: m.sortOrder,
    isActive: m.isActive,
  }));
}

export async function getActiveMenus(): Promise<ResolvedMenuItem[]> {
  const all = await getAllMenus();
  return all.filter((m) => m.isActive);
}

/**
 * Build a nested tree. Children are sorted by sortOrder, parents by sortOrder.
 * Only 1 level of nesting is supported by the sidebar UI, but the builder is generic.
 */
export function buildMenuTree(items: ResolvedMenuItem[]): MenuNode[] {
  const byId = new Map<string, MenuNode>();
  for (const item of items) {
    byId.set(item.id, { ...item, children: [] });
  }
  const roots: MenuNode[] = [];
  for (const node of byId.values()) {
    if (node.parentId && byId.has(node.parentId)) {
      byId.get(node.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }
  const sortNodes = (arr: MenuNode[]) => {
    arr.sort((a, b) => a.sortOrder - b.sortOrder);
    for (const n of arr) sortNodes(n.children);
  };
  sortNodes(roots);
  return roots;
}

/**
 * Check if a single leaf menu is visible to a user's permissions.
 */
function isLeafVisible(item: ResolvedMenuItem, permissions: string[]): boolean {
  if (!item.requiredGroup) return true;
  const prefix = `${item.requiredGroup}.`;
  return permissions.some(
    (p) => p === item.requiredGroup || p.startsWith(prefix)
  );
}

/**
 * Returns the menu tree filtered by the user's permissions.
 *   - Leaf menus are shown if the user passes the permission check.
 *   - Parent menus are shown if any of their descendants are visible.
 */
export async function getMenuTreeForUser(
  userPermissions: string[]
): Promise<MenuNode[]> {
  const active = await getActiveMenus();
  const tree = buildMenuTree(active);

  const filter = (nodes: MenuNode[]): MenuNode[] => {
    const out: MenuNode[] = [];
    for (const node of nodes) {
      const filteredChildren = filter(node.children);
      const isParent = node.children.length > 0;
      if (isParent) {
        if (filteredChildren.length > 0) {
          out.push({ ...node, children: filteredChildren });
        }
      } else {
        if (isLeafVisible(node, userPermissions)) {
          out.push({ ...node, children: [] });
        }
      }
    }
    return out;
  };

  return filter(tree);
}

/**
 * Flat list of leaf menus a user can access. Used for dashboard home cards.
 */
export async function getAccessibleLeafMenus(
  userPermissions: string[]
): Promise<ResolvedMenuItem[]> {
  const tree = await getMenuTreeForUser(userPermissions);
  const out: ResolvedMenuItem[] = [];
  const walk = (nodes: MenuNode[]) => {
    for (const n of nodes) {
      if (n.children.length === 0) out.push(n);
      else walk(n.children);
    }
  };
  walk(tree);
  return out;
}

/**
 * Flat list of all active leaf menus (used to compute the "locked" section
 * on the dashboard home — leaves the user does NOT have access to).
 */
export async function getAllActiveLeafMenus(): Promise<ResolvedMenuItem[]> {
  const active = await getActiveMenus();
  const tree = buildMenuTree(active);
  const out: ResolvedMenuItem[] = [];
  const walk = (nodes: MenuNode[]) => {
    for (const n of nodes) {
      if (n.children.length === 0) out.push(n);
      else walk(n.children);
    }
  };
  walk(tree);
  return out;
}

export async function getMenuById(id: string) {
  const row = await db.select().from(menus).where(eq(menus.id, id)).limit(1);
  return row[0] ?? null;
}

export type { IconName };
