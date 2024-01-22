import { retrieveUsers } from "@/utils/data";
import Posts from "@/utils/Posts";
import { notFound } from "next/navigation";

export default async function Page() {
  const posts = await retrieveUsers();

  if (!posts) {
    notFound();
  }

  return <Posts posts={posts} />;
}
