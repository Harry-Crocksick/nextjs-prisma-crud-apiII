import { prisma } from "./prisma-client";

export async function retrieveUsers() {
  // throw new Error("You cant do like that!"); for testing purpose only
  try {
    const result = await prisma.post.findMany();
    console.log("Successfully retrieved users");
    return result;
  } catch (err) {
    console.log("Failed to fetch users data");
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}
