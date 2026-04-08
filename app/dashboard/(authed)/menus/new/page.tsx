import { asc } from "drizzle-orm";
import { db, permissions } from "@/db";
import { requirePermission } from "../../../lib/rbac";
import { getAllMenus } from "../../../lib/menus";
import { PageHeader, Card } from "../../../lib/ui";
import { ICON_NAMES } from "../../../lib/icons";
import NewMenuForm from "./NewMenuForm";

export default async function NewMenuPage() {
  await requirePermission("menu.create");

  const permRows = await db
    .select({ group: permissions.group })
    .from(permissions)
    .orderBy(asc(permissions.group));
  const groups = Array.from(new Set(permRows.map((p) => p.group)));

  // Only top-level menus are valid parents (1 level of nesting).
  const allMenus = await getAllMenus();
  const parentOptions = allMenus
    .filter((m) => m.parentId === null)
    .map((m) => ({ value: m.id, label: m.label }));

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Navigation"
        title="New Menu"
        subtitle="Add a menu item to the dashboard sidebar."
        backHref="/dashboard/menus"
      />
      <Card className="p-8">
        <NewMenuForm
          iconOptions={[...ICON_NAMES]}
          groupOptions={groups}
          parentOptions={parentOptions}
        />
      </Card>
    </div>
  );
}
