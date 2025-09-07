import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/nav/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export function DashboardNav() {
  return (
    <div className="ml-auto flex items-center space-x-4">
      <ThemeToggle />
      <Button variant="ghost" size="icon" className="rounded-full">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
      </Button>
      <UserNav />
    </div>
  );
}