import { auth } from "@/auth";
import { ProfileForm } from "@/components/forms/profile-form";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

export default async function SettingsAccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Compte</h3>
        <p className="text-sm text-muted-foreground">
          Mettez à jour les informations de votre compte.
        </p>
      </div>
      <Separator />
      <ProfileForm user={session.user} />
    </div>
  );
}
