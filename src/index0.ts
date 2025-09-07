import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "L'email est requis",
  }),
  password: z.string().min(1, {
    message: "Le mot de passe est requis",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "L'email est requis",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 caractères requis",
  }),
  name: z.string().min(1, {
    message: "Le nom est requis",
  }),
});

export const ProfileSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("L'email est requis"),
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
    newPassword: z
      .string()
      .min(6, "Le nouveau mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });