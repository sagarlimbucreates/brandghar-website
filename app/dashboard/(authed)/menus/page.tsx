import Link from "next/link";
import { Plus, Pencil, CornerDownRight } from "lucide-react";
import { requirePermission, hasPermission } from "../../lib/rbac";
import { getAllMenus, buildMenuTree, type MenuNode } from "../../lib/menus";
import { PageHeader, Card, Button, TableHeader, Th, Td, Badge } from "../../lib/ui";

export default async function MenusPage() {
  const me = await requirePermission("menu.view");
  const all = await getAllMenus();
  const tree = buildMenuTree(all);

  const canCreate = hasPermission(me, "menu.create");
  const canEdit = hasPermission(me, "menu.edit");

  // Flatten tree to array with depth for rendering.
  type Row = { node: MenuNode; depth: number };
  const rows: Row[] = [];
  const walk = (nodes: MenuNode[], depth: number) => {
    for (const n of nodes) {
      rows.push({ node: n, depth });
      if (n.children.length > 0) walk(n.children, depth + 1);
    }
  };
  walk(tree, 0);

  return (
    <div>
      <PageHeader
        eyebrow="Navigation"
        title={`Menus (${all.length})`}
        subtitle="Dashboard sidebar items. Children are shown indented below their parent."
        actions={
          canCreate && (
            <Button href="/dashboard/menus/new">
              <Plus size={14} /> New Menu
            </Button>
          )
        }
      />

      <Card className="overflow-hidden">
        <table className="w-full">
          <TableHeader>
            <Th>Sort</Th>
            <Th>Label</Th>
            <Th>Href</Th>
            <Th>Required Group</Th>
            <Th>Status</Th>
            <Th>&nbsp;</Th>
          </TableHeader>
          <tbody>
            {rows.map(({ node: m, depth }) => (
              <tr key={m.id} className="border-b border-[#E5E5E5] last:border-b-0">
                <Td className="font-mono text-[#888]">{m.sortOrder}</Td>
                <Td className="font-medium text-[#1A1A1A]">
                  <div
                    className="flex items-center gap-2"
                    style={{ paddingLeft: `${depth * 20}px` }}
                  >
                    {depth > 0 && (
                      <CornerDownRight size={12} className="text-[#888] shrink-0" />
                    )}
                    <m.icon size={14} className="text-[#E02020]" />
                    {m.label}
                  </div>
                  <div
                    className="text-xs text-[#888] font-mono mt-0.5"
                    style={{ paddingLeft: `${depth * 20 + (depth > 0 ? 18 : 0)}px` }}
                  >
                    {m.key}
                  </div>
                </Td>
                <Td className="font-mono text-xs">
                  {m.href === "#" ? <span className="text-[#888]">—</span> : m.href}
                </Td>
                <Td>
                  {m.requiredGroup ? (
                    <Badge>{m.requiredGroup}</Badge>
                  ) : (
                    <span className="text-xs text-[#888] italic">any authed</span>
                  )}
                </Td>
                <Td>
                  {m.isActive ? (
                    <Badge tone="success">Active</Badge>
                  ) : (
                    <Badge tone="muted">Hidden</Badge>
                  )}
                </Td>
                <Td className="text-right">
                  {canEdit && (
                    <Link
                      href={`/dashboard/menus/${m.id}`}
                      className="inline-flex items-center gap-1 text-xs text-[#E02020] hover:text-[#FF3333] font-sans font-semibold"
                    >
                      <Pencil size={12} /> Edit
                    </Link>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
