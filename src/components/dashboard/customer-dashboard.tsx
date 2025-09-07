import type { User } from "next-auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CustomerDashboardProps {
    user?: User | null;
}

export function CustomerDashboard({ user }: CustomerDashboardProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Bienvenue, {user?.name || 'Client'} !</CardTitle>
                    <CardDescription>
                        Ceci est votre espace personnel. Consultez vos produits et gérez votre compte.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 sm:flex-row">
                    <Button asChild>
                        <Link href="/dashboard/products">Voir les produits</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/dashboard/settings/account">Gérer mon compte</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}