import { SidebarNav } from "@/components/nav/sidebar-nav"; // Assurez-vous que ce chemin est correct
 import { Separator } from "@/components/ui/separator";
 import type { SidebarNavItem } from "@/types";
 
 const sidebarNavItems: SidebarNavItem[] = [
   {
     title: "Compte",
     href: "/dashboard/settings/account",
     icon: "user",
   },
   {
     title: "Mot de passe",
     href: "/dashboard/settings/password",
     icon: "lock",
   },
 ];
 
 interface SettingsLayoutProps {
   children: React.ReactNode;
 }
 
 export default function SettingsLayout({ children }: SettingsLayoutProps) {
   return ( // Ce layout s'affichera maintenant à l'intérieur du DashboardLayout
     <div className=" space-y-6">
       <div className="space-y-0.5">
         <h2 className="text-2xl font-bold tracking-tight">Paramètres</h2>
         <p className="text-muted-foreground">
           Gérez les paramètres de votre compte.
         </p>
       </div>
       <Separator className="my-6" />
       <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
         <aside className="-mx-4 lg:w-1/5">
           <SidebarNav items={sidebarNavItems} isCollapsed={false} />
         </aside>
         <div className="flex-1 lg:max-w-2xl">{children}</div>
       </div>
     </div>
   );
 }