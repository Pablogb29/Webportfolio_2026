"use client";

import { useEffect } from "react";
import { AlertCircle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <AlertCircle className="mx-auto text-accent" size={64} />
        </div>
        <h1 className="text-3xl font-bold text-gray-light mb-4">
          Something went wrong!
        </h1>
        <p className="text-gray-light/80 mb-8">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-accent text-background font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,154,0.5)] flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-accent text-accent font-semibold rounded-lg transition-all duration-300 hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(0,255,154,0.3)] flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Go Home
          </Link>
        </div>
        {error.digest && (
          <p className="text-xs text-gray-light/60 mt-8 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}

