"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
  useUser,
  useClerk,
} from "@clerk/nextjs";

const navItems = [
  {
    label: "Library",
    href: "/",
  },
  {
    label: "Add New",
    href: "/books/new",
  },
];

function Navbar() {
  const pathname = usePathname();
  const {  user } = useUser();
  return (
    <header className="w-full fixed z-50 bg-('--bg-primary') ">
      <div className="wrapper navbar-height py-4 flex justify-between items-center">
        <Link href="/" className="flex gap-0.5 items-center">
          <Image
            src="/assets/logo.png"
            alt="Bookify Logo"
            width={42}
            height={26}
          />
          <span className="logo-text">Bookify</span>
        </Link>

        <nav className="w-fit flex gap-7.5 items-center">
          {navItems.map(({ label, href }) => {
            const isActive =
              pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "nav-link-base",
                  isActive ? "nav-link-active" : "text-black hover:opacity-70",
                )}
              >
                {label}
              </Link>
            );
          })}

          <Show when="signed-out">
            <div className="flex gap-7.5 items-center">
              <div className="nav-user-link">
                <SignInButton />
              </div>
              <div className="nav-user-link">
                <SignUpButton />
              </div>
            </div>
          </Show>

          <Show when="signed-in">
            <div className="nav-user-link">

            <UserButton />
            {user?.firstName && (
              <Link href="/subscription" className="nav-user-name">
                {user.firstName}
              </Link>
            )}
            </div>
          </Show>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
