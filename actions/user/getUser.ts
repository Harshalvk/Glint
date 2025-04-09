"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function GetUser() {
  const session = await auth();

  if (!session?.user) {
    return "User not found. Please login again.";
  }

  const userId = session.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
}
