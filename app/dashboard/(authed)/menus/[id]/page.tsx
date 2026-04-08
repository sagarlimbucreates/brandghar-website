import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db, menus, permissions } from "@/db";
import { requirePermission, hasPermission } from "../../../lib/rbac";
import { getAllMenus } from "../../../lib/menus";
import { PageHeader, Card } from "../../../lib/ui";
import { ICON_NAMES } from "../../../lib/icons";
import EditMenuForm from "./EditMenuForm";
import DeleteMenuForm from "./DeleteMenuForm";

type Params = Promise<{ id: string }>;

export default async function EditMenuPage({ params }: { params: Params }) {
  const { id } = await params;
  const me = await requirePermission("menu.edit");

  const row = await db.select().from(menus).where(eq(menus.id, id)).limit(1);
  const menu = row[0];
  if (!menu) notFound();

  const permRows = await db
    .select({ group: permissions.group })
    .from(permissions)
    .orderBy(asc(permissions.group));
  const groups = Array.from(new Set(permRows.map((p) => p.group)));

  // Possible parents = top-level menus other than self.
  const allMenus = await getAllMenus();
  const parentOptions = allMenus
    .filter((m) => m.parentId === null && m.id !== menu.id)
    .map((m) => ({ value: m.id, label: m.label }));

  const canDelete = hasPermission(me, "menu.delete");

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Navigation"
        title="Edit Menu"
        subtitle={menu.label}
        backHref="/dashboard/menus"
      />

      <Card className="p-8 mb-6">
        <EditMenuForm
          menu={{
            id: menu.id,
            key: menu.key,
            label: menu.label,
            href: menu.href,
            icon: menu.icon,
            requiredGroup: menu.requiredGroup ?? "",
            parentId: menu.parentId ?? "",
            sortOrder: menu.sortOrder,
            isActive: menu.isActive,
          }}
          iconOptions={[...ICON_NAMES]}
          groupOptions={groups}
          parentOptions={parentOptions}
        />
      </Card>

      {canDelete && (
        <Card className="p-8 border-[#E02020]/30">
          <h2 className="text-sm font-sans font-bold text-[#CC0000] mb-2">
            Danger Zone
          </h2>
          <p className="text-xs text-[#888] font-sans mb-5">
            Remove this menu item from the sidebar. Any children will become
            orphaned (treated as top-level).
          </p>
          <DeleteMenuForm menuId={menu.id} />
        </Card>
      )}
    </div>
  );
}
