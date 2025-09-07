import { auth } from "@/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutGrid, PlusCircle } from "lucide-react";

export default async function CategoriesPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gestion des Catégories</CardTitle>
          <CardDescription>
            {isAdmin
              ? "Organisez vos produits en catégories."
              : "Consultez les catégories de produits."}
          </CardDescription>
        </div>
        {isAdmin && (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter une catégorie
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
          <LayoutGrid className="h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Aucune catégorie pour le moment</h3>
          <p className="text-sm text-muted-foreground">
            {isAdmin
              ? "Commencez par créer votre première catégorie."
              : "Les catégories apparaîtront ici."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
