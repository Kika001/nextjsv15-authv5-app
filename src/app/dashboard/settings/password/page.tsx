 import { PasswordForm } from "@/components/forms/password-form";
 import { Separator } from "@/components/ui/separator";
 
 export default function SettingsPasswordPage() {
   return (
     <div className="space-y-6">
       <div>
         <h3 className="text-lg font-medium">Mot de passe</h3>
         <p className="text-sm text-muted-foreground">
           Mettez à jour votre mot de passe.
         </p>
       </div>
       <Separator />
       <PasswordForm />
     </div>
   );
 }