"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { ui } from "@clerk/ui";
import Navbar from "@/components/Navbar";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ theme: shadcn }} ui={ui}>
      <Navbar />
      {children}
    </ClerkProvider>
  );
}
