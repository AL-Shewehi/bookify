"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { ui } from "@clerk/ui";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ theme: shadcn }} ui={ui}>
      <Navbar />
      {children}
      <Toaster />
    </ClerkProvider>
  );
}
