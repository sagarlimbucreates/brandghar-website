import { LogOut } from "lucide-react";
import { requireUser } from "../../lib/rbac";
import { logoutAction } from "../../login/actions";
import { PageHeader, Card, Button } from "../../lib/ui";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";

export default async function AccountPage() {
  const me = await requireUser();

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader
        eyebrow="Account Settings"
        title="Your Account"
        subtitle={`Signed in as ${me.email}`}
      />

      {/* Profile */}
      <Card className="p-8">
        <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-1">
          Profile
        </h2>
        <p className="text-xs text-[#888] font-sans mb-5">
          Update your display name. Your email and role are managed by an admin.
        </p>
        <ProfileForm
          user={{
            fullName: me.fullName,
            email: me.email,
            roleName: me.roleName,
          }}
        />
      </Card>

      {/* Password */}
      <Card className="p-8">
        <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-1">
          Change Password
        </h2>
        <p className="text-xs text-[#888] font-sans mb-5">
          You&apos;ll need to provide your current password to set a new one.
        </p>
        <PasswordForm />
      </Card>

      {/* Sign out */}
      <Card className="p-8 border-[#E02020]/30">
        <h2 className="text-sm font-sans font-bold text-[#CC0000] mb-1">
          Sign Out
        </h2>
        <p className="text-xs text-[#888] font-sans mb-5">
          End your current dashboard session. You&apos;ll need to sign in again
          to access the dashboard.
        </p>
        <form action={logoutAction}>
          <Button type="submit" variant="danger">
            <LogOut size={14} /> Sign Out
          </Button>
        </form>
      </Card>
    </div>
  );
}
