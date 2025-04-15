"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return (
    <Button
      className="rounded-full border"
      variant={"secondary"}
      onClick={() => signOut()}
    >
      Sign Out
    </Button>
  );
};

export default SignOutBtn;
