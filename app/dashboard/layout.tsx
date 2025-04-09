import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col items-center overflow-y-scroll px-6 py-6">
      <nav className="flex w-full items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <p className="font-semibold tracking-tight capitalize">1 credit left</p>
          <Link href={"/dashboard/pricing"}>
            <Button className="rounded-full" variant={"secondary"}>Buy more</Button>
          </Link>
          <Link href={"/signout"}>
            <Button className="rounded-full" variant={"secondary"}>Sign out</Button>
          </Link>
        </div>

        <ModeToggle />
      </nav>
      {children}
    </div>
  );
}
