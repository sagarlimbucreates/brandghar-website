"use client";

import { useActionState } from "react";
import { setRolePermissionsAction } from "../actions";
import { Button, FormAlert } from "../../../lib/ui";

type Perm = {
  id: string;
  key: string;
  group: string;
  description: string | null;
};

export default function RolePermissionsForm({
  roleId,
  permsByGroup,
  assignedIds,
}: {
  roleId: string;
  permsByGroup: Record<string, Perm[]>;
  assignedIds: string[];
}) {
  const [state, action, pending] = useActionState(setRolePermissionsAction, {});
  const assignedSet = new Set(assignedIds);

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} success={state.success} />
      <input type="hidden" name="roleId" value={roleId} />

      <div className="space-y-6">
        {Object.entries(permsByGroup).map(([group, perms]) => (
          <div key={group}>
            <h3 className="text-xs font-sans font-semibold uppercase tracking-[0.1em] text-[#555] mb-3">
              {group}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {perms.map((p) => (
                <label
                  key={p.id}
                  className="flex items-start gap-2.5 px-3 py-2 bg-[#F7F7F7] rounded-[4px] cursor-pointer hover:bg-[#FFF0F0] transition-colors"
                >
                  <input
                    type="checkbox"
                    name="permissionIds"
                    value={p.id}
                    defaultChecked={assignedSet.has(p.id)}
                    className="w-4 h-4 mt-0.5 accent-[#E02020] cursor-pointer shrink-0"
                  />
                  <div className="min-w-0">
                    <code className="text-xs font-mono text-[#1A1A1A] block truncate">
                      {p.key}
                    </code>
                    {p.description && (
                      <p className="text-[11px] text-[#888] font-sans mt-0.5">
                        {p.description}
                      </p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save Permissions"}
      </Button>
    </form>
  );
}
