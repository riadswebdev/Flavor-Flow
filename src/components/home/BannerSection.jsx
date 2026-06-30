"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button, Card, CardContent, Chip, Separator } from "@heroui/react";
import {
  ArrowRight,
  Plus,
  Flame,
  Heart,
  Clock,
  Star,
  ChefHat,
  UtensilsCrossed,
  Globe,
  Sparkles,
} from "lucide-react";

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const floatingAnimation = (delay = 0) => ({
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: delay,
    },
  },
});

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-background py-12 md:py-20 flex items-center justify-center">
      {/* --- PREMIUM BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft Ambient Glows */}
        <div className="absolute -top-40 -left-40 w-125 h-125 bg-linear-to-tr from-orange-500/20 to-rose-500/20 blur-[120px] rounded-full dark:from-orange-500/10 dark:to-rose-500/10" />
        <div className="absolute top-1/2 right-[-10%] w-150 h-150 bg-linear-to-br from-rose-500/15 to-orange-600/15 blur-[140px] rounded-full dark:from-rose-500/5 dark:to-orange-600/10" />

        {/* Floating Blurred Circles */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[15%] w-72 h-72 bg-orange-400/10 rounded-full blur-3xl dark:bg-orange-500/5"
        />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `radial-linear(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* --- LEFT SIDE: CONTENT CONTENT --- */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Trending Badge */}
            <motion.div variants={itemVariants}>
              <Chip
                variant="flat"
                className="px-4 py-2 h-auto text-sm font-medium backdrop-blur-md bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/20 rounded-full shadow-sm"
              >
                {" "}
                <Flame
                  className="text-orange-500 fill-orange-500 animate-pulse"
                  size={16}
                />
                🔥 Trending Today: Featured Recipe Collection
                <Sparkles className="text-rose-500" size={14} />
              </Chip>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-foreground"
            >
              Discover, Cook & Share <br />
              <span className="bg-linear-to-r from-orange-500 via-amber-500 to-rose-600 bg-clip-text text-transparent drop-shadow-sm">
                Amazing Recipes
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-default-600 max-w-2xl font-normal leading-relaxed"
            >
              Join thousands of passionate home cooks and professional chefs.
              Discover delicious culinary creations, save your absolute
              favorites, publish your own signature dishes, and become part of
              the vibrant FlavorFlow community.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2"
            >
              <Button
                as={Link}
                href="/recipes"
                size="lg"
                className="group font-bold text-white bg-linear-to-r from-orange-500 to-rose-600 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 rounded-2xl px-8"
              >
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
                Browse Recipes
              </Button>
              <Button
                as={Link}
                href="/dashboard/user/add-recipe"
                size="lg"
                variant="bordered"
                className="font-semibold border-default-300 dark:border-default-200 hover:bg-default-100 dark:hover:bg-default-50 backdrop-blur-sm rounded-2xl px-6 transition-all"
              >
                <Plus size={18} />
                Share Your Recipe
              </Button>
            </motion.div>

            {/* Quick Statistics Grid */}
            <motion.div variants={itemVariants} className="w-full pt-4">
              <Separator className="my-6 opacity-60 max-w-md lg:mx-0 mx-auto" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl w-full">
                {[
                  {
                    icon: <ChefHat className="text-orange-500" size={18} />,
                    label: "10K+ Recipes",
                  },
                  {
                    icon: (
                      <Heart
                        className="text-rose-500 fill-rose-500/10"
                        size={18}
                      />
                    ),
                    label: "25K+ Favorites",
                  },
                  {
                    icon: (
                      <Star
                        className="text-amber-500 fill-amber-500"
                        size={18}
                      />
                    ),
                    label: "4.9 Rating",
                  },
                  {
                    icon: <Globe className="text-blue-500" size={18} />,
                    label: "100+ Countries",
                  },
                ].map((stat, idx) => (
                  <Card
                    key={idx}
                    shadow="none"
                    className="backdrop-blur-xl bg-background/20 border border-default-200/50 dark:border-white/10 rounded-xl"
                  >
                    <CardContent className="p-3 flex flex-row items-center justify-center lg:justify-start gap-2.5">
                      <div className="p-1.5 rounded-lg bg-default-100/50 shadow-inner">
                        {stat.icon}
                      </div>
                      <span className="text-sm font-semibold text-foreground/80 tracking-tight">
                        {stat.label}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* --- RIGHT SIDE: FEATURED IMAGE WITH FLOATING CARDS --- */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
            {/* Dashed Border Visual Frame Accent */}
            <div className="absolute -inset-4 border border-dashed border-default-300/60 dark:border-default-700/40 rounded-[2.5rem] pointer-events-none hidden sm:block" />

            {/* Main Featured Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-110 aspect-4/5 rounded-[2rem] overflow-hidden group shadow-2xl shadow-orange-900/10 dark:shadow-black/40 border-4 border-white dark:border-default-100 z-10 bg-default-100 mx-3 sm:mx-0"
            >
              {/* Premium Image with Hover Zoom */}
              <Image
                src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800"
                alt="Premium Butter Chicken Dish"
                fill
                priority
                sizes="(max-w-7xl) 40vw, 100vw"
                className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Glass & linear Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10 opacity-60 dark:opacity-80 transition-opacity pointer-events-none" />
            </motion.div>

            {/* Decorative Orange Dots & Glows */}
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-rose-500/20 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500/20 rounded-full blur-xl pointer-events-none" />

            {/* --- FLOATING GLASS CARDS --- */}

            {/* Card 1: Featured Recipe */}
            <motion.div
              className="absolute top-8 -left-8 sm:-left-12 z-20 hidden xs:block"
              {...floatingAnimation(0)}
            >
              <Card className="backdrop-blur-2xl bg-background/70 border border-white/20 dark:border-white/10 shadow-xl rounded-2xl max-w-47.5">
                <CardContent className="p-3 flex flex-row items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500 text-white shadow-md">
                    <UtensilsCrossed size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-default-500 font-bold">
                      ⭐ Featured
                    </p>
                    <h4 className="text-sm font-bold text-foreground leading-tight">
                      Butter Chicken
                    </h4>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 2: Likes Counter */}
            <motion.div
              className="absolute top-1/3 -right-6 sm:-right-8 z-20"
              {...floatingAnimation(1.2)}
            >
              <Card className="backdrop-blur-2xl bg-background/70 border border-white/20 dark:border-white/10 shadow-xl rounded-xl">
                <CardContent className="p-2.5 px-4 flex flex-row items-center gap-2">
                  <Heart
                    size={16}
                    className="text-rose-500 fill-rose-500 animate-pulse"
                  />
                  <span className="text-xs font-black text-foreground tracking-tight">
                    2.5K Likes
                  </span>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 3: Preparation Time */}
            <motion.div
              className="absolute bottom-16 -left-6 sm:-left-10 z-20"
              {...floatingAnimation(0.6)}
            >
              <Card className="backdrop-blur-2xl bg-background/70 border border-white/20 dark:border-white/10 shadow-xl rounded-xl">
                <CardContent className="p-2.5 px-4 flex flex-row items-center gap-2">
                  <Clock size={16} className="text-orange-500" />
                  <span className="text-xs font-bold text-foreground tracking-tight">
                    ⏱ 45 Minutes
                  </span>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 4: Community Badge */}
            <motion.div
              className="absolute -bottom-4 right-4 sm:-right-4 z-20"
              {...floatingAnimation(1.8)}
            >
              <Card className="backdrop-blur-2xl bg-background/70 border border-white/20 dark:border-white/10 shadow-xl rounded-xl">
                <CardContent className="p-2.5 px-3.5 flex flex-row items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                  <span className="text-xs font-medium text-foreground">
                    By{" "}
                    <strong className="font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-rose-600">
                      FlavorFlow
                    </strong>
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
