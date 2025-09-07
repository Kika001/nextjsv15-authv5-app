"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {toast} from "sonner";
import { signIn } from "next-auth/react";

import { AuthForm } from "@/components/authForm";

export const RegisterForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"admin" | "customer">("customer");

  async function handleOnSubmit(values: {
    email: string;
    password: string;
    name: string;
    role: "admin" | "customer";
  }) {
    try {
      setSubmitting(true);
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
          errorData.errors.forEach((error: { message: string }) => {
            toast.error(error.message);
          });
          return;
        }
        toast.error(errorData.message || "An error occurred during registration.");
        return;
      }
      toast.success("Registration successful! Please log in.");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex justify-center items-center w-full h-screen bg-neutral-50 dark:bg-neutral-950">
      <AuthForm
        className="shadow-none"
        email={email}
        onEmailChange={setEmail}
        password={password}
        onPasswordChange={setPassword}
        name={name}
        onNameChange={setName}
        role={role}
        onRoleChange={setRole}
        onSubmit={handleOnSubmit}
        authForm="signUp"
        buttonElement={{
          text: submitting ? "Loading" : "Créer un compte",
          attributes: { disabled: submitting },
        }}
        urls={{ signInFooterLink: "/login" }}
        showTermsAgrement={false}
        authButtons={{
          apple: { enable: false },
          gitHub: {
            onGitHubClickedButton: () => {
              signIn("github", { callbackUrl: "/dashboard" });
            },
          },
          google: {
            onGoogleClickedButton: () => {
              signIn("google", { callbackUrl: "/dashboard" });
            },
          },
        }}
      />
    </div>
  );
};
