"use client";

import { useSearchParams } from "next/navigation";

export function ErrorBox() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");
  return (
    <div>
      {errorMessage && (
        <p className="animate-pulse rounded-full bg-red-400 px-4 py-2 text-center text-white">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
