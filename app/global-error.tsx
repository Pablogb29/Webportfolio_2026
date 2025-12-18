"use client";

import { useEffect } from "react";
import { AlertTriangle, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <AlertTriangle className="mx-auto text-red-500" size={64} />
          </div>
          <h1 className="text-3xl font-bold text-gray-light mb-4">
            Application Error
          </h1>
          <p className="text-gray-light/80 mb-8">
            A critical error occurred. Please refresh the page or contact support if the problem
            persists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-accent text-background font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,217,255,0.4),0_0_30px_rgba(147,51,234,0.3),0_0_40px_rgba(233,30,99,0.2)]"
            >
              Try Again
            </button>
            <a
              href="/"
              className="px-6 py-3 border-2 border-accent text-accent font-semibold rounded-lg transition-all duration-300 hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(0,217,255,0.3),0_0_30px_rgba(147,51,234,0.25),0_0_40px_rgba(233,30,99,0.15)] flex items-center justify-center gap-2"
            >
              <Home size={18} />
              Go Home
            </a>
          </div>
          {error.digest && (
            <p className="text-xs text-gray-light/60 mt-8 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}

