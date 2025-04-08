import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function GetUserCredits() {
  const session = await auth();

  if (!session?.user) {
    return "User not found. Please login again.";
  }

  const userId = session.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      credits: true,
    },
  });

  if (!user?.credits) {
    return null;
  }

  return user.credits;
}
