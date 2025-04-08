import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import SignIn from "./_components/SignIn";

const SignInPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div>
      <SignIn />
    </div>
  );
};

export default SignInPage;
