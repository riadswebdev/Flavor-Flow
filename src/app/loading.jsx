import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex min-h-[75vh] w-full flex-col items-center justify-center gap-3 select-none">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 w-12 h-12 bg-orange-500/10 dark:bg-rose-500/10 blur-xl rounded-full" />

        {/* HeroUI Spinner */}
        <Spinner size="lg" color="danger" />
      </div>
      <p className="text-sm font-bold bg-linear-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent tracking-wide animate-pulse">
        Loading FlavorFlow...
      </p>
    </div>
  );
}
