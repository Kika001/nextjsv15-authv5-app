import * as z from "zod";

// ============================================================
// AUTH SCHEMAS
// ============================================================

export const LoginSchema = z.object({
  email: z.string().email({
    message: "L'email est requis.",
  }),
  password: z.string().min(1, {
    message: "Le mot de passe est requis.",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Le nom est requis.",
  }),
  email: z.string().email({
    message: "L'email est requis.",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères.",
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Un email valide est requis.",
  }),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: "Le nouveau mot de passe doit contenir au moins 8 caractères.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

// ============================================================
// USER SCHEMAS
// ============================================================

export const ProfileSchema = z.object({
  name: z.string().min(1, "Le nom est requis."),
  email: z.string().email("L'email est requis."),
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Le mot de passe actuel est requis."),
    newPassword: z
      .string()
      .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export const CreateUserSchema = z.object({
  name: z.string().min(1, "Le nom est requis."),
  email: z.string().email("Un email valide est requis."),
  photo: z.string().optional(),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
    .max(32, "Le mot de passe ne doit pas dépasser 32 caractères."),
  role: z.enum(["admin", "customer"]).optional(),
});

// ============================================================
// TYPES
// ============================================================

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
export type ProfileInput = z.infer<typeof ProfileSchema>;
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;