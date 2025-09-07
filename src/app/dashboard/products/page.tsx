import { auth } from "@/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, PlusCircle } from "lucide-react";

export default async function ProductsPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gestion des Produits</CardTitle>
          <CardDescription>
            {isAdmin
              ? "Ajoutez, modifiez ou supprimez des produits de votre catalogue."
              : "Consultez la liste des produits disponibles."}
          </CardDescription>
        </div>
        {isAdmin && (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un produit
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
          <Package className="h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold">
            {isAdmin ? "Aucun produit pour le moment" : "Aucun produit ne vous est assigné"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isAdmin
              ? "Commencez par ajouter votre premier produit."
              : "Contactez l'administrateur pour plus d'informations."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
