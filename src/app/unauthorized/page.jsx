"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, Button, Chip, Separator } from "@heroui/react";
import { ShieldAlert, Home, LogIn, ArrowLeft } from "lucide-react";

// Staggered entry animations for premium SaaS feel
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
};

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-[80vh] w-full flex items-center justify-center p-4 bg-neutral-50 dark:bg-[#0b0f19] transition-colors duration-300 overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-120 h-90 bg-orange-500/10 dark:bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-120 h-90 bg-red-500/10 dark:bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container Card with Framer Motion */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg z-10"
      >
        <Card className="rounded-3xl p-6 sm:p-8 bg-white/60 dark:bg-[#131b2e]/60 backdrop-blur-xl border border-neutral-200/60 dark:border-zinc-800/60 shadow-2xl transition-all">
          <CardContent className="flex flex-col items-center justify-center text-center p-0 space-y-6">
            {/* Protected Route Badge */}
            <motion.div variants={itemVariants}>
              <Chip
                variant="flat"
                className="bg-amber-100/80 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 font-semibold px-3 py-1 rounded-full text-xs"
              >
                🔒 Protected Route
              </Chip>
            </motion.div>

            {/* Error Icon & Code Header */}
            <motion.div
              variants={itemVariants}
              className="relative flex flex-col items-center"
            >
              <div className="p-4 bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-full border border-red-500/20 shadow-inner mb-2 animate-pulse">
                <ShieldAlert size={48} strokeWidth={1.5} />
              </div>
              <h1 className="text-7xl font-black tracking-tighter text-default-300 dark:text-zinc-800 select-none">
                401
              </h1>
            </motion.div>

            {/* Typography Content */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-default-900 dark:text-white">
                Unauthorized Access
              </h2>
              <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                You don&apos;t have permission to access this page.
              </p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm text-default-500 dark:text-zinc-400 leading-relaxed max-w-sm"
            >
              Sorry! This page is restricted. Please sign in with an authorized
              account or return to the homepage. If you believe this is a
              mistake, contact the administrator.
            </motion.p>

            {/* UI Structural Separator */}
            <motion.div variants={itemVariants} className="w-full">
              <Separator className="bg-default-200/60 dark:bg-zinc-800/60" />
            </motion.div>

            {/* Operational Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="w-full flex flex-col gap-3"
            >
              {/* Primary login Action (Orange to Red Premium linear) */}
              <Button
                size="lg"
                onPress={() => router.push("/login")}
                className="w-full h-12 font-bold text-white bg-linear-to-r from-orange-500 to-red-600 hover:opacity-95 rounded-2xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
              >
                <LogIn size={18} />
                <span>Go to Login</span>
              </Button>

              {/* Secondary Navigation Actions */}
              <div className="flex gap-3 w-full justify-center sm:justify-between px-10 mt-2">
                <Button
                  variant="bordered"
                  size="md"
                  onPress={() => router.push("/")}
                  className="h-11 font-semibold rounded-2xl border-default-200 dark:border-zinc-800 text-default-700 dark:text-zinc-300 bg-white/40 dark:bg-zinc-900/40 hover:bg-default-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Home size={16} />
                  <span>Home</span>
                </Button>

                <Button
                  variant="flat"
                  size="md"
                  onPress={() => router.back()}
                  className="h-11 font-semibold rounded-2xl bg-default-100 dark:bg-zinc-800/80 text-default-700 dark:text-zinc-300 hover:bg-default-200 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={16} />
                  <span>Go Back</span>
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
