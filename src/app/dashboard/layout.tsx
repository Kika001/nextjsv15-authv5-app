"use client";

import * as React from "react";
import { DashboardNav } from "@/components/nav/dashboard-nav";
import { SidebarNav } from "@/components/nav/sidebar-nav";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Settings,
  LifeBuoy,
  ChevronLeft,
  Mountain,
  Menu,
  Package,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { IconName } from "@/types";

const getIconName = (iconComponent: React.ElementType): IconName => {
  if (iconComponent === LayoutDashboard) return "layout-dashboard";
  if (iconComponent === Users) return "users";
  if (iconComponent === Settings) return "settings";
  if (iconComponent === LifeBuoy) return "life-buoy";
  if (iconComponent === Package) return "package";
  if (iconComponent === LayoutGrid) return "layout-grid";
  return "layout-dashboard"; // Fallback
};

const adminNavItems = [
  { title: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { title: "Gestion utilisateurs", href: "/dashboard/users", icon: Users },
  { title: "Produits", href: "/dashboard/products", icon: Package },
  { title: "Catégories", href: "/dashboard/categories", icon: LayoutGrid },
  { title: "Paramètres", href: "/dashboard/settings", icon: Settings },
  { title: "Support", href: "/dashboard/support", icon: LifeBuoy },
];

const customerNavItems = [
  { title: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { title: "Produits", href: "/dashboard/products", icon: Package },
  { title: "Catégories", href: "/dashboard/categories", icon: LayoutGrid },
  { title: "Paramètres", href: "/dashboard/settings", icon: Settings },
  { title: "Support", href: "/dashboard/support", icon: LifeBuoy },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession({ required: true });
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const userRole = session?.user?.role;

  const baseNavItems = userRole === "admin" ? adminNavItems : customerNavItems;

  const finalNavItems = baseNavItems
    .map((item) => ({
      title: item.title,
      href: item.href,
      icon: getIconName(item.icon) as IconName,
    }));

  return (
    <> 
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className={cn("fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background transition-all duration-300 ease-in-out data-[collapsed=true]:w-16 md:flex", isCollapsed && "w-16")} data-collapsed={isCollapsed}>
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/" className={cn("flex items-center gap-2 font-semibold", isCollapsed && "hidden")}>
            <Mountain className="h-6 w-6" />
            <span>Mon App</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
            <ChevronLeft className={cn("h-5 w-5 transition-transform", isCollapsed && "rotate-180")} />
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <SidebarNav items={finalNavItems} isCollapsed={isCollapsed} />
        </div>
      </aside>
      <div className={cn("flex flex-1 flex-col transition-all duration-300 ease-in-out md:pl-64", isCollapsed && "md:pl-16")}>
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4 pt-10">
              <SidebarNav items={finalNavItems} isCollapsed={false} />
            </SheetContent>
          </Sheet>
          <DashboardNav />
        </header>
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
    </>
  );
}