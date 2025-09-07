"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  LifeBuoy,
  User,
  Lock,
  Package,
  LayoutGrid,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { SidebarNavItem } from "@/types";

const Icons = {
  "layout-dashboard": LayoutDashboard,
  users: Users,
  settings: Settings,
  "life-buoy": LifeBuoy,
  user: User,
  lock: Lock,
  package: Package,
  "layout-grid": LayoutGrid,
};

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarNavItem[];
  isCollapsed: boolean;
}

export function SidebarNav({
  className,
  items,
  isCollapsed,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <nav
        className={cn(
          "flex flex-col gap-1 px-2",
          isCollapsed ? "items-center" : "items-stretch",
          className
        )}
        {...props}
      >
        {items.map((item) => {
          const Icon = Icons[item.icon];
          const linkContent = (
            <>
              <Icon className={cn("h-5 w-5", !isCollapsed && "mr-2")} />
              <span className={cn(isCollapsed && "sr-only")}>{item.title}</span>
            </>
          );

          const linkElement = (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({
                  variant: pathname === item.href ? "default" : "ghost",
                  size: isCollapsed ? "icon" : "default",
                }),
                "justify-start"
              )}
            >
              {linkContent}
            </Link>
          );

          return isCollapsed ? (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>{linkElement}</TooltipTrigger>
              <TooltipContent side="right">{item.title}</TooltipContent>
            </Tooltip>
          ) : (
            linkElement
          );
        })}
      </nav>
    </TooltipProvider>
  );
}