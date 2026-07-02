"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessfullyPaymentToast({ recipeName, redirectTo, delay = 2500 }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(redirectTo);
    }, delay);

    return () => clearTimeout(timer);
  }, [redirectTo, delay, router]);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-emerald-200/50 dark:border-emerald-900/40 px-6 py-5 text-center max-w-md">
      <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
        Payment Successful!
      </h3>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm">
        {recipeName ?
          `"${recipeName}" has been unlocked.`
        : "Your recipe is now unlocked."}
      </p>
      <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-3">
        Redirecting to your purchased recipes...
      </p>
    </div>
  );
}
