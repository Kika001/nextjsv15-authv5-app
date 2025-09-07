"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/database";
import { users } from "@/database/schema";
import { auth } from "@/auth";
import { ChangePasswordSchema, ProfileSchema } from "@/schemas";

export const updateProfile = async (values: z.infer<typeof ProfileSchema>) => {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Non autorisé" };
  }

  const validatedFields = ProfileSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Champs invalides !" };
  }

  const { name, email } = validatedFields.data;

  try {
    await db
      .update(users)
      .set({ name, email })
      .where(eq(users.id, session.user.id));

    return { success: "Profil mis à jour !" };
  } catch {
    return { error: "Une erreur s'est produite." };
  }
};

export const changePassword = async (
  values: z.infer<typeof ChangePasswordSchema>
) => {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Non autorisé" };
  }

  const validatedFields = ChangePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Champs invalides !" };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!user || !user.password) {
    return { error: "Utilisateur non trouvé ou mot de passe non défini." };
  }

  const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordCorrect) {
    return { error: "Le mot de passe actuel est incorrect." };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, session.user.id));
    return { success: "Mot de passe mis à jour !" };
  } catch {
    return { error: "Une erreur s'est produite." };
  }
};