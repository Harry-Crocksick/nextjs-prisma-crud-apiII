"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid place-content-center w-full min-h-screen">
      <h2>Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="mt-4 border rounded py-3 bg-gray-200 text-black"
      >
        Try again
      </button>
    </div>
  );
}
