"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {toast }from "sonner";
import { signIn } from "next-auth/react";

import { AuthForm } from "@/components/authForm";

export const LoginForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleOnSubmit(values: { email: string; password: string }) {
    try {
      setSubmitting(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.error) {
        const message = "Invalid email or password";
        toast.error(message);
        return;
      }

      if (res?.ok) {
        toast.success("Successfully logged in");
        router.push(callbackUrl);
        router.refresh(); // Force a router refresh
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
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
        onSubmit={handleOnSubmit}
        authForm="signIn"
        buttonElement={{
          text: submitting ? "Loading" : "Accéder au compte",
          attributes: { disabled: submitting },
        }}
        urls={{ signUpFooterLink: "/register" }}
        showTermsAgrement={false}
        authButtons={{
          apple: { enable: false },
          gitHub: {
            onGitHubClickedButton: () => {
              signIn("github", { callbackUrl });
            },
          },
          google: {
            onGoogleClickedButton: () => {
              signIn("google", { callbackUrl });
            },
          },
        }}
      />
    </div>
  );
};
