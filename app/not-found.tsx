import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-accent mb-4">404</h1>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>
        <h2 className="text-3xl font-bold text-gray-light mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-light/80 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-accent text-background font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,154,0.5)] flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border-2 border-accent text-accent font-semibold rounded-lg transition-all duration-300 hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(0,255,154,0.3)] flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

