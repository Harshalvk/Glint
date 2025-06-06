import { signOut } from "@/auth";
import SignOutBtn from "@/components/auth/SignOutBtn";
import Credits from "@/components/Credits";
import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col items-center overflow-y-scroll px-6 py-6">
      <nav className="flex w-full items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <Credits />
          <Link href={"/dashboard/pricing"}>
            <Button className="rounded-full border" variant={"secondary"}>
              Buy more
            </Button>
          </Link>
          <SignOutBtn />
        </div>

        <ModeToggle />
      </nav>
      {children}
    </div>
  );
}
