"use client";

import { NavBar2 } from "@/components/nav-bar";
import { ModeToggle } from "@/components/dark-mode";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { LayoutDashboard } from "lucide-react";

function NavBarHeader() {
  const { data: session } = useSession();
  const { push } = useRouter();
  const user = session?.user;
  return (
    <div>
      <NavBar2
        isSticky={false}
        leftAddon={<ModeToggle />}
        domain={{ name: "auth-app1", logo: <LayoutDashboard /> }}
        authLinks={{
          register: {
            isVisible: user ? false : true,
            onClick: () => {
              push("/register");
            },
          },

          login: {
            variant: user ? "default" : "ghost",
            text: user ? "Go to dashboard" : "Login",
            onClick: () => {
              if (user) {
                push("/dashboard");
              } else {
                push("/login");
              }
            },
          },
        }}
      />
    </div>
  );
}

export default NavBarHeader;
