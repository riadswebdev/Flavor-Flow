"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiSolidDish } from "react-icons/bi";
import { Card, Button, Separator } from "@heroui/react";
import {
  HiArrowPath,
  HiHome,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi2";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }) {
    useEffect(() => {
      document.title = "Flavor Flow - Error";
    }, []);
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error("FlavorFlow Error Boundary:", error);
  }, [error]);

  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center p-4 bg-default-50/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-xl"
      >
        <Card
          className="
            bg-white/60 dark:bg-zinc-900
            backdrop-blur-xl
            border border-white/40 dark:border-default-100/10
            shadow-2xl rounded-3xl overflow-hidden p-2
          "
        >
          {/* Card Header with Premium Illustration Component */}
          <Card.Header className="flex flex-col items-center justify-center text-center pt-8 pb-4 px-6">
            <div className="relative mb-6">
              {/* Premium Glow Effect behind Icon */}
              <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-rose-500 rounded-full blur-xl opacity-20 animate-pulse" />
              <div className="relative w-20 h-20 rounded-3xl bg-linear-to-tr from-orange-50 to-rose-50 dark:from-orange-950/20 dark:to-rose-950/20 border border-orange-100 dark:border-rose-900/30 flex items-center justify-center text-rose-500 dark:text-rose-400 shadow-inner">
                <BiSolidDish
                  size={42}
                  className="animate-bounce"
                  style={{ animationDuration: "3s" }}
                />
              </div>
            </div>

            <Card.Title className="text-2xl md:text-3xl font-black tracking-tight text-default-800 dark:text-default-100">
              Something Went Wrong
            </Card.Title>

            <Card.Description className="text-sm text-default-500 dark:text-default-400 max-w-sm mt-2 leading-relaxed">
              An unexpected error occurred while preparing this page. Don't
              worry, our chefs are looking into it!
            </Card.Description>
          </Card.Header>

          {/* Dev-only Collapsible Section */}
          {isDevelopment && (
            <Card.Content className="px-6 py-2 w-full">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-between w-full p-3 text-xs font-semibold text-default-600 dark:text-default-400 bg-default-100/50 dark:bg-default-100/5 rounded-xl hover:bg-default-100 dark:hover:bg-default-100/10 transition-all"
              >
                <span>Technical Error Logs (Development)</span>
                {showDetails ?
                  <HiChevronUp size={16} />
                : <HiChevronDown size={16} />}
              </button>

              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2 p-3 bg-zinc-950 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto max-h-40 border border-zinc-800 text-left"
                >
                  <p className="font-bold text-rose-400 mb-1">
                    Error: {error?.message || "Unknown error"}
                  </p>
                  <span className="whitespace-pre text-zinc-400">
                    {error?.stack}
                  </span>
                </motion.div>
              )}
            </Card.Content>
          )}

          <div className="px-6 py-2">
            <Separator className="opacity-50" />
          </div>

          {/* Action Buttons */}
          <Card.Footer className="flex flex-col sm:flex-row items-center gap-3 px-6 pb-6 pt-2">
            {/* Try Again Button (Orange to Red linear) */}
            <Button
              onPress={() => reset()}
              size="md"
              className="
                w-full sm:flex-1 font-bold text-sm rounded-2xl text-white shadow-lg
                bg-linear-to-r from-orange-500 to-rose-500
                hover:opacity-95 active:scale-[0.98] transition-all
              "
            >
              <HiArrowPath size={18} className="font-bold" />
              Try Again
            </Button>

            {/* Back Home Button */}
            <Button
              onPress={() => router(-1)}
              size="md"
              variant="flat"
              className="
                w-full sm:w-auto font-bold text-sm rounded-2xl
                bg-default-100 hover:bg-default-200
                dark:bg-default-100/10 dark:hover:bg-default-100/20
                text-default-700 dark:text-default-200 transition-all
              "
              startContent={<HiHome size={18} />}
            >
              Back Home
            </Button>
          </Card.Footer>
        </Card>
      </motion.div>
    </div>
  );
}
