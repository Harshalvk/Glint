"use server";

import { prisma } from "@/lib/prisma";
import { signInSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export const signUp = async (email: string, password: string) => {
  const isValid = signInSchema.safeParse({ email, password });

  if (isValid.error) {
    return "Error";
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return "User already exists";
  }

  const hash = bcrypt.hashSync(isValid.data.password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hash,
    },
  });

  redirect("/signin");
};
