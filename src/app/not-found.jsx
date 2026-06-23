"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
// import { FiHome, FiCompass } from "react-router-icons";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { FiCompass, FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-br from-amber-50 via-zinc-50 to-orange-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-amber-950/20 px-4">
      {/* Decorative Premium Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-linear-to-tr from-amber-400 to-orange-500 rounded-full blur-[100px] opacity-20 dark:opacity-10 pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-linear-to-br from-rose-400 to-amber-500 rounded-full blur-[120px] opacity-20 dark:opacity-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl text-center"
      >
        {/* Glassmorphism Container */}
        <div className="backdrop-blur-xl bg-white/40 dark:bg-zinc-900/40 border border-white/40 dark:border-zinc-800/60 shadow-2xl rounded-3xl p-8 md:p-12">
          {/* Animated 404 Graphic Illustration */}
          <div className="relative flex justify-center mb-6">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative"
            >
              <h1 className="text-8xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-amber-500 via-orange-500 to-rose-500">
                404
              </h1>
            </motion.div>
            <div className="absolute -top-4 right-1/3 text-amber-500 dark:text-amber-400 text-3xl animate-bounce">
              <HiOutlineExclamationTriangle />
            </div>
          </div>

          {/* Text Deliverables */}
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mb-3">
            Lost in the Flavor Universe?
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">
            The recipe, page, or sensory experience you are searching for has
            migrated or doesn&apos;t exist. Let&apos;s redirect your palate.
          </p>

          {/* Functional Navigation Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              as={Link}
              href="/"
              color="warning"
              variant="shadow"
              size="lg"
              className="w-full sm:w-auto font-semibold text-white bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-lg shadow-orange-500/20 px-8 transition-transform duration-200 active:scale-95"
              startContent={<FiHome className="text-lg" />}
            >
              Back Home
            </Button>

            <Button
              as={Link}
              href="/recipes"
              variant="bordered"
              size="lg"
              className="w-full sm:w-auto font-medium border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl px-6 transition-all"
              startContent={<FiCompass className="text-lg" />}
            >
              Explore Menu
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
