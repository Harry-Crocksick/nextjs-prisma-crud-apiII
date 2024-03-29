"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PostProps } from "./definitions";

export default function Posts({ posts }: { posts: PostProps[] }) {
  const router = useRouter();

  return (
    <section className="max-w-md w-full mx-auto my-10 flex flex-col gap-y-10">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col space-y-5 p-4 border border-gray-200 rounded-md"
        >
          <h1 className="font-semibold text-2xl">{post.title}</h1>
          <h2 className="font-medium text-xl text-gray-600">
            {post.description}
          </h2>
          <div>
            <Image
              src={post.thumbnail || ""}
              width={150}
              height={100}
              alt={post.title}
              title={post.title}
              priority
              className="block mx-auto object-contain"
            />
          </div>
          <p className="text-base font-medium text-slate-600">{post.details}</p>
          <button
            onClick={() => router.push("/")}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Back to Home
          </button>
        </div>
      ))}
    </section>
  );
}
