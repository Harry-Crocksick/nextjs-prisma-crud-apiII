import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full text-center grid place-content-center">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="text-blue-600 underline text-xl font-semibold">
        Return Home
      </Link>
    </div>
  );
}
