import { redirect } from "next/navigation";

// Redirige /dashboard/settings vers la première page de la section
export default function SettingsRootPage() {
  redirect("/dashboard/settings/account");
}