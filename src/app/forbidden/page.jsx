"use client";


import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  Chip,
  Separator,
} from "@heroui/react";
import { ShieldX, LayoutDashboard, Home, ArrowLeft, Info } from "lucide-react";

// Premium staggered entry animation configs
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-neutral-50 dark:bg-[#0b0f19] transition-colors duration-300 overflow-hidden">
      {/* Aesthetic SaaS Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-137.5 h-137.5 bg-red-500/10 dark:bg-red-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-87.5 h-87.5 bg-orange-500/10 dark:bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl z-10"
      >
        <Card className="rounded-3xl p-5 sm:p-8 bg-white/60 dark:bg-[#131b2e]/60 backdrop-blur-xl border border-neutral-200/60 dark:border-zinc-800/60 shadow-2xl transition-all">
          {/* Header Section */}
          <CardHeader className="flex flex-col items-center justify-center pb-2 text-center p-0 space-y-4">
            {/* Badges Layout */}
            <motion.div variants={itemVariants} className="flex gap-2">
              <Chip
                variant="flat"
                className="bg-red-100/80 text-red-700 dark:bg-red-950/40 dark:text-red-400 font-semibold text-xs"
              >
                🔒 Protected Resource
              </Chip>
              <Chip
                variant="dot"
                className="border-amber-500/30 text-amber-600 dark:text-amber-400 font-semibold text-xs"
              >
                Admin Only
              </Chip>
            </motion.div>

            {/* Shield Icon with Ambient Glow */}
            <motion.div
              variants={itemVariants}
              className="relative flex flex-col items-center mt-2"
            >
              <div className="p-4 bg-linear-to-br from-red-500 to-orange-500 text-white rounded-full shadow-lg shadow-red-500/20">
                <ShieldX size={44} strokeWidth={1.5} />
              </div>
              <h1 className="text-6xl font-black tracking-tighter text-default-200 dark:text-zinc-800/50 select-none mt-2">
                403
              </h1>
            </motion.div>

            {/* Titles */}
            <motion.div variants={itemVariants} className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-default-900 dark:text-white">
                Access Forbidden
              </h2>
              <p className="text-sm font-medium text-default-500 dark:text-zinc-400">
                You don&apos;t have permission to access this resource.
              </p>
            </motion.div>
          </CardHeader>

          {/* Main Body */}
          <CardContent className="flex flex-col items-center justify-center text-center p-0 mt-4 space-y-5">
            <motion.p
              variants={itemVariants}
              className="text-sm text-default-600 dark:text-zinc-400 leading-relaxed max-w-md"
            >
              You&apos;re signed in, but your current account doesn't have the
              required permissions to view this page. If you believe this is an
              error, please contact an administrator.
            </motion.p>

            {/* Context Explainer Box (Authentication vs Authorization) */}
            <motion.div
              variants={itemVariants}
              className="w-full text-left p-4 rounded-2xl bg-neutral-100/70 dark:bg-zinc-900/50 border border-default-200/50 dark:border-zinc-800/50 flex gap-3"
            >
              <div className="text-orange-500 dark:text-orange-400 mt-0.5 shrink-0">
                <Info size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-default-900 dark:text-zinc-200 uppercase tracking-wider">
                  Why am I seeing this?
                </h4>
                <p className="text-xs text-default-500 dark:text-zinc-400 leading-relaxed">
                  You are successfully logged in, but your account does not have
                  sufficient roles. Some management panels and setup
                  configurations are strictly guarded for data integrity.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <Separator className="bg-default-200/60 dark:bg-zinc-800/60" />
            </motion.div>
          </CardContent>

          {/* Footer Navigation / Actions */}
          <CardFooter className="p-0 mt-5 w-full flex flex-col gap-3">
            {/* Primary Action Button */}
            <motion.div variants={itemVariants} className="w-full">
              <Button
                size="lg"
                onPress={() => router.push("/dashboard")}
                className="w-full h-12 font-bold text-white bg-linear-to-r from-orange-500 to-red-600 hover:opacity-95 rounded-2xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
              >
                <LayoutDashboard size={18} />
                <span>Go to Dashboard</span>
              </Button>
            </motion.div>

            {/* Secondary Actions Row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-3 w-full"
            >
              <Button
                variant="flat"
                size="md"
                onPress={() => router.back()}
                className="h-11 font-semibold rounded-2xl bg-default-100 dark:bg-zinc-800 text-default-700 dark:text-zinc-300 hover:bg-default-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} />
                <span>Go Back</span>
              </Button>

              <Button
                variant="bordered"
                size="md"
                onPress={() => router.push("/")}
                className="h-11 font-semibold rounded-2xl border-default-200 dark:border-zinc-800 text-default-700 dark:text-zinc-300 bg-white/40 dark:bg-zinc-900/40 hover:bg-default-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
              >
                <Home size={16} />
                <span>Back to Home</span>
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
