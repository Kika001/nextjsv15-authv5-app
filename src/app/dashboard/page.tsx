import { auth } from "@/auth";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { CustomerDashboard } from "@/components/dashboard/customer-dashboard";

export default async function DashboardPage() {
  const session = await auth();
  const userRole = session?.user?.role;

  if (userRole === "admin") {
    return <AdminDashboard />;
  }

  return <CustomerDashboard user={session?.user} />;
}