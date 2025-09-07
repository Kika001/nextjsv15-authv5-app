import * as z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(
    1,
    "Name est requis"
  ),
  email: z.string()
    .min(1, "Email est requis")
    .email("Invalide email"),
  photo: z.string().optional(),
  password: z.string()
    .min(1, "Mot de pass est requis")
    .min(8, "minimum 8 caractères requis.")
    .max(32, "maximum 2 caractères requis."),
  role: z.enum(["admin", "customer"]).optional(),
});

export const loginUserSchema = z.object({
  email: z.string()
    .min(1, "Email est requis")
    .email("Invalide email ou mot de pass"),
  password: z.string().min(
    1,
    "Password est requis"
  ),
});

export const registerUserSchema = z.object({
  email: z.string().email({
    message: "L'email est requis",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 caractères requis",
  }),
  name: z.string().min(1, {
    message: "Le nom est requis",
  }),
});

export const profileUserSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("L'email est requis"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
  newPassword: z.string().min(6, "Le nouveau mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export type LoginUserInput = z.TypeOf<typeof loginUserSchema>;
export type RegisterUserInput = z.TypeOf<typeof registerUserSchema>;
export type ProfileUserInput = z.TypeOf<typeof profileUserSchema>;
export type ChangePasswordInputUserInput = z.TypeOf<typeof changePasswordSchema>;
export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
